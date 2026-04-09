export declare const vars: {
  "base": {
    "enabled": {
      "root": {
        "height": "var(--rui-dimension-x13)",
        "cornerRadius": "var(--rui-radius-r3)",
        "gap": "var(--rui-dimension-x2_5)",
        "paddingX": "var(--rui-dimension-x4)",
        "strokeWidth": "1px",
        "strokeColor": "var(--rui-color-stroke-neutral-weak)",
        "color": "var(--rui-color-bg-transparent)",
        "colorDuration": "var(--rui-duration-color-transition)",
        "colorTimingFunction": "var(--rui-timing-function-easing)",
        /** enabled 상태의 stroke 위에 invalid 상태의 stroke가 fade in/out 되는 데에 걸리는 시간입니다. stroke 두께나 색상 자체를 transition하지 않습니다. */
        "strokeDuration": "0.1s",
        "strokeTimingFunction": "var(--rui-timing-function-easing)"
      },
      "value": {
        "fontSize": "var(--rui-font-size-t5)",
        "lineHeight": "var(--rui-line-height-t5)",
        "fontWeight": "var(--rui-font-weight-regular)",
        "color": "var(--rui-color-fg-neutral)"
      },
      "placeholder": {
        "fontSize": "var(--rui-font-size-t5)",
        "lineHeight": "var(--rui-line-height-t5)",
        "fontWeight": "var(--rui-font-weight-regular)",
        "color": "var(--rui-color-fg-placeholder)"
      },
      "prefixText": {
        "fontSize": "var(--rui-font-size-t5)",
        "lineHeight": "var(--rui-line-height-t5)",
        "fontWeight": "var(--rui-font-weight-regular)",
        "color": "var(--rui-color-fg-neutral-muted)"
      },
      "prefixIcon": {
        "size": "var(--rui-dimension-x5)",
        "color": "var(--rui-color-fg-neutral-muted)"
      },
      "suffixText": {
        "fontSize": "var(--rui-font-size-t5)",
        "lineHeight": "var(--rui-line-height-t5)",
        "fontWeight": "var(--rui-font-weight-regular)",
        "color": "var(--rui-color-fg-neutral-muted)"
      },
      "suffixIcon": {
        "size": "var(--rui-dimension-x5)",
        "color": "var(--rui-color-fg-neutral-muted)"
      },
      "clearButton": {
        "size": "22px",
        "color": "var(--rui-color-fg-neutral-subtle)"
      }
    },
    "pressed": {
      "root": {
        "color": "var(--rui-color-bg-transparent-pressed)"
      }
    },
    "invalid": {
      "root": {
        "strokeWidth": "2px",
        "strokeColor": "var(--rui-color-stroke-critical-solid)"
      }
    },
    "disabled": {
      "root": {
        "color": "var(--rui-color-bg-disabled)"
      },
      "value": {
        "color": "var(--rui-color-fg-disabled)"
      },
      "placeholder": {
        "color": "var(--rui-color-fg-disabled)"
      }
    },
    "readonly": {
      "root": {
        "color": "var(--rui-color-bg-disabled)"
      },
      "value": {
        "color": "var(--rui-color-fg-neutral)"
      },
      "placeholder": {
        "color": "var(--rui-color-fg-placeholder)"
      }
    }
  }
}