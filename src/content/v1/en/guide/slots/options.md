---
title: "settingsPage"
description: "A card of the plugin in Server › Plugins, under its settings, for what a setting alone can't do."
intro: "A card the plugin draws itself on its page in _Server › Plugins_, under the settings Hodi draws for it. It is for what plain settings can't do: a button to test, a list, statistics…"
order: 1
icon: "sliders-horizontal"
topic: "tech"
key: "settingsPage"
---

## Where in Hodi

The server admin opens _Server › Plugins_, then a plugin's page. This page shows, from top to bottom:

1. The plugin's name, its version and its switch.
2. _Options_: the [settings](/en/guide/manifest/#settings) Hodi draws.
3. The `settingsPage` card, which the plugin draws.
4. The buttons to delete the plugin.

The plugin only draws the `settingsPage` card. The rest of the page comes from Hodi.

## Example

Hello world puts a _Say hello_ button in this card. A click on this button calls the `/hello` route, then the card shows the answer:

```tsx title="web/index.tsx"
import { Button, SettingRow, definePlugin, usePluginApi } from 'hodi:sdk'
import { useState } from 'react'

const HelloCard = () => {
  const api = usePluginApi()
  const [text, setText] = useState('Your route\'s answer')
  const sayHello = async () => {
    const answer = await api('/hello', { method: 'POST' })
    setText((await answer.json()).text)
  }
  return (
    <SettingRow label="Say hello" hint={text}>
      <Button compact onClick={sayHello}>
        Say hello
      </Button>
    </SettingRow>
  )
}

definePlugin({ settingsPage: HelloCard })
```

## Good to know

- **What Hodi gives the component**: no prop.
- **The card's data**: the plugin's routes, with `usePluginApi()`.
- **Who sees the card**: the server admin only, like the whole page.
- **When the card shows**: only when the plugin is on.
- **How the card is drawn**: with `SettingRow`s, like the settings above it.
