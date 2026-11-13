---
title: "Components"
description: "The web part imports Hodi's components from `hodi:sdk`: the app's own, with their sizes, their colours and their three themes."
intro: "The web part imports Hodi's components from `hodi:sdk`. They are the app's own, with their sizes, their colours and their three themes: the plugin looks like it belongs to Hodi."
order: 1
icon: "component"
cards: "components"
---

```tsx title="web/index.tsx"
import { Button, SettingRow, SettingsCard } from 'hodi:sdk'
```

Each page shows the component's real render, the code that draws it, then all its props. Icons come from `lucide-react`, which the plugin adds to its own dependencies.

## The rules

- **No inline styles**: Hodi's page refuses inline styles. The plugin's CSS goes in a file, with classes prefixed by its id.
- **Hodi's colours**: the [tokens](/en/tokens/), never a hard-coded colour.
- **A Hodi component first**: the plugin only draws its own component for what no Hodi component does.
