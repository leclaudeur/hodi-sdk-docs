---
title: "Server"
description: "A group of sections in the Server space, for what only the server admin should see and manage."
intro: "A group of sections in the Server space, under the plugin's name. It is for what only the server admin should see and manage: a list of accounts, pending sign-ups, statistics…"
order: 3
icon: "server"
topic: "science"
key: "serverSections"
---

## Where they show

The Server space has its own sidebar, with Hodi's groups (General, Plugins…). The plugin adds a group under its name there, below Hodi's. Each section of that group is an entry of the sidebar, which opens its page.

Each section has its own address: `#/server/plugin/<plugin id>/<section id>`.

## Example

```tsx title="web/index.tsx"
import { SectionPage, definePlugin } from 'hodi:sdk'
import { Hand } from 'lucide-react'

const SaidPage = ({ layout }) => (
  <SectionPage title="Hellos" layout={layout}>
    …
  </SectionPage>
)

definePlugin({
  serverSections: [
    {
      id: 'said',
      label: 'server.said',
      icon: Hand,
      page: SaidPage
    }
  ]
})
```

## A section

<!-- prettier-ignore -->
| Field | Type | |
| --- | --- | --- |
| `id` | `string` | Its name in the address: lowercase letters, digits and dashes, once per plugin. |
| `label` | `string` | A key of its `locales`, such as `server.said`: its name in the sidebar. |
| `page` | `ComponentType<{ layout }>` | Its page, drawn with `SectionPage`. |
| `icon?` | `ComponentType` | A Lucide icon. A puzzle piece without it. |
| `hint?` | `ComponentType` | The line under its name, on a phone, such as "12 people". |

## Good to know

- **Who sees them**: the server admin only.
- **Its routes**: a section calls the plugin's `serverRoutes`, with `usePluginServerApi()`. These routes refuse anyone but the server admin.
- **An invalid section**: a section without a valid `id`, or with an `id` already taken, isn't shown.
