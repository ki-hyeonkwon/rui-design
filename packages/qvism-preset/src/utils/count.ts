export interface CountProps {
  fontSize?: string;
  lineHeight?: string | number;
  fontWeight?: string;
  color?: string;
}

export function count(props: CountProps) {
  const result: Record<`--${string}`, string | number> = {};

  if (props.fontSize) {
    result["--rui-count-font-size"] = props.fontSize;
  }

  if (props.lineHeight) {
    result["--rui-count-line-height"] = props.lineHeight;
  }

  if (props.fontWeight) {
    result["--rui-count-font-weight"] = props.fontWeight;
  }

  if (props.color) {
    result["--rui-count-color"] = props.color;
  }

  return result;
}
