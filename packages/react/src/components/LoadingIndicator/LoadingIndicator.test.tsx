import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { LoadingIndicator } from "./LoadingIndicator";
import { PendingButtonProvider } from "./usePendingButton";

describe("LoadingIndicator", () => {
  it("renders the rui loading indicator class", () => {
    const { container } = render(
      <PendingButtonProvider value={{ loading: true, disabled: false, stateProps: { "data-loading": "" } }}>
        <LoadingIndicator indicator={<svg data-testid="spinner" />}>Action Button</LoadingIndicator>
      </PendingButtonProvider>,
    );

    const loadingIndicator = container.querySelector(".rui-loading-indicator");

    expect(loadingIndicator).not.toBeNull();
    expect(loadingIndicator).toHaveAttribute("data-loading", "");
  });

  it("keeps the hidden placeholder span for button width preservation", () => {
    const { container } = render(
      <PendingButtonProvider value={{ loading: true, disabled: false, stateProps: { "data-loading": "" } }}>
        <LoadingIndicator indicator={<svg data-testid="spinner" />}>
          <span data-testid="label">Action Button</span>
        </LoadingIndicator>
      </PendingButtonProvider>,
    );

    const loadingIndicator = container.querySelector(".rui-loading-indicator");
    const placeholder = Array.from(container.querySelectorAll("span")).find(
      (element) => element !== loadingIndicator && element.style.opacity === "0",
    );

    expect(placeholder).not.toBeUndefined();
    expect(placeholder?.style.opacity).toBe("0");
    expect(placeholder?.style.display).toBe("inherit");
  });
});
