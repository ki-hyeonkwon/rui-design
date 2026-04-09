import { spawnSync } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

import {
  collectWorkspacePackages,
  getRepositoryRoot,
  PHASE1_SMOKE_INSTALL_PACKAGE_NAMES,
  type WorkspacePackage,
} from "./phase1-external-package";

const repoRoot = getRepositoryRoot();
const dryRun = process.argv.includes("--dry-run");

void main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

async function main() {
  const workspacePackages = await collectWorkspacePackages(repoRoot);
  const phase1PackageSet = new Set<string>(PHASE1_SMOKE_INSTALL_PACKAGE_NAMES);
  const publicPackages = [...workspacePackages.values()].filter(
    (workspacePackage) =>
      isPublicRidedsPackage(workspacePackage) &&
      phase1PackageSet.has(workspacePackage.manifest.name!),
  );
  const packagesByName = new Map(
    publicPackages.map((workspacePackage) => [workspacePackage.manifest.name!, workspacePackage]),
  );
  const publishOrder = topologicallySortPublicPackages(publicPackages, packagesByName);

  const BATCH_SIZE = 5;
  const INTER_PACKAGE_DELAY = 10_000;
  const BATCH_COOLDOWN = 120_000;
  let publishedCount = 0;
  const failedPackages: string[] = [];

  for (const workspacePackage of publishOrder) {
    const packageName = workspacePackage.manifest.name!;
    const localVersion = workspacePackage.manifest.version ?? "0.0.0";
    const publishedVersion = getPublishedVersion(packageName);

    if (publishedVersion === localVersion) {
      console.log(`skip ${packageName}@${localVersion} (already published)`);
      continue;
    }

    if (dryRun) {
      console.log(`publish ${packageName}@${localVersion} (dry-run)`);
      continue;
    }

    const ok = await publishWithRetry(workspacePackage, { packageName, version: localVersion });

    if (!ok) {
      failedPackages.push(packageName);
      continue;
    }

    publishedCount += 1;

    if (publishedCount % BATCH_SIZE === 0) {
      console.log(`batch cooldown: published ${publishedCount} packages, waiting 2 minutes...`);
      await sleep(BATCH_COOLDOWN);
    } else {
      await sleep(INTER_PACKAGE_DELAY);
    }
  }

  if (failedPackages.length > 0) {
    console.error(
      `\n⚠️  ${failedPackages.length} package(s) failed to publish (rate limited):\n${failedPackages.map((n) => `  - ${n}`).join("\n")}\nRe-run the workflow later to retry these packages.`,
    );
    process.exitCode = 1;
  }
}

function isPublicRidedsPackage(workspacePackage: WorkspacePackage) {
  const { manifest } = workspacePackage;
  return (
    manifest.private !== true &&
    manifest.publishConfig?.access === "public" &&
    manifest.name?.startsWith("@rideds/") === true
  );
}

function topologicallySortPublicPackages(
  publicPackages: WorkspacePackage[],
  packagesByName: Map<string, WorkspacePackage>,
) {
  const visited = new Set<string>();
  const visiting = new Set<string>();
  const ordered: WorkspacePackage[] = [];

  const visit = (workspacePackage: WorkspacePackage) => {
    const packageName = workspacePackage.manifest.name!;

    if (visited.has(packageName)) {
      return;
    }

    if (visiting.has(packageName)) {
      return;
    }

    visiting.add(packageName);

    for (const dependencyName of getInternalDependencies(workspacePackage, packagesByName)) {
      const dependencyPackage = packagesByName.get(dependencyName);

      if (dependencyPackage != null) {
        visit(dependencyPackage);
      }
    }

    visiting.delete(packageName);
    visited.add(packageName);
    ordered.push(workspacePackage);
  };

  for (const workspacePackage of publicPackages.sort((left, right) =>
    left.manifest.name!.localeCompare(right.manifest.name!),
  )) {
    visit(workspacePackage);
  }

  return ordered;
}

function getInternalDependencies(
  workspacePackage: WorkspacePackage,
  packagesByName: Map<string, WorkspacePackage>,
) {
  const dependencyGroups = [
    workspacePackage.manifest.dependencies,
    workspacePackage.manifest.optionalDependencies,
  ];

  return [...new Set(dependencyGroups.flatMap((group) => Object.keys(group ?? {})))]
    .filter((dependencyName) => packagesByName.has(dependencyName))
    .sort((left, right) => left.localeCompare(right));
}

function getPublishedVersion(packageName: string) {
  const result = spawnSync("npm", ["view", packageName, "version"], {
    cwd: repoRoot,
    env: process.env,
    encoding: "utf8",
  });

  if (result.status === 0) {
    return result.stdout.trim();
  }

  const combinedOutput = `${result.stdout}\n${result.stderr}`;

  if (combinedOutput.includes("E404")) {
    return null;
  }

  if (isRateLimitError(combinedOutput)) {
    console.warn(`rate limited querying ${packageName}; treating as unpublished`);
    return null;
  }

  throw new Error(
    [
      `Failed to query published version for ${packageName}`,
      result.stdout.trim(),
      result.stderr.trim(),
    ]
      .filter(Boolean)
      .join("\n"),
  );
}

async function publishWithRetry(
  workspacePackage: WorkspacePackage,
  options: { packageName: string; version: string },
): Promise<boolean> {
  const retryDelays = [10_000, 30_000] as const;

  for (let attempt = 0; attempt <= retryDelays.length; attempt += 1) {
    const result = spawnSync("npm", ["publish", "--access", "public"], {
      cwd: workspacePackage.directory,
      env: process.env,
      encoding: "utf8",
    });

    if (result.status === 0) {
      console.log(`published ${options.packageName}@${options.version}`);
      return true;
    }

    const combinedOutput = `${result.stdout}\n${result.stderr}`;

    if (combinedOutput.includes("You cannot publish over the previously published versions")) {
      console.log(
        `skip ${options.packageName}@${options.version} (already published during retry window)`,
      );
      return true;
    }

    const delay = retryDelays[attempt];

    if (delay != null && isRateLimitError(combinedOutput)) {
      console.warn(
        `rate limited publishing ${options.packageName}@${options.version}; retrying in ${Math.round(delay / 1000)}s`,
      );
      await sleep(delay);
      continue;
    }

    if (isRateLimitError(combinedOutput)) {
      console.error(
        `giving up on ${options.packageName}@${options.version} after ${retryDelays.length} retries (rate limited)`,
      );
      return false;
    }

    throw new Error(
      [
        `Failed to publish ${options.packageName}@${options.version}`,
        result.stdout.trim(),
        result.stderr.trim(),
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }

  return false;
}

function isRateLimitError(output: string) {
  return output.includes("E429") || output.toLowerCase().includes("rate limited");
}
