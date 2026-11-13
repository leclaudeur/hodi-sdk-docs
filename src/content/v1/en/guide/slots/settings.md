---
title: "Settings"
description: "Its own entry and page in Settings, for what each profile sets or looks up for itself."
intro: "An entry in Settings for your plugin alone, with its own page: for what each profile of the household sets or looks up for itself."
order: 2
icon: "settings"
topic: "world"
key: "page"
---

## Where it shows

`menu`, in `plugin.json`, says which group of Settings the entry goes in, and after which one. Without a known group, it goes at the end of the Household group.

```json title="plugin.json"
"menu": {
  "group": "you",
  "after": "stats"
}
```

The six groups of Settings are Reading, Subjects, You, Household, This device and Hodi. In `plugin.json`, they are called `reading`, `subjects`, `you`, `household`, `device` and `about`.

## Example

```tsx title="web/index.tsx"
import { SectionPage, SettingsCard, definePlugin } from 'hodi:sdk'

const NotesPage = ({ layout }) => (
  <SectionPage title="My notes" layout={layout}>
    <SettingsCard>…</SettingsCard>
  </SectionPage>
)

definePlugin({
  page: NotesPage,
  menuIcon: NotebookPen
})
```

## Good to know

- **What it receives**: `layout`, `desktop` or `phone`, to pass to `SectionPage`.
- **Its icon**: `menuIcon`, an 18 px Lucide icon; without one, a puzzle piece.
- **Its line**: `menuHint`, under its name, such as "12 articles reported".
- **Who sees it**: the profiles in `audience`, like its routes.
