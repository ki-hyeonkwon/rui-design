# RUI Design System Fork Plan

## Goal
Transform this SEED-based monorepo into an independent `rui` design system while preserving the existing token/component/generator architecture.

## Fixed Decisions
- Baseline stays in `rui-dev`; implementation happens only in `rui-design-dev`.
- Color strategy is semantic remap only.
- `brand` uses existing `blue` palette.
- `informative` uses existing `gray` palette.
- `focus-ring` stays `blue-600`.
- `carrot` palette remains for compatibility and deferred cleanup.
- Karrot-specific assets are deferred unless they block `rui` public surface isolation.

## Rolling-Wave Execution
### Wave 1
- Create isolated workspace and internal tracking docs.
- Inventory SEED- and Karrot-bound strings and surfaces.
- Update `packages/rootage/color.yaml` semantic mappings.
- Run `bun generate:all`.
- Validate brand/informative behavior in light and dark themes.

### Wave 2
- Rename core package graph from `@rideds/*` to `@rideds/*`.
- Rename stackflow plugin API to `ruiPlugin` and plugin key to `rui`.

### Wave 3
- Rename runtime prefixes: `--rui-*`, `.rui-*`, `data-rui-*` to `rui`.
- Align generated artifacts and runtime helpers.

### Wave 4
- Rename consumer surface: CLI, config, snippet alias, docs, stories, examples.

### Wave 5
- Rename tooling and release/deploy surfaces: figma, mcp, workflows, metadata, docs URLs.

### Wave 6
- Run zero-SEED audit on active surfaces and separate deferred Karrot debt.

## Validation
- `bun generate:all`
- `bun packages:build`
- `bun ecosystem:build`
- `bun docs:build`
- `bun test:all`
- Visual QA for brand/informative components in light and dark mode.
