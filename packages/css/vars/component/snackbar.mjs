export const vars = {
  "base": {
    "enabled": {
      "region": {
        "paddingX": "var(--rui-dimension-x2)",
        "paddingY": "var(--rui-dimension-x2)",
        "offsetDuration": "var(--rui-duration-d4)",
        "offsetTimingFunction": "var(--rui-timing-function-easing)"
      },
      "root": {
        "color": "var(--rui-color-bg-neutral-inverted)",
        "cornerRadius": "var(--rui-radius-r2)",
        "minHeight": "44px",
        "maxWidth": "560px",
        "paddingX": "var(--rui-dimension-x2_5)",
        "paddingY": "var(--rui-dimension-x2_5)",
        "enterOpacity": "0",
        "enterScale": "0.8",
        "enterDuration": "var(--rui-duration-d3)",
        "enterTimingFunction": "var(--rui-timing-function-enter)",
        "exitOpacity": "0",
        "exitScale": "0.8",
        "exitDuration": "var(--rui-duration-d2)",
        "exitTimingFunction": "var(--rui-timing-function-exit)"
      },
      "content": {
        "paddingX": "var(--rui-dimension-x1_5)",
        "gap": "var(--rui-dimension-x2_5)"
      },
      "message": {
        "color": "var(--rui-color-fg-neutral-inverted)",
        "fontSize": "var(--rui-font-size-t4)",
        "lineHeight": "var(--rui-line-height-t4)",
        "fontWeight": "var(--rui-font-weight-regular)"
      },
      "prefixIcon": {
        "size": "24px",
        "paddingRight": "var(--rui-dimension-x0_5)"
      },
      "actionButton": {
        "targetPaddingX": "var(--rui-dimension-x2)",
        "targetMinHeight": "44px",
        "color": "var(--rui-color-fg-brand)",
        "fontSize": "var(--rui-font-size-t4)",
        "lineHeight": "var(--rui-line-height-t4)",
        "fontWeight": "var(--rui-font-weight-bold)"
      }
    }
  },
  "variantDefault": {},
  "variantPositive": {
    "enabled": {
      "prefixIcon": {
        "color": "var(--rui-color-fg-positive)"
      }
    }
  },
  "variantCritical": {
    "enabled": {
      "prefixIcon": {
        "color": "var(--rui-color-fg-critical)"
      }
    }
  }
}