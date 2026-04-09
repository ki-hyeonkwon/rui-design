import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Icon, PrefixIcon, SuffixIcon } from "./Icon";

describe("Icon", () => {
  it("applies the rui icon class and inline variables", () => {
    const { getByTestId } = render(
      <Icon svg={<svg data-testid="icon" />} size="x4" color="fg.neutral" />,
    );

    const icon = getByTestId("icon");

    expect(icon).toHaveClass("rui-icon");
    expect(icon.style.getPropertyValue("--rui-icon-size")).toBe("var(--rui-dimension-x4)");
    expect(icon.style.getPropertyValue("--rui-icon-color")).toBe("var(--rui-color-fg-neutral)");
  });

  it("applies the rui prefix icon class", () => {
    const { getByTestId } = render(
      <PrefixIcon svg={<svg data-testid="prefix-icon" />} />,
    );

    expect(getByTestId("prefix-icon")).toHaveClass("rui-prefix-icon");
  });

  it("applies the rui suffix icon class", () => {
    const { getByTestId } = render(
      <SuffixIcon svg={<svg data-testid="suffix-icon" />} />,
    );

    expect(getByTestId("suffix-icon")).toHaveClass("rui-suffix-icon");
  });
});
