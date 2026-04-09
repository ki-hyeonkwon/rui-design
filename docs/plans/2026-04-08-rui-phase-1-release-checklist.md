# RUI Phase 1 Release Checklist

> Role: Release Checklist
> Purpose: Phase 1 public package release 전 확인 항목과 종료 기준을 정리하는 체크리스트
> Read this when: `@rideds/*` Phase 1 공개 패키지를 배포 직전 다시 점검하거나, Phase 1이 무엇까지 완료되었는지 빠르게 확인할 때
> Canonical: No
> Related docs: `2026-04-08-rui-phased-master-plan.md`

## Summary

This checklist closes Phase 1 at the operational level.

It is narrower than full independence and is focused on one question:

**Can the Phase 1 public `@rideds/*` packages be validated and released as external-consumer-ready packages?**

Current validated public packages:

- `@rideds/react`
- `@rideds/css`
- `@rideds/stackflow`
- `@rideds/cli`
- `@rideds/tailwind4-theme`

## Release Gates

### Gate A: Package surface is fixed

- [x] Phase 1 public package list is frozen in source
- [x] `@rideds/react` publish closure is frozen in source
- [x] Public package manifests expose publishable metadata
  - `publishConfig.access`
  - `files`
  - `exports` or `bin`
  - `lint:publish`

Primary evidence:

- `scripts/phase1-external-package.ts`
- `scripts/phase1-external-package.test.ts`

### Gate B: External consumer smoke is automated

- [x] `@rideds/react` + `@rideds/css` external consumer smoke exists
- [x] `@rideds/stackflow` external consumer smoke exists
- [x] `@rideds/cli` external install/execute smoke exists
- [x] `@rideds/tailwind4-theme` external CSS import/build smoke exists
- [x] Smoke uses packed tarballs, not workspace-only imports

Primary evidence:

- `scripts/phase1-external-package-smoke.ts`

### Gate C: Repeatable validation entrypoints exist

- [x] `bun phase1:test`
- [x] `bun phase1:typecheck`
- [x] `bun phase1:smoke`
- [x] `bun phase1:validate`

Primary evidence:

- root `package.json`

### Gate D: CI enforces the gate

- [x] GitHub Actions workflow runs `bun phase1:validate`
- [x] Workflow is wired to Phase 1 relevant paths
- [x] Workflow can be run manually with `workflow_dispatch`

Primary evidence:

- `.github/workflows/phase1-validate.yml`

### Gate E: README install path exists

- [x] Root README includes external install entrypoints
- [x] `@rideds/react` README includes install + usage
- [x] `@rideds/stackflow` README includes install + usage
- [x] `@rideds/cli` README includes external install path
- [x] `@rideds/tailwind4-theme` README is updated to RUI wording and install path

## Required Commands Before Release

Run these from the repository root:

```bash
bun phase1:validate
bun generate:all
bun test:all
```

Recommended interpretation:

- `bun phase1:validate`
  - proves public package surface, typecheck, and external smoke
- `bun generate:all`
  - proves generation outputs remain reproducible
- `bun test:all`
  - proves no regression across the full repository test suite

## Expected Release Evidence

Fresh evidence should include:

- successful `bun phase1:validate`
- successful `bun generate:all`
- successful `bun test:all`
- published package list for this release batch
- release notes / changesets covering affected public packages

## Known Phase 1 Boundaries

These items are intentionally **not** required to close Phase 1:

- full icon independence
- full Sanity independence
- full Figma/MCP ownership migration
- removal of every upstream string from docs/history/archive outputs

## Phase 2 Carry-Over

Known work that remains after Phase 1:

- replace upstream icon ownership with `@rui`-owned icon packages/data
- remove active `@seed-design/react-icon` bridge usage from later-phase surfaces
- remove active `@karrotmarket/*` dependencies from icon-related tooling and docs surfaces

## Result

Phase 1 is operationally ready when:

- the release gates above stay green
- the required commands pass with fresh output
- the release batch only targets the approved public Phase 1 package surface

At that point, further work should move to Phase 2 rather than reopening Phase 1 scope.
