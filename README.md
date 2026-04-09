![cover](./cover.png)

## External Install

Phase 1 public packages are validated for external consumers with:

- `@rui/react`
- `@rui/css`
- `@rui/stackflow`
- `@rui/cli`
- `@rui/tailwind4-theme`

### React UI

```bash
bun add @rui/react @rui/css
```

```tsx
import "@rui/css/all.css";
import { ActionButton } from "@rui/react";

export function App() {
  return <ActionButton>RUI</ActionButton>;
}
```

### Stackflow Integration

```bash
bun add @rui/stackflow @rui/css @stackflow/core @stackflow/react
```

```ts
import "@rui/css/all.css";
import { ruiPlugin } from "@rui/stackflow";

const plugin = ruiPlugin({ theme: "android" });

void plugin;
```

### CLI

```bash
bunx @rui/cli@latest --help
```

### Tailwind CSS 4

```bash
bun add @rui/css @rui/tailwind4-theme tailwindcss@^4
```

```css
@import "tailwindcss";
@import "@rui/tailwind4-theme";
```

## Maintainers

Re-run the Phase 1 package gate locally with:

```bash
bun phase1:validate
```

**Definitions**

- [@rui/rootage](./packages/rootage)
- [@rui/qvism-preset](./packages/qvism-preset)

**Base Libraries**

- [@rui/css](./packages/css)

**React Libraries**

- [@rui/react-headless](./packages/react-headless)
- [@rui/react](./packages/react)
- [@rui/stackflow](./packages/stackflow)

**Integrations**

- [@rui/figma](./packages/figma)
- [@rui/mcp](./packages/mcp)

**Ecosystem**

- [@rui/ecosystem/rootage](./ecosystem/rootage)
- [@rui/ecosystem/qvism](./ecosystem/qvism)
- [@rui/ecosystem/figma-extractor](./ecosystem/figma-extractor)

**Documentation**

- [@rui/docs](./docs)
