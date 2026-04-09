export declare const vars: {
  "base": {
    "enabled": {
      "root": {
        "cornerRadius": "var(--rui-radius-r3)",
        "color": "var(--rui-color-bg-transparent)",
        "strokeColor": "var(--rui-color-stroke-neutral-muted)",
        "strokeWidth": "1px",
        "colorDuration": "var(--rui-duration-color-transition)",
        "colorTimingFunction": "var(--rui-timing-function-easing)",
        /** enabled 상태의 stroke 위에 selected 상태의 stroke가 fade in/out 되는 데에 걸리는 시간입니다. stroke 두께나 색상 자체를 transition하지 않습니다. */
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
        /** 열릴 때는 천천히 펼쳐지고 빠르게 fade in됩니다. */
        "expandHeightDuration": "400ms",
        "expandHeightTimingFunction": "var(--rui-timing-function-easing)",
        /** 열릴 때는 천천히 펼쳐지고 빠르게 fade in됩니다. */
        "expandOpacityDuration": "var(--rui-duration-d6)",
        "expandOpacityTimingFunction": "var(--rui-timing-function-easing)",
        /** 닫힐 때는 빠르게 접히고 천천히 fade out됩니다. */
        "collapseHeightDuration": "var(--rui-duration-d6)",
        "collapseHeightTimingFunction": "var(--rui-timing-function-easing)",
        /** 닫힐 때는 빠르게 접히고 천천히 fade out됩니다. */
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