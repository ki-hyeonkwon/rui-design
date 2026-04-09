export const vars = {
  "base": {
    "enabled": {
      "root": {
        "cornerRadius": "var(--rui-radius-r3)",
        "color": "var(--rui-color-bg-transparent)",
        "strokeColor": "var(--rui-color-stroke-neutral-muted)",
        "strokeWidth": "1px",
        "colorDuration": "var(--rui-duration-color-transition)",
        "colorTimingFunction": "var(--rui-timing-function-easing)",
        "strokeDuration": "0.1s",
        "strokeTimingFunction": "var(--rui-timing-function-easing)"
      },
      "trigger": {
        "gap": "var(--rui-dimension-x1_5)"
      },
      "prefixIcon": {
        "color": "var(--rui-color-fg-neutral)",
        "size": "22px"
      },
      "body": {
        "gap": "var(--rui-dimension-x0_5)",
        "paddingRight": "var(--rui-dimension-x1)"
      },
      "label": {
        "gap": "var(--rui-dimension-x1)",
        "color": "var(--rui-color-fg-neutral)",
        "fontSize": "var(--rui-font-size-t5)",
        "lineHeight": "var(--rui-line-height-t5)",
        "fontWeight": "var(--rui-font-weight-medium)"
      },
      "description": {
        "color": "var(--rui-color-fg-neutral-muted)",
        "fontSize": "var(--rui-font-size-t3)",
        "lineHeight": "var(--rui-line-height-t3)",
        "fontWeight": "var(--rui-font-weight-regular)"
      },
      "footer": {
        "expandHeightDuration": "400ms",
        "expandHeightTimingFunction": "var(--rui-timing-function-easing)",
        "expandOpacityDuration": "var(--rui-duration-d6)",
        "expandOpacityTimingFunction": "var(--rui-timing-function-easing)",
        "collapseHeightDuration": "var(--rui-duration-d6)",
        "collapseHeightTimingFunction": "var(--rui-timing-function-easing)",
        "collapseOpacityDuration": "400ms",
        "collapseOpacityTimingFunction": "var(--rui-timing-function-easing)"
      }
    },
    "selected": {
      "root": {
        "strokeWidth": "2px"
      }
    },
    "enabledSelected": {
      "root": {
        "strokeColor": "var(--rui-color-stroke-neutral-contrast)"
      }
    },
    "disabled": {
      "root": {
        "strokeColor": "var(--rui-color-stroke-neutral-muted)"
      },
      "prefixIcon": {
        "color": "var(--rui-color-fg-disabled)"
      },
      "label": {
        "color": "var(--rui-color-fg-disabled)"
      },
      "description": {
        "color": "var(--rui-color-fg-disabled)"
      }
    },
    "enabledPressed": {
      "root": {
        "color": "var(--rui-color-bg-transparent-pressed)"
      }
    }
  },
  "layoutHorizontal": {
    "enabled": {
      "trigger": {
        "paddingLeft": "var(--rui-dimension-x5)",
        "paddingRight": "var(--rui-dimension-x4)",
        "paddingY": "var(--rui-dimension-x4)"
      },
      "content": {
        "gap": "var(--rui-dimension-x3)"
      }
    }
  },
  "layoutVertical": {
    "enabled": {
      "trigger": {
        "paddingX": "var(--rui-dimension-x4)",
        "paddingY": "var(--rui-dimension-x5)"
      },
      "content": {
        "gap": "var(--rui-dimension-x2_5)"
      }
    }
  }
}