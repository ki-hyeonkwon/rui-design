# @rideds/react

RUI Design의 스타일드 React 컴포넌트 패키지입니다.

## Install

```bash
bun add @rideds/react @rideds/css
```

## Usage

```tsx
import "@rideds/css/all.css";
import { ActionButton } from "@rideds/react";

export function App() {
  return <ActionButton>RUI</ActionButton>;
}
```

`@rideds/react`는 스타일 출력을 위해 `@rideds/css`가 함께 필요합니다.

## Package Relations

This package integrates the following packages to provide full-featured React components.

- [@rideds/css](../css)
- [@rideds/react-headless](../react-headless)
