# @rideds/stackflow

RUI Design 컴포넌트를 Stackflow 환경에서 사용할 때 필요한 React UI 패키지입니다.

## Install

```bash
bun add @rideds/stackflow @rideds/css @stackflow/core @stackflow/react
```

## Usage

```ts
import "@rideds/css/all.css";
import { ruiPlugin } from "@rideds/stackflow";

const plugin = ruiPlugin({ theme: "android" });

void plugin;
```

`theme`은 `"android"` 또는 `"cupertino"`를 사용합니다.
