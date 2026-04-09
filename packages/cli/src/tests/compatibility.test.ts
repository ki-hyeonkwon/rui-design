import { afterEach, describe, expect, it } from "bun:test";
import fs from "fs-extra";
import os from "os";
import path from "path";
import type { PublicRegistry } from "@/src/schema";
import {
  analyzeRegistryItemCompatibility,
  findInstalledSnippetItemKeys,
} from "../utils/compatibility";

const registries: PublicRegistry[] = [
  {
    id: "ui",
    items: [
      {
        id: "action-button",
        snippets: [
          {
            path: "action-button.tsx",
            dependencies: {
              "@rui/react": "~1.0.0",
              "@rui/css": "~1.0.0",
            },
          },
        ],
      },
      {
        id: "checkbox",
        snippets: [
          {
            path: "checkbox.tsx",
            dependencies: {
              "@rui/react": "~1.2.0",
              "@rui/css": "~1.2.0",
            },
          },
        ],
      },
    ],
  },
];

describe("analyzeRegistryItemCompatibility", () => {
  it("정확한 버전이 모두 호환되면 이슈가 없어야 함", () => {
    const report = analyzeRegistryItemCompatibility({
      publicRegistries: registries,
      itemKeys: ["ui:action-button"],
      projectPackageVersions: {
        "@rui/react": "1.0.9",
        "@rui/css": "1.0.2",
      },
    });

    expect(report.issues).toHaveLength(0);
  });

  it("요구 범위를 만족하지 못하면 incompatible 이슈를 리턴해야 함", () => {
    const report = analyzeRegistryItemCompatibility({
      publicRegistries: registries,
      itemKeys: ["ui:checkbox"],
      projectPackageVersions: {
        "@rui/react": "1.1.0",
        "@rui/css": "1.2.1",
      },
    });

    expect(report.issues).toHaveLength(1);
    expect(report.issues[0]).toMatchObject({
      itemKey: "ui:checkbox",
      packageName: "@rui/react",
      type: "incompatible-version",
    });
  });

  it("패키지가 없으면 missing-package 이슈를 리턴해야 함", () => {
    const report = analyzeRegistryItemCompatibility({
      publicRegistries: registries,
      itemKeys: ["ui:action-button"],
      projectPackageVersions: {
        "@rui/react": "1.0.9",
      },
    });

    expect(report.issues).toHaveLength(1);
    expect(report.issues[0]).toMatchObject({
      itemKey: "ui:action-button",
      packageName: "@rui/css",
      type: "missing-package",
    });
  });

  it("workspace range처럼 버전 스펙이 range여도 교집합이 있으면 호환으로 처리해야 함", () => {
    const report = analyzeRegistryItemCompatibility({
      publicRegistries: registries,
      itemKeys: ["ui:action-button"],
      projectPackageVersions: {
        "@rui/react": "workspace:^1.0.0",
        "@rui/css": "workspace:^1.0.0",
      },
    });

    expect(report.issues).toHaveLength(0);
  });

  it("해석할 수 없는 버전 스펙이면 invalid-version-spec 이슈를 리턴해야 함", () => {
    const report = analyzeRegistryItemCompatibility({
      publicRegistries: registries,
      itemKeys: ["ui:action-button"],
      projectPackageVersions: {
        "@rui/react": "workspace:*",
        "@rui/css": "1.0.2",
      },
    });

    expect(report.issues).toHaveLength(1);
    expect(report.issues[0]).toMatchObject({
      itemKey: "ui:action-button",
      packageName: "@rui/react",
      type: "invalid-version-spec",
    });
  });
});

describe("findInstalledSnippetItemKeys", () => {
  const tempDirs: string[] = [];

  afterEach(async () => {
    while (tempDirs.length > 0) {
      const dir = tempDirs.pop();
      if (dir) await fs.remove(dir);
    }
  });

  it("jsx/js 변환 케이스도 설치된 스니펫으로 인식해야 함", async () => {
    const rootPath = await fs.mkdtemp(path.join(os.tmpdir(), "seed-cli-compat-"));
    tempDirs.push(rootPath);

    await fs.ensureDir(path.join(rootPath, "ui"));
    await fs.writeFile(path.join(rootPath, "ui", "action-button.jsx"), "export {};");

    const installed = findInstalledSnippetItemKeys({
      publicRegistries: registries,
      rootPath,
    });

    expect(installed).toEqual(["ui:action-button"]);
  });
});
