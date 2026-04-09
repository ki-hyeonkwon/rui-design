export const vars = {
  "base": {
    "enabled": {
      "root": {
        "colorDuration": "var(--rui-duration-color-transition)",
        "colorTimingFunction": "var(--rui-timing-function-easing)",
        "strokeWidth": "1px",
        "strokeColor": "var(--rui-color-stroke-neutral-weak)",
        "cornerRadius": "var(--rui-radius-full)"
      },
      "icon": {
        "cornerRadius": "var(--rui-radius-full)"
      }
    },
    "enabledPressed": {
      "root": {
        "color": "var(--rui-color-bg-transparent-pressed)"
      }
    },
    "enabledSelected": {
      "root": {
        "strokeWidth": "0px",
        "strokeColor": "#00000000"
      }
    }
  },
  "toneBrand": {
    "enabledSelected": {
      "root": {
        "color": "var(--rui-color-bg-brand-solid)"
      },
      "icon": {
        "color": "var(--rui-color-palette-static-white)"
      }
    },
    "enabledSelectedPressed": {
      "root": {
        "color": "var(--rui-color-bg-brand-solid-pressed)"
      }
    },
    "disabled": {
      "root": {
        "color": "var(--rui-color-palette-gray-300)"
      }
    },
    "disabledSelected": {
      "root": {
        "color": "var(--rui-color-bg-transparent)",
        "strokeWidth": "1px",
        "strokeColor": "var(--rui-color-palette-gray-300)"
      },
      "icon": {
        "color": "var(--rui-color-palette-gray-300)"
      }
    }
  },
  "toneNeutral": {
    "enabledSelected": {
      "root": {
        "color": "var(--rui-color-bg-neutral-inverted)"
      },
      "icon": {
        "color": "var(--rui-color-fg-neutral-inverted)"
      }
    },
    "enabledSelectedPressed": {
      "root": {
        "color": "var(--rui-color-bg-neutral-inverted-pressed)"
      }
    },
    "disabled": {
      "root": {
        "color": "var(--rui-color-palette-gray-300)"
      }
    },
    "disabledSelected": {
      "root": {
        "color": "var(--rui-color-bg-transparent)",
        "strokeWidth": "1px",
        "strokeColor": "var(--rui-color-palette-gray-300)"
      },
      "icon": {
        "color": "var(--rui-color-palette-gray-300)"
      }
    }
  },
  "sizeMedium": {
    "enabled": {
      "root": {
        "size": "var(--rui-dimension-x5)"
      },
      "icon": {
        "size": "var(--rui-dimension-x2)"
      }
    },
    "disabled": {
      "icon": {
        "size": "var(--rui-dimension-x2_5)"
      }
    }
  },
  "sizeLarge": {
    "enabled": {
      "root": {
        "size": "var(--rui-dimension-x6)"
      },
      "icon": {
        "size": "var(--rui-dimension-x2_5)"
      }
    },
    "disabled": {
      "icon": {
        "size": "var(--rui-dimension-x3)"
      }
    }
  }
}