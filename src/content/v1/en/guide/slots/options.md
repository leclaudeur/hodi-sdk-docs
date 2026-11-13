---
title: "Its options"
description: "A card of your own under its settings, in Server › Plugins, for whatever those settings don't say."
intro: "Under the settings Hodi draws for your plugin, in Server › Plugins: a card of your own, for what settings alone don't say."
order: 1
icon: "sliders-horizontal"
topic: "tech"
key: "settingsPage"
---

## Where it shows

The server admin opens your plugin in _Server › Plugins_, with its "Manage" round button. Hodi first draws the rows of the settings in `plugin.json`, then your card under them.

## Example

```tsx title="web/index.tsx"
import { Button, SettingRow, definePlugin, usePluginApi } from 'hodi:sdk'

const HelloCard = () => {
  const api = usePluginApi()
  return (
    <SettingRow label="Say hello" hint="Your route's answer">
      <Button compact onClick={() => api('/hello', { method: 'POST' })}>
        Say hello
      </Button>
    </SettingRow>
  )
}

definePlugin({ settingsPage: HelloCard })
```

## Good to know

- **What it receives**: nothing: it reads its settings and calls its routes.
- **Who sees it**: the server admin, who manages plugins.
- **Its rows**: `SettingRow`s, like the ones Hodi draws above.
