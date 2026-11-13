---
title: "Slots"
description: "The places in Hodi where a plugin can show something, and how to declare them with `definePlugin()`."
intro: "A plugin doesn't show things just anywhere: it fills slots, precise places in Hodi made for plugins. Each card below leads to the page of one slot: where it is, a code example and what it receives."
order: 3
icon: "layout-grid"
cards: "children"
---

## The principle

Hodi keeps control of its own screens. A plugin can't change a page of Hodi, nor add a button wherever it likes. Instead, Hodi provides **slots**: an entry in Settings, a card on the server's dashboard, a button under an article…

For each slot, the plugin gives a React component. Hodi shows it in the right place, at the right time, and only to the right people.

## Declaring them

The web part calls `definePlugin()` once, in `web/index.tsx`. It passes it an object: each key is a slot, and its value is what the plugin shows there.

```tsx title="web/index.tsx"
import { definePlugin } from 'hodi:sdk'

definePlugin({
  settingsPage: HelloCard,
  readerAction: ReportButton
})
```

Here, the plugin fills two slots:

- `settingsPage`: the `HelloCard` card, on its page in _Server › Plugins_;
- `readerAction`: the `ReportButton` button, under each open article.

A slot the plugin doesn't fill stays empty. If a plugin's component crashes, Hodi removes it, and the rest of the page keeps working.

## Two small slots

These two slots have no page of their own.

### `accountRows`

Rows at the end of the "Account" card, in _Settings › Account and data_. The component returns `SettingRow`s.

```tsx title="web/index.tsx"
const GoogleRow = () => <SettingRow label="Google" value="anna@gmail.com" />

definePlugin({ accountRows: GoogleRow })
```

### `avatarMenu`

Entries in the avatar's menu: in the sidebar on a computer, at the bottom of the profile's sheet on a phone or a tablet. Each entry has an `id`, a label (a key of its `locales`), a Lucide icon and an action.

```tsx title="web/index.tsx"
import { House } from 'lucide-react'

definePlugin({
  avatarMenu: [
    {
      id: 'switch',
      label: 'menu.switch',
      icon: House,
      onClick: () => openSwitcher()
    }
  ]
})
```
