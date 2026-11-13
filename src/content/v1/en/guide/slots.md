---
title: "Slots"
description: "A plugin shows up in the places it declares in `definePlugin()`, with Hodi's components, and touches no other."
intro: "A plugin shows up in the places it declares in `definePlugin()`, with Hodi's components, and touches no other. Each card leads to its page: where it shows, a code example and what to know before you use it."
order: 3
icon: "layout-grid"
cards: "children"
---

## Declaring your slots

The web part calls `definePlugin()` once, with what it draws in each place. A slot it doesn't fill stays Hodi's.

```tsx title="web/index.tsx"
import { definePlugin } from 'hodi:sdk'

definePlugin({
  settingsPage: HelloCard,
  serverSections: [
    {
      id: 'said',
      label: 'server.said',
      page: SaidPage
    }
  ]
})
```

## Two small slots

- `accountRows`: rows at the end of "Your account", in _Settings › Account and data_.
- `avatarMenu`: items in the avatar's menu, with a label, an icon and a click.
