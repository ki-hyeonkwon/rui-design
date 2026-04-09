import type { StackflowReactPlugin } from "@stackflow/react";
import { AppScreenPropsProvider } from "./components";
import { GlobalInteraction } from "./primitive";

export interface RuiPluginOptions {
  theme: "android" | "cupertino";
}

export const ruiPlugin =
  (
    options:
      | RuiPluginOptions
      // biome-ignore lint/suspicious/noExplicitAny: matches upstream @stackflow/react's `initialContext: any`
      | ((args: { initialContext?: any }) => RuiPluginOptions),
  ): StackflowReactPlugin =>
  () => ({
    key: "rui",
    wrapStack({ stack, initialContext }) {
      const resolved = typeof options === "function" ? options({ initialContext }) : options;

      return (
        <AppScreenPropsProvider value={resolved}>
          <GlobalInteraction>{stack.render()}</GlobalInteraction>
        </AppScreenPropsProvider>
      );
    },
  });
