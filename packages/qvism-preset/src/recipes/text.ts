import { typography as vars } from "../vars/component";

import { defineRecipe } from "../utils/define";

const uncapitalize = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);

type OmitPrefix<T> = T extends `textStyle${infer U}` ? U : never;

const text = defineRecipe({
  name: "text",
  base: {
    margin: 0,

    color: "var(--rui-text-color)",
    fontSize: "var(--rui-font-size)",
    fontWeight: "var(--rui-font-weight)",
    lineHeight: "var(--rui-line-height)",
    textAlign: "var(--rui-text-align)",
    userSelect: "var(--rui-user-select)",

    "--rui-text-color": "inherit",
    "--rui-font-size": "inherit",
    "--rui-font-weight": "inherit",
    "--rui-line-height": "inherit",
    "--rui-text-align": "inherit",
    "--rui-user-select": "inherit",
    "--rui-white-space": "inherit",

    "--rui-max-lines": "initial",
  },
  variants: {
    textStyle: Object.fromEntries(
      Object.entries(vars).map(([key, value]) => [
        uncapitalize(key.split("textStyle")[1]),
        {
          "--rui-font-size": value.enabled.root.fontSize,
          "--rui-line-height": value.enabled.root.lineHeight,
          "--rui-font-weight": value.enabled.root.fontWeight,
        },
      ]),
    ) as Record<Uncapitalize<OmitPrefix<keyof typeof vars>>, any>,
    maxLines: {
      none: {
        overflow: "unset",
        minWidth: "unset",
        textOverflow: "unset",
        whiteSpace: "var(--rui-white-space)",
        WebkitLineClamp: "unset",
      },
      single: {
        display: "block",
        overflow: "hidden",
        minWidth: 0,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        WebkitLineClamp: "var(--rui-max-lines)",
      },
      multi: {
        display: "-webkit-box",
        overflow: "hidden",
        minWidth: 0,
        textOverflow: "ellipsis",
        whiteSpace: "initial",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: "var(--rui-max-lines)",
      },
    },
    textDecorationLine: {
      none: {
        textDecorationLine: "none",
      },
      // NOTE: We keep kebab-case for textDecorationLine because it's a CSS property.
      "line-through": {
        textDecorationLine: "line-through",
      },
      underline: {
        textDecorationLine: "underline",

        // might want to customize text decoration styles or underline offset later
      },
    },
  },
  defaultVariants: {
    textStyle: "t5Regular",
    maxLines: "none",
    textDecorationLine: "none",
  },
});

export default text;
