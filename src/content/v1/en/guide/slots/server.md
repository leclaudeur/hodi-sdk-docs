---
title: "Server"
description: "A group of sections in the Server space, for everything only the server admin should see and manage."
intro: "A group of sections in the Server space, under your plugin's name: for everything only the server admin should see, set and manage."
order: 3
icon: "server"
topic: "science"
key: "serverSections"
---

## Where they show

In the Server space's sidebar, under Hodi's groups. Each section has its address, `#/server/plugin/<id>/<section>`, and its page.

## Example

```tsx title="web/index.tsx"
definePlugin({
  serverSections: [
    {
      id: 'said',
      label: 'server.said',
      page: SaidPage
    }
  ]
})
```

## Good to know

- **id**: lowercase letters, digits and hyphens, once per plugin.
- **label**: a key from its `locales`: its name in the sidebar, and its page's title on a phone.
- **hint and icon**: the line under its name on a phone, and its Lucide icon.
- **Its routes**: `serverRoutes`, called with `usePluginServerApi()` on the web side.
