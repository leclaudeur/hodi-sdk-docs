---
title: "Components"
description: "The web part imports Hodi's components from `hodi:sdk`: the app's own, with their sizes, their colours and their three themes."
intro: "The web part imports Hodi's components from `hodi:sdk`. They are the app's own, with their sizes, their colours and their three themes: your plugin looks like it belongs to Hodi."
order: 1
icon: "component"
cards: "components"
---

```tsx title="web/index.tsx"
import { Button, SettingRow, SettingsCard } from 'hodi:sdk'
```

Each page shows the real render, the code that gives it, then every prop. Icons come from `lucide-react`, which your plugin adds to its dependencies.

## The rules

- **No inline styles**: Hodi's page refuses them. Your CSS goes in `web.css`.
- **Hodi's colours**: its CSS variables, never a hard-coded colour.
- **A Hodi component first**: only draw one of your own for what none of them does.
