import type { Property } from "csstype";

export interface IconProps {
  size?: string;
  color?: string;

  marginLeft?: Property.MarginLeft;
  marginRight?: Property.MarginRight;
  marginTop?: Property.MarginTop;
  marginBottom?: Property.MarginBottom;

  alignSelf?: Property.AlignSelf;
  justifySelf?: Property.JustifySelf;
}

export function prefixIcon(props: IconProps) {
  const result: Record<`--${string}`, string> = {};

  if (props.size) {
    result["--rui-prefix-icon-size"] = props.size;
  }

  if (props.color) {
    result["--rui-prefix-icon-color"] = props.color;
  }

  if (props.marginLeft) {
    result["--rui-prefix-icon-margin-left"] = props.marginLeft;
  }

  if (props.marginRight) {
    result["--rui-prefix-icon-margin-right"] = props.marginRight;
  }

  if (props.marginTop) {
    result["--rui-prefix-icon-margin-top"] = props.marginTop;
  }

  if (props.marginBottom) {
    result["--rui-prefix-icon-margin-bottom"] = props.marginBottom;
  }

  if (props.alignSelf) {
    result["--rui-prefix-icon-align-self"] = props.alignSelf;
  }

  if (props.justifySelf) {
    result["--rui-prefix-icon-justify-self"] = props.justifySelf;
  }

  return result;
}

export function suffixIcon(props: IconProps) {
  const result: Record<`--${string}`, string> = {};

  if (props.size) {
    result["--rui-suffix-icon-size"] = props.size;
  }

  if (props.color) {
    result["--rui-suffix-icon-color"] = props.color;
  }

  if (props.marginLeft) {
    result["--rui-suffix-icon-margin-left"] = props.marginLeft;
  }

  if (props.marginRight) {
    result["--rui-suffix-icon-margin-right"] = props.marginRight;
  }

  if (props.marginTop) {
    result["--rui-suffix-icon-margin-top"] = props.marginTop;
  }

  if (props.marginBottom) {
    result["--rui-suffix-icon-margin-bottom"] = props.marginBottom;
  }

  if (props.alignSelf) {
    result["--rui-suffix-icon-align-self"] = props.alignSelf;
  }

  if (props.justifySelf) {
    result["--rui-suffix-icon-justify-self"] = props.justifySelf;
  }

  return result;
}

export function onlyIcon(props: Pick<IconProps, "size" | "color">) {
  const result: Record<`--${string}`, string> = {};

  if (props.size) {
    result["--rui-icon-size"] = props.size;
  }

  if (props.color) {
    result["--rui-icon-color"] = props.color;
  }

  return result;

  // return {
  //   ...result,

  //   "@supports (selector(:where(div)))": {
  //     "& :where(svg)": {
  //       display: "inline-flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       flexShrink: 0,
  //       width: props.size,
  //       height: props.size,
  //       color: props.color,
  //     },
  //   },
  //   "@supports not (selector(:where(div)))": {
  //     "& svg": {
  //       display: "inline-flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       flexShrink: 0,
  //       width: props.size,
  //       height: props.size,
  //       color: props.color,
  //     },
  //   },
  // };
}
