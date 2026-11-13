---
title: "Its admin card"
description: "A card of the plugin in Server › Plugins, under its settings, for what a setting alone can't do."
intro: "A card the plugin draws itself on its page in _Server › Plugins_, under the settings Hodi draws for it. It is for what plain settings can't do: a button to test, a list, statistics…"
order: 1
icon: "sliders-horizontal"
topic: "tech"
key: "settingsPage"
---

## Where it shows

The server admin opens _Server › Plugins_, then a plugin's page. From top to bottom, that page has:

1. The plugin's name, its version and its switch.
2. "Options": the [settings](/en/guide/manifest/#settings) of `plugin.json`, which Hodi draws.
3. The plugin's card, `settingsPage`.
4. The buttons to remove the plugin.

The plugin only draws part 3. The rest comes from Hodi.

## Example

Hello world puts a "Say hello" button there, which calls its route and shows the answer:

```tsx title="web/index.tsx"
import { Button, SettingRow, definePlugin, usePluginApi } from 'hodi:sdk'
import { useState } from 'react'

const HelloCard = () => {
  const api = usePluginApi()
  const [text, setText] = useState('Your route’s answer')
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

- **What it receives**: nothing.
- **Its data**: it reads it through its routes, with `usePluginApi()`.
- **Who sees it**: the server admin only, like the whole _Server › Plugins_ page.
- **When it shows**: only while the plugin is on.
- **How it looks**: `SettingRow`s, like the settings above it.
