---
title: "Getting started"
description: "Your first Hodi plugin in four steps: its manifest, its route, its card, then installing it."
intro: "Your first plugin in four steps, in an editor that shows Hodi next to your code."
order: 0
icon: "graduation-cap"
steps:
  - name: "The manifest"
    text: "The manifest tells Hodi who your plugin is and what settings it has. Hodi draws their page by itself."
    guide: "/en/guide/manifest/"
    todo:
      - "Open `plugin.json`, in the tabs above the code."
      - "On line 10, replace \"Hello\" with \"Hi\". It's the value the setting starts with."
      - "Look at the preview: the Greeting row already shows \"Hi\"."
    file: "plugin.json"
    lang: "json"
    edit: 10
    start: '"default": "Hello"'
    code: |
      {
        "id": "hello-world",
        "name": "Hello world",
        "version": "0.1.0",
        "api": 2,
        "settings": [
          {
            "key": "greeting",
            "type": "text",
            "default": "Hi"
          }
        ]
      }
    preview:
      title: "Hello world"
      intro: "Your first plugin."
      rows:
        - label: "Greeting"
          value: "Hi"
          button: "Change"
          flash: true
          live: true
  - name: "The route"
    text: "A route is a function: Hodi calls it, it answers. This one reads the \"Greeting\" setting and sends it back."
    guide: "/en/guide/server-context/"
    todo:
      - "Open `server/index.ts`: it's the part of your plugin that runs on the server."
      - "On line 7, add a \"!\" after `greeting`, in the text the route sends back."
      - "Click \"Say hello\" in the preview: your route answers \"Hi!\"."
    file: "server/index.ts"
    lang: "ts"
    edit: 7
    start: "return { body: { text: `${greeting}` } }"
    code: |
      import type { ServerPlugin } from '@hodi-app/plugin-sdk/server'

      const plugin: ServerPlugin = {
        routes: {
          'POST /hello': async (_request, ctx) => {
            const { greeting } = ctx.settings()
            return { body: { text: `${greeting}!` } }
          }
        }
      }

      export default plugin
    preview:
      title: "Hello world"
      intro: "Your first plugin."
      rows:
        - label: "Greeting"
          value: "Hi"
          button: "Change"
        - label: "Say hello"
          hint: "Your route's answer"
          button: "Say hello"
          answer: "Hi!"
          live: true
  - name: "The card"
    text: "The card is what Hodi shows of your plugin. You draw it with Hodi's components: it looks like the app straight away."
    guide: "/en/components/"
    todo:
      - "Open `web/index.tsx`: it's the part of your plugin that shows in Hodi."
      - "On line 15, add `look=\"primary\"` to the button so it stands out."
      - "Look at the preview: the \"Say hello\" button takes the main style."
    file: "web/index.tsx"
    lang: "tsx"
    edit: 15
    start: "<Button onClick={sayHello}>"
    code: |
      import { useState } from 'react'
      import {
        Button, SettingRow, definePlugin, usePluginApi
      } from 'hodi:sdk'

      const HelloCard = () => {
        const api = usePluginApi()
        const [text, setText] = useState('Say hello')
        const sayHello = async () => {
          const response = await api('/hello', { method: 'POST' })
          setText((await response.json()).text)
        }
        return (
          <SettingRow label={text} hint="Your route's answer">
            <Button look="primary" onClick={sayHello}>
              Say hello
            </Button>
          </SettingRow>
        )
      }

      definePlugin({ settingsPage: HelloCard })
    preview:
      title: "Hello world"
      intro: "Your first plugin."
      rows:
        - label: "Greeting"
          value: "Hi"
          button: "Change"
        - label: "Hi!"
          hint: "Your route's answer"
          button: "Say hello"
          primary: true
          live: true
    log: "POST /api/plugins/hello-world/hello  200"
  - name: "Install"
    text: "Developer mode installs your plugin on your test Hodi, then updates it at every save: Hodi restarts by itself to load it."
    guide: "/en/guide/publish/"
    todo:
      - "In the preview, your test Hodi's developer mode is on: it shows you a code."
      - "On line 3, type that code after `--code` to run `npx hodi-plugin dev`."
      - "Look at Server › Plugins: Hello world is there, with the \"In development\" badge."
    file: "Terminal"
    lang: "text"
    edit: 3
    start: "--code"
    reveal: 4
    code: |
      $ npx hodi-plugin dev \
          --server http://localhost:3000 \
          --code 482913

      ✓ plugin.json
      ✓ server/index.ts
      ✓ web/index.tsx
      ✓ locales/fr.json, locales/en.json

      Installed: Hello world 0.1.0
      Waiting for a change…
    preview:
      title: "Plugins"
      intro: "What the server admin sees."
      plugins:
        - name: "Diagnostic"
          icon: "stethoscope"
          hint: "Reports a badly read article"
          chip: "0.2.2"
          tone: "success"
        - name: "Hello world"
          icon: "hand"
          hint: "Your first plugin"
          chip: "In development"
          tone: "warning"
          after: true
        - name: "Developer mode"
          icon: "code"
          hint: "Code: 482913"
          chip: "On"
          tone: "success"
    log: "Developer mode: Hello world 0.1.0  ok"
finish:
  title: "All done!"
  intro: "Well done! You've just seen how a Hodi plugin is built. It was a demo: no server was running and nothing was installed."
  recap:
    - name: "The manifest"
      text: "`plugin.json` gives the plugin its name, its version and its setting."
    - name: "The route"
      text: "`server/index.ts` answers the \"Say hello\" button with that setting."
    - name: "The card"
      text: "`web/index.tsx` shows the setting and the button in Settings."
    - name: "Installing"
      text: "`npx hodi-plugin dev` sends it to your Hodi and updates it at every save."
  real: "To do it for real"
  realText: "You need your own Hodi and Node.js 24. Start from the plugin template: the guide takes you step by step, from installing to publishing."
---
