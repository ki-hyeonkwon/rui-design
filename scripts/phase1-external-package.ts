import { existsSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

type PackageJson = {
  name?: string;
  version?: string;
  private?: boolean;
  bin?: string | Record<string, string>;
  exports?: Record<string, unknown> | string;
  files?: string[];
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  publishConfig?: {
    access?: string;
  };
};

export type WorkspacePackage = {
  directory: string;
  manifestPath: string;
  manifest: PackageJson;
};

export type Phase1SmokeScenarioStep =
  | {
      kind: "typecheck";
    }
  | {
      kind: "bun-build";
      entrypoint: string;
      outdir: string;
      target?: "browser" | "bun" | "node";
    }
  | {
      kind: "exec";
      command: string;
      args: string[];
    };

export type Phase1SmokeScenario = {
  id: string;
  publicPackageNames: readonly string[];
  localToolPackageNames: readonly string[];
  files: Readonly<Record<string, string>>;
  steps: readonly Phase1SmokeScenarioStep[];
};

export const PHASE1_PUBLIC_PACKAGE_NAMES = [
  "@rideds/react",
  "@rideds/css",
  "@rideds/stackflow",
  "@rideds/cli",
  "@rideds/tailwind4-theme",
] as const;

export const PHASE1_REACT_PUBLISH_CLOSURE_PACKAGE_NAMES = [
  "@rideds/dom-utils",
  "@rideds/react-primitive",
  "@rideds/react-supports",
  "@rideds/react-use-controllable-state",
  "@rideds/react-avatar",
  "@rideds/react-checkbox",
  "@rideds/react-collapsible",
  "@rideds/react-dialog",
  "@rideds/react-drawer",
  "@rideds/react-field",
  "@rideds/react-field-button",
  "@rideds/react-fieldset",
  "@rideds/react-image",
  "@rideds/react-popover",
  "@rideds/react-portal",
  "@rideds/react-progress",
  "@rideds/react-pull-to-refresh",
  "@rideds/react-radio-group",
  "@rideds/react-segmented-control",
  "@rideds/react-slider",
  "@rideds/react-snackbar",
  "@rideds/react-switch",
  "@rideds/react-tabs",
  "@rideds/react-text-field",
  "@rideds/react-toggle",
] as const;

export const PHASE1_SMOKE_INSTALL_PACKAGE_NAMES = [
  ...PHASE1_PUBLIC_PACKAGE_NAMES,
  ...PHASE1_REACT_PUBLISH_CLOSURE_PACKAGE_NAMES,
] as const;

export const PHASE1_SMOKE_SCENARIOS = [
  {
    id: "react-css-consumer",
    publicPackageNames: ["@rideds/css", "@rideds/react"],
    localToolPackageNames: ["react", "react-dom", "typescript", "@types/react", "@types/react-dom"],
    files: {
      "tsconfig.json": createTypecheckConsumerTsconfig(),
      "src/index.tsx": [
        'import "@rideds/css/all.css";',
        'import { ActionButton } from "@rideds/react";',
        'import { createElement } from "react";',
        "",
        'export const App = () => createElement(ActionButton, null, "Phase 1");',
        "",
        "void App;",
        "",
      ].join("\n"),
    },
    steps: [
      { kind: "typecheck" },
      { kind: "bun-build", entrypoint: "./src/index.tsx", outdir: "./dist", target: "browser" },
    ],
  },
  {
    id: "stackflow-consumer",
    publicPackageNames: ["@rideds/stackflow"],
    localToolPackageNames: [
      "react",
      "react-dom",
      "typescript",
      "@types/react",
      "@types/react-dom",
      "@stackflow/core",
      "@stackflow/react",
    ],
    files: {
      "tsconfig.json": createTypecheckConsumerTsconfig(),
      "src/index.ts": [
        'import "@rideds/css/all.css";',
        'import { ruiPlugin } from "@rideds/stackflow";',
        'import { stackflow } from "@stackflow/react";',
        "",
        'const plugin = ruiPlugin({ theme: "android" });',
        "",
        "void plugin;",
        "void stackflow;",
        "",
      ].join("\n"),
    },
    steps: [
      { kind: "typecheck" },
      { kind: "bun-build", entrypoint: "./src/index.ts", outdir: "./dist", target: "browser" },
    ],
  },
  {
    id: "cli-install",
    publicPackageNames: ["@rideds/cli"],
    localToolPackageNames: [],
    files: {},
    steps: [{ kind: "exec", command: "node", args: ["./node_modules/@rideds/cli/bin/index.mjs", "--help"] }],
  },
  {
    id: "tailwind4-theme-consumer",
    publicPackageNames: ["@rideds/tailwind4-theme"],
    localToolPackageNames: ["tailwindcss"],
    files: {
      "src/theme.css": ['@import "@rideds/tailwind4-theme";', ""].join("\n"),
    },
    steps: [{ kind: "bun-build", entrypoint: "./src/theme.css", outdir: "./dist" }],
  },
] as const satisfies readonly Phase1SmokeScenario[];

export function getRepositoryRoot() {
  return resolve(import.meta.dir, "..");
}

export async function collectWorkspacePackages(repoRoot = getRepositoryRoot()) {
  const packages = new Map<string, WorkspacePackage>();

  for await (const relativePath of new Bun.Glob("packages/**/package.json").scan({
    cwd: repoRoot,
    onlyFiles: true,
  })) {
    const manifestPath = resolve(repoRoot, relativePath);
    const manifest = (await Bun.file(manifestPath).json()) as PackageJson;

    if (manifest.name == null) {
      continue;
    }

    packages.set(manifest.name, {
      directory: dirname(manifestPath),
      manifestPath,
      manifest,
    });
  }

  return packages;
}

export async function collectPhase1WorkspacePackages(repoRoot = getRepositoryRoot()) {
  const allWorkspacePackages = await collectWorkspacePackages(repoRoot);
  const byName = new Map<string, WorkspacePackage>();
  const missing: string[] = [];

  for (const packageName of new Set([
    ...PHASE1_PUBLIC_PACKAGE_NAMES,
    ...PHASE1_REACT_PUBLISH_CLOSURE_PACKAGE_NAMES,
  ])) {
    const workspacePackage = allWorkspacePackages.get(packageName);

    if (workspacePackage == null) {
      missing.push(packageName);
      continue;
    }

    byName.set(packageName, workspacePackage);
  }

  return {
    allWorkspacePackages,
    byName,
    missing,
  };
}

export async function validatePhase1WorkspacePackages(repoRoot = getRepositoryRoot()) {
  const collection = await collectPhase1WorkspacePackages(repoRoot);
  const errors = [...collection.missing.map((name) => `Missing workspace package: ${name}`)];

  for (const packageName of PHASE1_PUBLIC_PACKAGE_NAMES) {
    const workspacePackage = collection.byName.get(packageName);

    if (workspacePackage == null) {
      continue;
    }

    errors.push(...validatePublishableWorkspacePackage(workspacePackage, { packageName }));
  }

  for (const packageName of PHASE1_REACT_PUBLISH_CLOSURE_PACKAGE_NAMES) {
    const workspacePackage = collection.byName.get(packageName);

    if (workspacePackage == null) {
      continue;
    }

    errors.push(...validatePublishableWorkspacePackage(workspacePackage, { packageName }));
  }

  return {
    ...collection,
    errors,
  };
}

export function getPackageTarballFileName(workspacePackage: WorkspacePackage) {
  const version = workspacePackage.manifest.version ?? "0.0.0";
  return `${workspacePackage.manifest.name?.replace("@", "").replaceAll("/", "-")}-${version}.tgz`;
}

export async function findInstalledPackageDirectory(
  packageName: string,
  repoRoot = getRepositoryRoot(),
) {
  const directPath = resolve(repoRoot, "node_modules", ...packageName.split("/"));

  if (existsSync(resolve(directPath, "package.json"))) {
    return directPath;
  }

  const bunStoreDirectory = resolve(repoRoot, "node_modules/.bun");

  for (const entry of readdirSync(bunStoreDirectory)) {
    const candidatePath = resolve(bunStoreDirectory, entry, "node_modules", ...packageName.split("/"));

    if (existsSync(resolve(candidatePath, "package.json"))) {
      return candidatePath;
    }
  }

  throw new Error(`Unable to locate installed package directory for ${packageName}`);
}

function validatePublishableWorkspacePackage(
  workspacePackage: WorkspacePackage,
  options: { packageName: string },
) {
  const errors: string[] = [];
  const { manifest } = workspacePackage;

  if (manifest.private === true) {
    errors.push(`${options.packageName} must not be private for Phase 1 publication`);
  }

  if (manifest.publishConfig?.access !== "public") {
    errors.push(`${options.packageName} must set publishConfig.access to "public"`);
  }

  if (manifest.files == null || manifest.files.length === 0) {
    errors.push(`${options.packageName} must declare files for published output`);
  }

  if (manifest.scripts?.["lint:publish"] == null) {
    errors.push(`${options.packageName} must expose a lint:publish script for package validation`);
  }

  if (manifest.bin == null && manifest.exports == null) {
    errors.push(`${options.packageName} must define exports unless it only publishes a CLI binary`);
  }

  const upstreamDependencies = getUpstreamDependencies(manifest);

  if (upstreamDependencies.length > 0) {
    errors.push(
      `${options.packageName} has blocked upstream package dependencies: ${upstreamDependencies.join(", ")}`,
    );
  }

  return errors;
}

function getUpstreamDependencies(manifest: PackageJson) {
  const dependencyGroups = [
    manifest.dependencies,
    manifest.peerDependencies,
    manifest.optionalDependencies,
  ];

  return dependencyGroups
    .flatMap((group) => Object.keys(group ?? {}))
    .filter((dependencyName) => dependencyName.startsWith("@seed-design/"));
}

function createTypecheckConsumerTsconfig() {
  return JSON.stringify(
    {
      compilerOptions: {
        jsx: "react-jsx",
        module: "ESNext",
        moduleResolution: "Bundler",
        strict: true,
        target: "ES2022",
        lib: ["ES2022", "DOM"],
        skipLibCheck: true,
        noEmit: true,
      },
      include: ["src"],
    },
    null,
    2,
  );
}
