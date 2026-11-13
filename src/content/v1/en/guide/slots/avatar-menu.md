---
title: "avatarMenu"
description: "Entries of the plugin in the avatar's menu, such as _Switch household_."
intro: "Entries the plugin adds to the avatar's menu, the menu of the open profile. They are for a quick action, reachable from any page."
order: 14
icon: "circle-user-round"
topic: "world"
key: "avatarMenu"
---

## Where in Hodi

On a computer, the avatar's menu opens from the avatar, at the bottom of the sidebar. On a phone or a tablet, this menu's entries sit at the bottom of the profile's sheet. The plugin's `avatarMenu` entries join Hodi's entries.

## Example

`avatarMenu` is a list of entries, not a component: Hodi draws each entry itself.

```tsx title="web/index.tsx"
import { definePlugin } from 'hodi:sdk'
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

## An entry's fields

<!-- prettier-ignore -->
| Field | Type | |
| --- | --- | --- |
| `id` | `string` | The entry's technical name, once per plugin. |
| `label` | `string` | The entry's text, a key of the plugin's `locales`. |
| `icon?` | `ComponentType` | A Lucide icon, at 16 px. Without an icon, Hodi shows a puzzle piece. |
| `onClick` | `() => void` | What a click on the entry does. |
