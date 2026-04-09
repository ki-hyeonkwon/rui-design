# @rui/react

RUI Design의 스타일드 React 컴포넌트 패키지입니다.

## Install

```bash
bun add @rui/react @rui/css
```

## Usage

```tsx
import "@rui/css/all.css";
import { ActionButton } from "@rui/react";

export function App() {
  return <ActionButton>RUI</ActionButton>;
}
```

`@rui/react`는 스타일 출력을 위해 `@rui/css`가 함께 필요합니다.

## Package Relations

This package integrates the following packages to provide full-featured React components.

- [@rui/css](../css)
- [@rui/react-headless](../react-headless)
