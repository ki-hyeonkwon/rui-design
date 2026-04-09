import type { Registry } from "./schema";

export const registryUI: Registry = {
  id: "ui",
  items: [
    {
      id: "app-screen",
      snippets: [
        {
          path: "app-screen.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
        {
          path: "app-bar.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "error-state",
      deprecated: true,
      snippets: [
        {
          path: "error-state.tsx",
          dependencies: { "@rideds/react": "~1.1.0", "@rideds/css": "~1.1.0" },
        },
      ],
    },
    {
      id: "field-button",
      snippets: [
        {
          path: "field-button.tsx",
          dependencies: { "@rideds/react": "~1.1.0", "@rideds/css": "~1.1.0" },
        },
      ],
    },
    {
      id: "manner-temp",
      snippets: [
        {
          path: "manner-temp.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "manner-temp-badge",
      snippets: [
        {
          path: "manner-temp-badge.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "alert-dialog",
      snippets: [
        {
          path: "alert-dialog.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "bottom-sheet",
      snippets: [
        {
          path: "bottom-sheet.tsx",
          dependencies: { "@rideds/react": "~1.1.0", "@rideds/css": "~1.1.0" },
        },
      ],
    },
    {
      id: "action-sheet",
      snippets: [
        {
          path: "action-sheet.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
      deprecated: true,
    },
    {
      id: "extended-action-sheet",
      snippets: [
        {
          path: "extended-action-sheet.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
      deprecated: true,
    },
    {
      id: "avatar",
      snippets: [
        {
          path: "avatar.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "pull-to-refresh",
      snippets: [
        {
          path: "pull-to-refresh.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "loading-indicator",
      snippets: [
        {
          path: "loading-indicator.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "action-button",
      snippets: [
        {
          path: "action-button.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "toggle-button",
      snippets: [
        {
          path: "toggle-button.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "reaction-button",
      snippets: [
        {
          path: "reaction-button.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "callout",
      snippets: [
        {
          path: "callout.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "control-chip",
      snippets: [
        {
          path: "control-chip.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
      deprecated: true,
    },
    {
      id: "chip",
      snippets: [
        {
          path: "chip.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "checkbox",
      snippets: [
        {
          path: "checkbox.tsx",
          dependencies: { "@rideds/react": "~1.2.0", "@rideds/css": "~1.2.0" },
        },
      ],
    },
    {
      id: "content-placeholder",
      snippets: [
        {
          path: "content-placeholder.tsx",
          dependencies: { "@rideds/react": "~1.3.0", "@rideds/css": "~1.3.0" },
        },
      ],
    },
    {
      id: "identity-placeholder",
      snippets: [
        {
          path: "identity-placeholder.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "inline-banner",
      snippets: [
        {
          path: "inline-banner.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
      deprecated: true,
    },
    {
      id: "menu-sheet",
      snippets: [
        {
          path: "menu-sheet.tsx",
          dependencies: { "@rideds/react": "~1.2.0", "@rideds/css": "~1.2.0" },
        },
      ],
    },
    {
      id: "slider",
      snippets: [
        {
          path: "slider.tsx",
          dependencies: { "@rideds/react": "~1.1.0", "@rideds/css": "~1.1.0" },
        },
      ],
    },
    {
      id: "snackbar",
      snippets: [
        {
          path: "snackbar.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "help-bubble",
      snippets: [
        {
          path: "help-bubble.tsx",
          dependencies: { "@rideds/react": "~1.2.0", "@rideds/css": "~1.2.0" },
        },
      ],
    },
    {
      id: "tabs",
      snippets: [
        {
          path: "tabs.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "chip-tabs",
      snippets: [
        {
          path: "chip-tabs.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "tag-group",
      snippets: [
        {
          path: "tag-group.tsx",
          dependencies: { "@rideds/react": "~1.2.0", "@rideds/css": "~1.2.0" },
        },
      ],
    },
    {
      id: "page-banner",
      snippets: [
        {
          path: "page-banner.tsx",
          dependencies: { "@rideds/react": "~1.1.0", "@rideds/css": "~1.1.0" },
        },
      ],
    },
    {
      id: "progress-circle",
      snippets: [
        {
          path: "progress-circle.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "radio-group",
      snippets: [
        {
          path: "radio-group.tsx",
          dependencies: { "@rideds/react": "~1.2.0", "@rideds/css": "~1.2.0" },
        },
      ],
    },
    {
      id: "select-box",
      snippets: [
        {
          path: "select-box.tsx",
          dependencies: { "@rideds/react": "~1.2.0", "@rideds/css": "~1.2.0" },
        },
      ],
    },
    {
      id: "segmented-control",
      snippets: [
        {
          path: "segmented-control.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "switch",
      snippets: [
        {
          path: "switch.tsx",
          dependencies: { "@rideds/react": "~1.2.0", "@rideds/css": "~1.2.0" },
        },
      ],
    },
    {
      id: "text-field",
      snippets: [
        {
          path: "text-field.tsx",
          dependencies: { "@rideds/react": "~1.1.0", "@rideds/css": "~1.1.0" },
        },
      ],
    },
    {
      id: "contextual-floating-button",
      snippets: [
        {
          path: "contextual-floating-button.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "floating-action-button",
      snippets: [
        {
          path: "floating-action-button.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "list",
      snippets: [
        {
          path: "list.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
        {
          path: "list-header.tsx",
          dependencies: { "@rideds/react": "~1.0.0", "@rideds/css": "~1.0.0" },
        },
      ],
    },
    {
      id: "result-section",
      snippets: [
        {
          path: "result-section.tsx",
          dependencies: { "@rideds/react": "~1.1.0", "@rideds/css": "~1.1.0" },
        },
      ],
    },
  ],
};
