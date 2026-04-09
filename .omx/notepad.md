

## MANUAL
Debugging lesson for RUI icon/Storybook issues: check the actual consumer path first, not just src. Storybook/docs registry may read built package outputs (lib) rather than source. For icon sizing regressions, verify in order: 1) className namespace match (`rui-*` vs legacy `seed-*`), 2) `Radix Slot` applies class to the SVG itself, 3) whether Storybook is using stale built artifacts before assuming token or SVG-size logic is the primary cause.
