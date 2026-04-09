# gatsby-plugin-rui

> gatsby에서 rui을 사용할 수 있어요. (다크모드, stylesheet 지원)

## Installation

```console
$ npm install gatsby-plugin-rui
$ yarn add gatsby-plugin-rui
```

## 사용법

1. gatsby-config 파일에 plugin을 추가해요.

```js
// gatsby-config 파일에 설정을 넣어줘야해요.
module.exports = {
  plugins: [
    // your plugins...,
    "gatsby-plugin-rui",
  ],
};

// 혹은
module.exports = {
  plugins: [
    // your plugins...,
    {
      resolve: "gatsby-plugin-rui",
      options: {
        mode: "light-only", // "auto" (default) | "dark-only" | "light-only"
      },
    },
  ],
};
```

2. 직접 stylesheet를 활용하거나, `@rui/design-token` 을 활용해 값을 넣어요.

```js
// css-in-js example

export const wrapper = style({
  color: var(--rui-scale-color-gray-00)
})
```

// 혹은

```console
yarn add -D @rui/design-token
```

```js
// css-in-js example
import { vars } from "@rui/design-token";

export const wrapper = style({
  color: vars.$scale.color.gray00,
});
```
