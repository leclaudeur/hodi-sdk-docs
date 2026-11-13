---
title: "Overview"
description: "A card of the plugin on the server's dashboard, with a number or a chart over the chosen period."
intro: "A card of the plugin in _Server › Overview_, the server's dashboard. It shows a number or a chart of the plugin over the period the admin chose."
order: 4
icon: "layout-dashboard"
topic: "ai"
key: "overviewCards"
---

## Where it shows

Overview shows cards, over a period the admin picks at the top of the page (7 days, 30 days…). The plugins' cards come after "Online now" and "Profiles", in the plugins' order.

## Example

```tsx title="web/index.tsx"
import { OverviewCard, definePlugin, usePluginServerApi } from 'hodi:sdk'

const SaidCard = ({ from, to }) => {
  const count = useSaidCount(from, to)
  return <OverviewCard title="Hellos" count={count} />
}

definePlugin({
  overviewCards: [
    {
      id: 'said',
      size: 'narrow',
      component: SaidCard
    }
  ]
})
```

## A card

<!-- prettier-ignore -->
| Field | Type | |
| --- | --- | --- |
| `id` | `string` | Lowercase letters, digits and dashes, once per plugin. |
| `size` | `'narrow' \| 'wide' \| 'full'` | Its width, see below. |
| `component` | `ComponentType<{ from, to }>` | What it shows, drawn with `OverviewCard`. |

## What it receives

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `from` | `string` | The first day of the period, included, as `YYYY-MM-DD`. |
| `to` | `string` | The last day of the period, included, in the same format. |

## Its width

<!-- prettier-ignore -->
| `size` | Computer | Tablet | Phone |
| --- | --- | --- | --- |
| `narrow` | One third | Half | Full width |
| `wide` | Two thirds | Half | Full width |
| `full` | Full width | Full width | Full width |

## Good to know

- **Who sees it**: the server admin only.
- **Its data**: the card asks a `serverRoute` for it, with `from` and `to`.
- **If it crashes**: Hodi shows a message in its place, and the rest of the dashboard keeps working.
