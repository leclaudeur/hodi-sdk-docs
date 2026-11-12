---
title: "Reader"
description: "A button at the end of an open article, next to \"Read the original\", to act on that article, such as reporting it."
intro: "A button at the end of an open article, next to \"Read the original\": so your plugin can do something with that very article, such as report it."
order: 5
icon: "book-open"
topic: "culture"
key: "readerAction"
---

## Example

```tsx title="web/index.tsx"
import { ReaderButton, definePlugin, usePluginApi } from 'hodi:sdk'

const Report = ({ article }) => {
  const api = usePluginApi()
  const send = () => api('/report', { method: 'POST', body: JSON.stringify({ id: article.id }) })
  return <ReaderButton onClick={send}>Report</ReaderButton>
}

definePlugin({ readerAction: Report })
```

## Good to know

- **What it receives**: `article`: its `id`, its title, its address, its source.
- **How it looks**: a `ReaderButton`, like Hodi's buttons in the same place.
- **On the server**: with the `articles` permission, `ctx.articles.get(id)` finds the article and `ctx.articles.page(id)` its page. The plugin only ever gets an id, never an address to open.
