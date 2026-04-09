export declare const vars: {
  "base": {
    "enabled": {
      "root": {
        "colorDuration": "var(--rui-duration-color-transition)",
        "colorTimingFunction": "var(--rui-timing-function-easing)",
        "cornerRadius": "var(--rui-radius-full)"
      },
      /** Icon, Avatar, Image를 넣을 수 있습니다. 들어오는 요소에 따라 좌측 여백이 달라집니다. */
      "prefixIcon": {
        "paddingLeft": "var(--rui-dimension-x1_5)"
      },
      "prefixAvatar": {
        "size": "var(--rui-dimension-x6)"
      },
      "suffixIcon": {
        "paddingRight": "var(--rui-dimension-x1_5)"
      },
      "label": {
        "fontWeight": "var(--rui-font-weight-medium)",
        "paddingX": "var(--rui-dimension-x1_5)"
      },
      "icon": {
        "color": "var(--rui-color-fg-neutral)"
      }
    }
  },
  /**
   * 기본 스타일입니다.
   */
  "variantSolid": {
    "enabled": {
      "root": {
        "color": "var(--rui-color-bg-neutral-weak-alpha)"
      },
      "label": {
        "color": "var(--rui-color-fg-neutral)"
      },
      /** Icon, Avatar, Image를 넣을 수 있습니다. 들어오는 요소에 따라 좌측 여백이 달라집니다. */
      "prefixIcon": {
        "color": "var(--rui-color-fg-neutral)"
      },
      "suffixIcon": {
        "color": "var(--rui-color-fg-neutral)"
      },
      "icon": {
        "color": "var(--rui-color-fg-neutral)"
      }
    },
    "pressed": {
      "root": {
        "color": "var(--rui-color-bg-neutral-weak-alpha-pressed)"
      }
    },
    "disabled": {
      "root": {
        "opacity": "0.5"
      }
    },
    "selected": {
      "root": {
        "color": "var(--rui-color-bg-neutral-inverted)"
      },
      "label": {
        "color": "var(--rui-color-fg-neutral-inverted)"
      },
      /** Icon, Avatar, Image를 넣을 수 있습니다. 들어오는 요소에 따라 좌측 여백이 달라집니다. */
      "prefixIcon": {
        "color": "var(--rui-color-fg-neutral-inverted)"
      },
      "suffixIcon": {
        "color": "var(--rui-color-fg-neutral-inverted)"
      },
      "icon": {
        "color": "var(--rui-color-fg-neutral-inverted)"
      }
    },
    "selectedPressed": {
      "root": {
        "color": "var(--rui-color-bg-neutral-inverted-pressed)"
      }
    },
    "selectedDisabled": {
      "root": {
        "opacity": "0.5"
      }
    }
  },
  /**
   * 명확한 구분이 필요한 경우 사용합니다.
   */
  "variantOutlineStrong": {
    "enabled": {
      "root": {
        "color": "var(--rui-color-bg-transparent)",
        "strokeColor": "var(--rui-color-stroke-neutral-muted)",
        "strokeWidth": "1px"
      },
      "label": {
        "color": "var(--rui-color-fg-neutral)"
      },
      /** Icon, Avatar, Image를 넣을 수 있습니다. 들어오는 요소에 따라 좌측 여백이 달라집니다. */
      "prefixIcon": {
        "color": "var(--rui-color-fg-neutral)"
      },
      "suffixIcon": {
        "color": "var(--rui-color-fg-neutral)"
      },
      "icon": {
        "color": "var(--rui-color-fg-neutral)"
      }
    },
    "pressed": {
      "root": {
        "color": "var(--rui-color-bg-transparent-pressed)"
      }
    },
    "disabled": {
      "root": {
        "opacity": "0.5"
      }
    },
    "selected": {
      "root": {
        "color": "var(--rui-color-bg-neutral-inverted)"
      },
      "label": {
        "color": "var(--rui-color-fg-neutral-inverted)"
      },
      /** Icon, Avatar, Image를 넣을 수 있습니다. 들어오는 요소에 따라 좌측 여백이 달라집니다. */
      "prefixIcon": {
        "color": "var(--rui-color-fg-neutral-inverted)"
      },
      "suffixIcon": {
        "color": "var(--rui-color-fg-neutral-inverted)"
      },
      "icon": {
        "color": "var(--rui-color-fg-neutral-inverted)"
      }
    },
    "selectedPressed": {
      "root": {
        "color": "var(--rui-color-bg-neutral-inverted-pressed)"
      }
    },
    "selectedDisabled": {
      "root": {
        "opacity": "0.5"
      }
    }
  },
  /**
   * Selection 사용 시 주목도가 낮은 스타일로 권장됩니다.
   */
  "variantOutlineWeak": {
    "enabled": {
      "root": {
        "color": "var(--rui-color-bg-transparent)",
        "strokeColor": "var(--rui-color-stroke-neutral-muted)",
        "strokeWidth": "1px"
      },
      "label": {
        "color": "var(--rui-color-fg-neutral)"
      },
      /** Icon, Avatar, Image를 넣을 수 있습니다. 들어오는 요소에 따라 좌측 여백이 달라집니다. */
      "prefixIcon": {
        "color": "var(--rui-color-fg-neutral)"
      },
      "suffixIcon": {
        "color": "var(--rui-color-fg-neutral)"
      },
      "icon": {
        "color": "var(--rui-color-fg-neutral)"
      }
    },
    "pressed": {
      "root": {
        "color": "var(--rui-color-bg-transparent-pressed)"
      }
    },
    "disabled": {
      "root": {
        "opacity": "0.5"
      }
    },
    "selected": {
      "root": {
        "strokeColor": "var(--rui-color-stroke-neutral-contrast)",
        "color": "var(--rui-color-bg-neutral-weak)"
      }
    },
    "selectedPressed": {
      "root": {
        "color": "var(--rui-color-bg-neutral-weak-pressed)"
      }
    },
    "selectedDisabled": {
      "root": {
        "opacity": "0.5"
      }
    }
  },
  "sizeSmall": {
    "enabled": {
      "root": {
        "height": "32px",
        "paddingX": "var(--rui-dimension-x1_5)"
      },
      "label": {
        "fontSize": "var(--rui-font-size-t4)",
        "lineHeight": "var(--rui-line-height-t4)"
      },
      /** Icon, Avatar, Image를 넣을 수 있습니다. 들어오는 요소에 따라 좌측 여백이 달라집니다. */
      "prefixIcon": {
        "size": "var(--rui-dimension-x3_5)"
      },
      "suffixIcon": {
        "size": "var(--rui-dimension-x3_5)"
      },
      "prefixAvatar": {
        "size": "var(--rui-dimension-x5)"
      },
      "icon": {
        "size": "var(--rui-dimension-x3_5)"
      }
    }
  },
  "sizeMedium": {
    "enabled": {
      "root": {
        "height": "36px",
        "paddingX": "var(--rui-dimension-x2)"
      },
      "label": {
        "fontSize": "var(--rui-font-size-t4)",
        "lineHeight": "var(--rui-line-height-t4)"
      },
      /** Icon, Avatar, Image를 넣을 수 있습니다. 들어오는 요소에 따라 좌측 여백이 달라집니다. */
      "prefixIcon": {
        "size": "var(--rui-dimension-x4)"
      },
      "suffixIcon": {
        "size": "var(--rui-dimension-x3_5)"
      },
      "prefixAvatar": {
        "size": "var(--rui-dimension-x6)"
      },
      "icon": {
        "size": "var(--rui-dimension-x4)"
      }
    }
  },
  "sizeLarge": {
    "enabled": {
      "root": {
        "height": "40px",
        "paddingX": "var(--rui-dimension-x2_5)"
      },
      "label": {
        "fontSize": "var(--rui-font-size-t4)",
        "lineHeight": "var(--rui-line-height-t4)"
      },
      /** Icon, Avatar, Image를 넣을 수 있습니다. 들어오는 요소에 따라 좌측 여백이 달라집니다. */
      "prefixIcon": {
        "size": "var(--rui-dimension-x4)",
        "paddingLeft": "var(--rui-dimension-x1_5)"
      },
      "suffixIcon": {
        "size": "var(--rui-dimension-x4)"
      },
      "prefixAvatar": {
        "size": "var(--rui-dimension-x7)"
      },
      "icon": {
        "size": "var(--rui-dimension-x4)"
      }
    }
  },
  "layoutWithText": {},
  "sizeSmallLayoutIconOnly": {
    "enabled": {
      "root": {
        "minWidth": "var(--rui-dimension-x8)"
      }
    }
  },
  "sizeMediumLayoutIconOnly": {
    "enabled": {
      "root": {
        "minWidth": "var(--rui-dimension-x9)"
      }
    }
  },
  "sizeLargeLayoutIconOnly": {
    "enabled": {
      "root": {
        "minWidth": "var(--rui-dimension-x10)"
      }
    }
  }
}