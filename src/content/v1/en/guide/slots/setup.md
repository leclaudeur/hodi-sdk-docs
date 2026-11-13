---
title: "Setup"
description: "Its steps in Hodi's setup, for what your plugin must know from the very first start."
intro: "Steps in Hodi's setup, between \"Plugins found\" and \"The server is ready\": for what your plugin must know from the start."
order: 8
icon: "list-checks"
topic: "travel"
key: "setupSteps"
---

## Example

```tsx title="web/index.tsx"
const Welcome = ({ next }) => (
  <>
    <TextField label="Site name" … />
    <SetupActions onNext={next} />
  </>
)

definePlugin({
  setupSteps: [
    {
      id: 'welcome',
      title: 'setup.title',
      intro: 'setup.intro',
      page: Welcome
    }
  ]
})
```

## Good to know

- **Who sees them**: only a plugin turned on at the "Plugins found" step.
- **What Hodi draws**: the card, the title, the line under the title, the numbering and "Back".
- **What you draw**: the middle, down to `SetupActions`, then `next()`.
- **One of Hodi's steps**: `core: 'mail'` puts the form of Server › E-mail there.
