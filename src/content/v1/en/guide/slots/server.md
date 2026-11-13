---
title: "serverSections"
description: "A group of sections in the Server space, for what only the server admin should see and manage."
intro: "A group of sections in the Server space, under the plugin's name. It is for what only the server admin should see and manage: a list of accounts, pending sign-ups, statistics…"
order: 3
icon: "server"
topic: "science"
key: "serverSections"
---

## Where in Hodi

The Server space has its own sidebar, with Hodi's groups: General, Plugins… The plugin adds a group named after the plugin to this sidebar, under Hodi's groups. Each section of this group is an entry of the sidebar, which opens the section's page.

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

## A section's fields

`serverSections` is a list. Each section of the list has these fields:

<!-- prettier-ignore -->
| Field | Type | |
| --- | --- | --- |
| `id` | `string` | The section's name in the address: lowercase, digits and dashes, once per plugin. |
| `label` | `string` | The section's name in the sidebar, a key of the `locales`, such as `server.said`. |
| `page` | `ComponentType<{ layout }>` | The section's page, drawn with `SectionPage`. |
| `icon?` | `ComponentType` | A Lucide icon. Without an icon, Hodi shows a puzzle piece. |
| `hint?` | `ComponentType` | The line under the section's name, on a phone, such as _12 people_. |

## Good to know

- **Who sees the sections**: the server admin only.
- **The sections' routes**: the `serverRoutes`, called with `usePluginServerApi()`.
- **An invalid section**: without a valid `id`, or with an `id` already taken, Hodi doesn't show it.

The `serverRoutes` refuse anyone other than the server admin.
