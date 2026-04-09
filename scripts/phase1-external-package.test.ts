import { describe, expect, test } from "bun:test";

import {
  PHASE1_PUBLIC_PACKAGE_NAMES,
  PHASE1_REACT_PUBLISH_CLOSURE_PACKAGE_NAMES,
  PHASE1_SMOKE_SCENARIOS,
  getRepositoryRoot,
  collectPhase1WorkspacePackages,
  validatePhase1WorkspacePackages,
} from "./phase1-external-package";

describe("Phase 1 external package baseline", () => {
  test("freezes the public package list from the master plan", () => {
    expect(PHASE1_PUBLIC_PACKAGE_NAMES).toEqual([
      "@rideds/react",
      "@rideds/css",
      "@rideds/stackflow",
      "@rideds/cli",
      "@rideds/tailwind4-theme",
    ]);
  });

  test("freezes the @rideds/react publish closure from the master plan", () => {
    expect(PHASE1_REACT_PUBLISH_CLOSURE_PACKAGE_NAMES).toEqual([
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
    ]);
  });

  test("finds manifests for every Phase 1 package", async () => {
    const result = await collectPhase1WorkspacePackages();

    expect(result.missing).toEqual([]);
    expect(result.byName.size).toBe(
      new Set([...PHASE1_PUBLIC_PACKAGE_NAMES, ...PHASE1_REACT_PUBLISH_CLOSURE_PACKAGE_NAMES]).size,
    );
  });

  test("keeps Phase 1 package manifests publishable for external consumers", async () => {
    const result = await validatePhase1WorkspacePackages();

    expect(result.errors).toEqual([]);
  });

  test("covers every public package with an external smoke scenario", () => {
    expect(PHASE1_SMOKE_SCENARIOS.map((scenario) => scenario.id)).toEqual([
      "react-css-consumer",
      "stackflow-consumer",
      "cli-install",
      "tailwind4-theme-consumer",
    ]);

    expect(
      new Set(PHASE1_SMOKE_SCENARIOS.flatMap((scenario) => scenario.publicPackageNames)),
    ).toEqual(new Set(PHASE1_PUBLIC_PACKAGE_NAMES));
  });

  test("exposes root phase1 commands for repeatable validation", async () => {
    const manifest = (await Bun.file(`${getRepositoryRoot()}/package.json`).json()) as {
      scripts?: Record<string, string>;
    };

    expect(manifest.scripts?.["phase1:test"]).toBeDefined();
    expect(manifest.scripts?.["phase1:typecheck"]).toBeDefined();
    expect(manifest.scripts?.["phase1:smoke"]).toBeDefined();
    expect(manifest.scripts?.["phase1:validate"]).toBeDefined();
  });
});
