import type { AppScreenProps } from "rui/ui/app-screen";

export const theme: NonNullable<AppScreenProps["theme"]> = /iphone|ipad|ipod/i.test(
  window.navigator.userAgent.toLowerCase(),
)
  ? "cupertino"
  : "android";
