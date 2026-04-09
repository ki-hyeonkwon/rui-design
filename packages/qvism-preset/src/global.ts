import { vars } from "./vars";
import { defineGlobalCss } from "./utils/define";
import { active, pseudo } from "./utils/pseudo";

export const globalCss = defineGlobalCss({
  ":root": {
    "--rui-safe-area-top": "0px",
    "--rui-safe-area-bottom": "0px",

    "@supports (left: constant(safe-area-inset-left))": {
      "--rui-safe-area-top": "constant(safe-area-inset-top)",
      "--rui-safe-area-bottom": "constant(safe-area-inset-bottom)",
    },

    "@supports (left: env(safe-area-inset-left))": {
      "--rui-safe-area-top": "env(safe-area-inset-top)",
      "--rui-safe-area-bottom": "env(safe-area-inset-bottom)",
    },

    // Font scaling variables
    "--rui-font-size-multiplier": "1",
    "--rui-font-size-limit-min": "0.8",
    "--rui-font-size-limit-max": "1.5", // Android default 150%
    "--rui-line-height-limit-min": "0.8",
    "--rui-line-height-limit-max": "1.5", // Android default 150%
  },

  // iOS platform-specific overrides
  "[data-rui-platform='ios']": {
    "--rui-font-size-limit-max": "1.35", // iOS 135% limit
    "--rui-line-height-limit-max": "1.35",
  },

  "html[data-rui-platform='ios'][data-rui-font-scaling='enabled']": {
    "@supports (font: -apple-system-body)": {
      /**
       * 0.9412 is the font size multiplier for iOS
       * It converts iOS default 17px to web standard 16px
       * Individual font sizes are clamped to max 135% in the token system
       */
      "--rui-font-size-multiplier": "0.9412",
      font: "-apple-system-body",
    },
  },

  ".rui-loading-indicator": {
    position: "absolute",
    display: "inline-flex",
  },
  ".rui-icon, .rui-prefix-icon, .rui-suffix-icon": {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    verticalAlign: "middle",
  },
  ".rui-icon": {
    width: "var(--rui-icon-size)",
    height: "var(--rui-icon-size)",
    color: "var(--rui-icon-color, currentColor)",
  },
  ".rui-prefix-icon": {
    width: "var(--rui-prefix-icon-size)",
    height: "var(--rui-prefix-icon-size)",
    color: "var(--rui-prefix-icon-color, currentColor)",

    marginLeft: "var(--rui-prefix-icon-margin-left, 0)",
    marginRight: "var(--rui-prefix-icon-margin-right, 0)",
    marginTop: "var(--rui-prefix-icon-margin-top, 0)",
    marginBottom: "var(--rui-prefix-icon-margin-bottom, 0)",

    alignSelf: "var(--rui-prefix-icon-align-self)",
    justifySelf: "var(--rui-prefix-icon-justify-self)",
  },
  ".rui-suffix-icon": {
    width: "var(--rui-suffix-icon-size)",
    height: "var(--rui-suffix-icon-size)",
    color: "var(--rui-suffix-icon-color, currentColor)",

    marginLeft: "var(--rui-suffix-icon-margin-left, 0)",
    marginRight: "var(--rui-suffix-icon-margin-right, 0)",
    marginTop: "var(--rui-suffix-icon-margin-top, 0)",
    marginBottom: "var(--rui-suffix-icon-margin-bottom, 0)",

    alignSelf: "var(--rui-suffix-icon-align-self)",
    justifySelf: "var(--rui-suffix-icon-justify-self)",
  },
  ".rui-count": {
    fontSize: "var(--rui-count-font-size)",
    lineHeight: "var(--rui-count-line-height)",
    fontWeight: "var(--rui-count-font-weight)",
    color: "var(--rui-count-color)",
  },
  ".rui-box": {
    "--rui-box-background": "initial",
    "--rui-box-color": "initial",
    background: "var(--rui-box-background)",
    color: "var(--rui-box-color)",

    "--rui-box-border-style": "solid",
    "--rui-box-border-color": "initial",
    borderStyle: "var(--rui-box-border-style)",
    borderColor: "var(--rui-box-border-color)",

    "--rui-box-border-width": "0",
    "--rui-box-border-top-width": "var(--rui-box-border-width)",
    "--rui-box-border-bottom-width": "var(--rui-box-border-width)",
    "--rui-box-border-left-width": "var(--rui-box-border-width)",
    "--rui-box-border-right-width": "var(--rui-box-border-width)",
    borderTopWidth: "var(--rui-box-border-top-width)",
    borderBottomWidth: "var(--rui-box-border-bottom-width)",
    borderLeftWidth: "var(--rui-box-border-left-width)",
    borderRightWidth: "var(--rui-box-border-right-width)",

    "--rui-box-padding": "0",
    "--rui-box-padding-y": "var(--rui-box-padding)",
    "--rui-box-padding-x": "var(--rui-box-padding)",
    "--rui-box-padding-bottom": "var(--rui-box-padding-y)",
    "--rui-box-padding-top": "var(--rui-box-padding-y)",
    "--rui-box-padding-left": "var(--rui-box-padding-x)",
    "--rui-box-padding-right": "var(--rui-box-padding-x)",
    paddingTop: "var(--rui-box-padding-top)",
    paddingBottom: "var(--rui-box-padding-bottom)",
    paddingLeft: "var(--rui-box-padding-left)",
    paddingRight: "var(--rui-box-padding-right)",

    "--rui-box-bleed-bottom": "0px",
    "--rui-box-bleed-top": "0px",
    "--rui-box-bleed-left": "0px",
    "--rui-box-bleed-right": "0px",
    marginTop: "calc(var(--rui-box-bleed-top) * -1)",
    marginBottom: "calc(var(--rui-box-bleed-bottom) * -1)",
    marginLeft: "calc(var(--rui-box-bleed-left) * -1)",
    marginRight: "calc(var(--rui-box-bleed-right) * -1)",

    "--rui-box-min-height": "initial",
    "--rui-box-max-height": "initial",
    "--rui-box-height": "initial",
    "--rui-box-min-width": "initial",
    "--rui-box-max-width": "initial",
    "--rui-box-width": "initial",
    minHeight: "var(--rui-box-min-height)",
    maxHeight: "var(--rui-box-max-height)",
    height: "var(--rui-box-height)",
    minWidth: "var(--rui-box-min-width)",
    maxWidth: "var(--rui-box-max-width)",
    width: "var(--rui-box-width)",

    "--rui-box-top": "initial",
    "--rui-box-bottom": "initial",
    "--rui-box-left": "initial",
    "--rui-box-right": "initial",
    top: "var(--rui-box-top)",
    bottom: "var(--rui-box-bottom)",
    left: "var(--rui-box-left)",
    right: "var(--rui-box-right)",

    "--rui-box-border-radius": "initial",
    "--rui-box-border-bottom-left-radius": "var(--rui-box-border-radius)",
    "--rui-box-border-bottom-right-radius": "var(--rui-box-border-radius)",
    "--rui-box-border-top-left-radius": "var(--rui-box-border-radius)",
    "--rui-box-border-top-right-radius": "var(--rui-box-border-radius)",
    borderBottomLeftRadius: "var(--rui-box-border-bottom-left-radius)",
    borderBottomRightRadius: "var(--rui-box-border-bottom-right-radius)",
    borderTopLeftRadius: "var(--rui-box-border-top-left-radius)",
    borderTopRightRadius: "var(--rui-box-border-top-right-radius)",

    "--rui-box-box-shadow": "initial",
    boxShadow: "var(--rui-box-box-shadow)",

    "--rui-box-display": "block",
    "--rui-box-position": "initial",
    display: "var(--rui-box-display)",
    position: "var(--rui-box-position)",

    // NOTE: Not sure how to treat transform/translate right now, mark as unstable until we have a better solution.
    "--rui-box-unstable-transform": "initial",
    transform: "var(--rui-box-unstable-transform)",

    "--rui-box-z-index": "initial",
    zIndex: "var(--rui-box-z-index)",

    "--rui-box-overflow-x": "initial",
    "--rui-box-overflow-y": "initial",
    overflowX: "var(--rui-box-overflow-x)",
    overflowY: "var(--rui-box-overflow-y)",

    "--rui-box-flex-grow": "initial",
    "--rui-box-flex-shrink": "initial",
    flexGrow: "var(--rui-box-flex-grow)",
    flexShrink: "var(--rui-box-flex-shrink)",

    "--rui-box-flex-direction": "initial",
    "--rui-box-flex-wrap": "initial",
    "--rui-box-justify-content": "initial",
    "--rui-box-justify-self": "auto",
    "--rui-box-align-items": "stretch",
    "--rui-box-align-content": "stretch",
    "--rui-box-align-self": "auto",
    "--rui-box-gap": "initial",
    flexDirection: "var(--rui-box-flex-direction)",
    flexWrap: "var(--rui-box-flex-wrap)",
    justifyContent: "var(--rui-box-justify-content)",
    justifySelf: "var(--rui-box-justify-self)",
    alignItems: "var(--rui-box-align-items)",
    alignContent: "var(--rui-box-align-content)",
    alignSelf: "var(--rui-box-align-self)",
    gap: "var(--rui-box-gap)",

    "--rui-box-grid-column": "initial",
    gridColumn: "var(--rui-box-grid-column)",
    "--rui-box-grid-row": "initial",
    gridRow: "var(--rui-box-grid-row)",

    // Only apply active background when explicitly opted in via _active prop.
    // Without [data-has-active-bg], the :active rule's higher specificity (0,2,0)
    // would override external class backgrounds (e.g. .bg-red-500) with initial (transparent) even when _active is not set.
    // this workaround can be removed when decide to support cascade layers by default
    [pseudo("[data-has-active-bg]", active)]: {
      background: "var(--rui-box-background--active)",
    },
  },
  ".rui-grid": {
    display: "grid",

    "--rui-grid-columns": "initial",
    gridTemplateColumns: "var(--rui-grid-columns)",
    "--rui-grid-rows": "initial",
    gridTemplateRows: "var(--rui-grid-rows)",
    "--rui-grid-auto-flow": "initial",
    gridAutoFlow: "var(--rui-grid-auto-flow)",
    "--rui-grid-auto-columns": "initial",
    gridAutoColumns: "var(--rui-grid-auto-columns)",
    "--rui-grid-auto-rows": "initial",
    gridAutoRows: "var(--rui-grid-auto-rows)",
    "--rui-grid-justify-items": "stretch",
    justifyItems: "var(--rui-grid-justify-items)",
  },
  ".rui-consistent-width": {
    // Consistent text width between font-weight changes
    "&:before": {
      content: "attr(data-text)",
      display: "block",
      visibility: "hidden",
      height: 0,
      fontWeight: vars.$fontWeight.regular,
    },
    "&:after": {
      content: "attr(data-text)",
      display: "block",
      visibility: "hidden",
      height: 0,
      fontWeight: vars.$fontWeight.bold,
    },
  },
});
