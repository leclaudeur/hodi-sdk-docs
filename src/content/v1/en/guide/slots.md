---
title: "Slots"
description: "The places in Hodi where a plugin can show something, and how to declare them with `definePlugin()`."
intro: "A plugin doesn't show things just anywhere: it fills slots, precise places in Hodi made for plugins. Each card below bears the name of a slot, as it is written in the code, and leads to its page: where the slot is in Hodi, an example and what Hodi gives the component."
order: 3
icon: "layout-grid"
cards: "children"
---

## What a slot is

Hodi keeps control of its own screens. A plugin can't change a page of Hodi, nor add a button wherever it likes. Instead, Hodi provides **slots**: an entry in Settings, a card on the server's dashboard, a button under an article…

For each slot, the plugin gives a React component. Hodi shows this component in the right place, at the right time, and only to the right people.

## Declaring the slots with `definePlugin()`

The web part calls `definePlugin()` once, in `web/index.tsx`. `definePlugin()` receives an object: each key of this object is the name of a slot, and the key's value is what the plugin shows in this slot.

```tsx title="web/index.tsx"
import { definePlugin } from 'hodi:sdk'

definePlugin({
  settingsPage: HelloCard,
  readerAction: ReportButton
})
```

In this example, the plugin fills two slots:

- `settingsPage`: the `HelloCard` card, on the plugin's page in _Server › Plugins_;
- `readerAction`: the `ReportButton` button, under each open article.

A slot the plugin doesn't give stays empty. If a plugin's component crashes, Hodi removes this component, and the rest of the page keeps working.
