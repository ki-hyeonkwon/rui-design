export const vars = {
  "base": {
    "enabled": {
      "root": {
        "cornerRadius": "var(--rui-radius-full)",
        "shadow": "var(--rui-shadow-s3)",
        "colorDuration": "var(--rui-duration-color-transition)",
        "colorTimingFunction": "var(--rui-timing-function-easing)"
      },
      "progressCircle": {
        "size": "16px",
        "thickness": "2px"
      }
    }
  },
  "variantSolid": {
    "enabled": {
      "root": {
        "color": "var(--rui-color-bg-neutral-inverted)"
      },
      "progressCircle": {
        "trackColor": "var(--rui-color-palette-gray-700)",
        "rangeColor": "var(--rui-color-fg-neutral-inverted)"
      },
      "label": {
        "color": "var(--rui-color-fg-neutral-inverted)"
      },
      "prefixIcon": {
        "color": "var(--rui-color-fg-neutral-inverted)"
      },
      "icon": {
        "color": "var(--rui-color-fg-neutral-inverted)"
      }
    },
    "pressed": {
      "root": {
        "color": "var(--rui-color-bg-neutral-inverted-pressed)"
      }
    },
    "disabled": {
      "root": {
        "color": "var(--rui-color-bg-disabled)"
      },
      "label": {
        "color": "var(--rui-color-fg-disabled)"
      },
      "prefixIcon": {
        "color": "var(--rui-color-fg-disabled)"
      },
      "icon": {
        "color": "var(--rui-color-fg-disabled)"
      }
    },
    "loading": {
      "root": {
        "color": "var(--rui-color-bg-neutral-inverted-pressed)"
      }
    }
  },
  "variantLayer": {
    "enabled": {
      "root": {
        "color": "var(--rui-color-bg-layer-floating)"
      },
      "progressCircle": {
        "trackColor": "var(--rui-color-palette-gray-500)",
        "rangeColor": "var(--rui-color-fg-neutral)"
      },
      "label": {
        "color": "var(--rui-color-fg-neutral)"
      },
      "prefixIcon": {
        "color": "var(--rui-color-fg-neutral)"
      },
      "icon": {
        "color": "var(--rui-color-fg-neutral)"
      }
    },
    "pressed": {
      "root": {
        "color": "var(--rui-color-bg-layer-floating-pressed)"
      }
    },
    "disabled": {
      "root": {
        "color": "var(--rui-color-bg-disabled)"
      },
      "label": {
        "color": "var(--rui-color-fg-disabled)"
      },
      "prefixIcon": {
        "color": "var(--rui-color-fg-disabled)"
      },
      "icon": {
        "color": "var(--rui-color-fg-disabled)"
      }
    },
    "loading": {
      "root": {
        "color": "var(--rui-color-bg-layer-floating-pressed)"
      }
    }
  },
  "layoutWithText": {
    "enabled": {
      "root": {
        "minHeight": "36px",
        "paddingX": "var(--rui-dimension-x3_5)",
        "paddingY": "var(--rui-dimension-x2)",
        "gap": "var(--rui-dimension-x1)"
      },
      "label": {
        "fontSize": "var(--rui-font-size-t4)",
        "lineHeight": "var(--rui-line-height-t4)",
        "fontWeight": "var(--rui-font-weight-medium)"
      },
      "prefixIcon": {
        "size": "16px"
      }
    }
  },
  "layoutIconOnly": {
    "enabled": {
      "root": {
        "size": "44px"
      },
      "icon": {
        "size": "22px"
      }
    }
  }
}