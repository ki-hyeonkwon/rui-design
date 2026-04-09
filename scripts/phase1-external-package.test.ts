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
      "@rui/react",
      "@rui/css",
      "@rui/stackflow",
      "@rui/cli",
      "@rui/tailwind4-theme",
    ]);
  });

  test("freezes the @rui/react publish closure from the master plan", () => {
    expect(PHASE1_REACT_PUBLISH_CLOSURE_PACKAGE_NAMES).toEqual([
      "@rui/dom-utils",
      "@rui/react-primitive",
      "@rui/react-supports",
      "@rui/react-use-controllable-state",
      "@rui/react-avatar",
      "@rui/react-checkbox",
      "@rui/react-collapsible",
      "@rui/react-dialog",
      "@rui/react-drawer",
      "@rui/react-field",
      "@rui/react-field-button",
      "@rui/react-fieldset",
      "@rui/react-image",
      "@rui/react-popover",
      "@rui/react-portal",
      "@rui/react-progress",
      "@rui/react-pull-to-refresh",
      "@rui/react-radio-group",
      "@rui/react-segmented-control",
      "@rui/react-slider",
      "@rui/react-snackbar",
      "@rui/react-switch",
      "@rui/react-tabs",
      "@rui/react-text-field",
      "@rui/react-toggle",
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
