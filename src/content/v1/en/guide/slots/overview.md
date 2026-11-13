---
title: "overviewCards"
description: "A card of the plugin on the server's dashboard, with a number or a chart over the chosen period."
intro: "A card of the plugin in _Server › Overview_, the server's dashboard. It shows a number or a chart of the plugin over the period the admin chose."
order: 4
icon: "layout-dashboard"
topic: "ai"
key: "overviewCards"
---

## Where `overviewCards` shows

_Server › Overview_ is the server's dashboard. At the top of this page, the server admin picks a period: 7 days, 30 days… Each card of the page shows a number or a chart over this period. The plugins' cards come after Hodi's "Online" and "Profiles" cards, in the order of the plugins.

## A "Hellos" card

This card shows how many hellos the plugin said during the chosen period:

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

## The fields of a card of `overviewCards`

`overviewCards` is a list. Each card of the list has three fields:

<!-- prettier-ignore -->
| Field | Type | |
| --- | --- | --- |
| `id` | `string` | Lowercase letters, digits and dashes, once per plugin. |
| `size` | `'narrow' \| 'wide' \| 'full'` | The card's width, see below. |
| `component` | `ComponentType<{ from, to }>` | The card's content, drawn with `OverviewCard`. |

## What Hodi gives the card's component

Hodi gives the component the period the admin picked:

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `from` | `string` | The first day of the period, included, as `YYYY-MM-DD`. |
| `to` | `string` | The last day of the period, included, in the same format. |

## A card's width: `size`

<!-- prettier-ignore -->
| Value of `size` | The card's width |
| --- | --- |
| `narrow` | A third of the width on a computer, half on a tablet, the whole width on a phone. |
| `wide` | Two thirds of the width on a computer, half on a tablet, the whole width on a phone. |
| `full` | The whole width, on a computer, a tablet and a phone. |

## Good to know about `overviewCards`

- **Who sees the cards**: the server admin only.
- **A card's data**: a `serverRoute`, called with `from` and `to`.
- **If a card crashes**: Hodi shows a message in place of this card.
