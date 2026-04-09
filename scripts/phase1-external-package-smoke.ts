import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

import {
  PHASE1_SMOKE_INSTALL_PACKAGE_NAMES,
  PHASE1_SMOKE_SCENARIOS,
  collectPhase1WorkspacePackages,
  findInstalledPackageDirectory,
  getPackageTarballFileName,
  getRepositoryRoot,
  validatePhase1WorkspacePackages,
} from "./phase1-external-package";

const repoRoot = getRepositoryRoot();
const bunBin = process.execPath;

const validation = await validatePhase1WorkspacePackages(repoRoot);

if (validation.errors.length > 0) {
  throw new Error(`Phase 1 manifest validation failed:\n${validation.errors.join("\n")}`);
}

const tempRoot = mkdtempSync(join(tmpdir(), "rui-phase1-external-"));
const packDirectory = join(tempRoot, "packs");

mkdirSync(packDirectory, { recursive: true });

try {
  const phase1Packages = await collectPhase1WorkspacePackages(repoRoot);
  const packedDependencies = new Map<string, string>();

  for (const packageName of PHASE1_SMOKE_INSTALL_PACKAGE_NAMES) {
    const workspacePackage = phase1Packages.byName.get(packageName);

    if (workspacePackage == null) {
      throw new Error(`Missing Phase 1 workspace package for smoke test: ${packageName}`);
    }

    const tarballFileName = getPackageTarballFileName(workspacePackage);
    const tarballPath = resolve(packDirectory, tarballFileName);

    runCommand(bunBin, ["pm", "pack", "--ignore-scripts", "--destination", packDirectory], {
      cwd: workspacePackage.directory,
    });

    packedDependencies.set(packageName, `file:${tarballPath}`);
  }

  for (const scenario of PHASE1_SMOKE_SCENARIOS) {
    const consumerDirectory = join(tempRoot, scenario.id);
    mkdirSync(consumerDirectory, { recursive: true });

    const localConsumerTools = Object.fromEntries(
      await Promise.all(
        scenario.localToolPackageNames.map(async (packageName) => [
          packageName,
          `file:${await findInstalledPackageDirectory(packageName, repoRoot)}`,
        ]),
      ),
    );

    writeFileSync(
      join(consumerDirectory, "package.json"),
      JSON.stringify(
        {
          name: `rui-phase1-${scenario.id}`,
          private: true,
          type: "module",
          dependencies: Object.fromEntries(
            scenario.publicPackageNames.map((packageName) => [packageName, packedDependencies.get(packageName)]),
          ),
          devDependencies: localConsumerTools,
          overrides: Object.fromEntries(packedDependencies),
        },
        null,
        2,
      ),
    );

    for (const [relativeFilePath, content] of Object.entries(scenario.files)) {
      const absoluteFilePath = join(consumerDirectory, relativeFilePath);
      mkdirSync(dirname(absoluteFilePath), { recursive: true });
      writeFileSync(absoluteFilePath, content);
    }

    runCommand(bunBin, ["install"], { cwd: consumerDirectory });

    for (const step of scenario.steps) {
      if (step.kind === "typecheck") {
        runCommand(resolve(consumerDirectory, "node_modules/.bin/tsc"), ["--noEmit"], {
          cwd: consumerDirectory,
        });
        continue;
      }

      if (step.kind === "bun-build") {
        const args = ["build", step.entrypoint, "--outdir", step.outdir];

        if ("target" in step && step.target != null) {
          args.push("--target", step.target);
        }

        runCommand(bunBin, args, { cwd: consumerDirectory });
        continue;
      }

      runCommand(step.command, step.args, { cwd: consumerDirectory });
    }

    console.log(`Phase 1 smoke passed: ${scenario.id} -> ${consumerDirectory}`);
  }
} finally {
  if (process.env.RUI_PHASE1_KEEP_TEMP !== "1") {
    rmSync(tempRoot, { force: true, recursive: true });
  } else {
    console.log(`Kept temp artifacts at ${tempRoot}`);
  }
}

function runCommand(command: string, args: string[], options: { cwd: string }) {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    env: process.env,
    encoding: "utf8",
  });

  if (result.status === 0) {
    return;
  }

  throw new Error(
    [
      `Command failed: ${command} ${args.join(" ")}`,
      result.stdout?.trim(),
      result.stderr?.trim(),
    ]
      .filter(Boolean)
      .join("\n"),
  );
}
