---
title: "Overview"
description: "A card on the server's dashboard, with a number or a chart from your plugin over the period."
intro: "A card on the server's dashboard, after \"Online\" and \"Profiles\": a number or a chart from your plugin over the chosen period."
order: 4
icon: "layout-dashboard"
topic: "ai"
key: "overviewCards"
---

## Example

```tsx title="web/index.tsx"
const SaidCard = ({ from, to }) => (
  <OverviewCard title="Hellos" count={12}>
    …
  </OverviewCard>
)

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

## Its size

- `narrow`: a third of a computer's width, half of a tablet's;
- `wide`: two thirds of a computer's, half of a tablet's;
- `full`: the whole width.

On a phone, every card takes the whole width.

## Good to know

- **What it receives**: `from` and `to`, the period shown, both days included, as `YYYY-MM-DD`.
- **How it looks**: `OverviewCard`, with its title, a number and a chip.
- **If it crashes**: Hodi says so in its place, and the rest of the dashboard carries on.
