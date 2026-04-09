export declare const vars: {
  "base": {
    "enabled": {
      "root": {
        "gap": "var(--rui-dimension-x0_5)"
      },
      "control": {
        "height": "26px"
      },
      "track": {
        "height": "var(--rui-dimension-x1)",
        "cornerRadius": "var(--rui-radius-full)",
        "color": "var(--rui-color-palette-gray-400)"
      },
      "range": {
        "cornerRadius": "var(--rui-radius-full)",
        "color": "var(--rui-color-fg-neutral)",
        "widthDuration": "var(--rui-duration-d3)",
        "widthTimingFunction": "var(--rui-timing-function-easing)"
      },
      "thumb": {
        "size": "var(--rui-dimension-x5)",
        "cornerRadius": "var(--rui-radius-full)",
        "color": "var(--rui-color-bg-neutral-inverted)"
      },
      /** arrow width + (valueIndicatorRoot paddingX * 2)만큼의 최소 너비를 가집니다. */
      "valueIndicatorRoot": {
        "color": "var(--rui-color-bg-neutral-inverted)",
        "cornerRadius": "var(--rui-radius-r1_5)",
        /** value indicator 내부 좌우 여백입니다. arrow와 valueIndicatorRoot 경계 사이의 최소 간격에도 동일한 값이 적용됩니다. */
        "paddingX": "var(--rui-dimension-x2)",
        "paddingY": "var(--rui-dimension-x1)",
        "offsetY": "var(--rui-dimension-x3)",
        "enterScale": "0.9",
        "enterOpacity": "0",
        "enterDuration": "var(--rui-duration-d4)",
        "enterTimingFunction": "var(--rui-timing-function-enter)",
        "exitScale": "1",
        "exitOpacity": "0",
        "exitDuration": "var(--rui-duration-d4)",
        "exitTimingFunction": "var(--rui-timing-function-easing)",
        "translateDuration": "var(--rui-duration-d3)",
        "translateTimingFunction": "var(--rui-timing-function-easing)"
      },
      "valueIndicatorArrow": {
        "color": "var(--rui-color-bg-neutral-inverted)",
        "width": "var(--rui-dimension-x2)",
        "height": "var(--rui-dimension-x1_5)",
        "cornerRadius": "var(--rui-radius-r0_5)",
        /** arrow와 thumb 사이의 거리를 정의합니다. */
        "gutter": "var(--rui-dimension-x0_5)"
      },
      "valueIndicatorLabel": {
        "color": "var(--rui-color-fg-neutral-inverted)",
        "fontSize": "var(--rui-font-size-t3)",
        "lineHeight": "var(--rui-line-height-t3)",
        "fontWeight": "var(--rui-font-weight-medium)"
      },
      "marker": {
        "color": "var(--rui-color-fg-neutral-muted)",
        "fontWeight": "var(--rui-font-weight-regular)",
        "fontSize": "var(--rui-font-size-t3)",
        "lineHeight": "var(--rui-line-height-t3)"
      }
    },
    "disabled": {
      "range": {
        "color": "var(--rui-color-fg-disabled)"
      },
      "thumb": {
        "color": "var(--rui-color-fg-disabled)"
      },
      "marker": {
        "color": "var(--rui-color-fg-disabled)"
      }
    }
  }
}