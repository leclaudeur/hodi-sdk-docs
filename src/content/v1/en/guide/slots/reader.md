---
title: "Reader"
description: "A button under an open article, next to \"Read the original\", so the plugin can act on that article."
intro: "A button under an open article, next to \"Read the original\". It is for doing something with that very article: report it, send it somewhere, rate it…"
order: 5
icon: "book-open"
topic: "culture"
key: "readerAction"
---

## Where it shows

When someone opens an article in Hodi's reader, a row of buttons follows the text, with "Read the original". The plugin's button joins it.

## Example

This button reports the article to the plugin's server part:

```tsx title="web/index.tsx"
import { ReaderButton, definePlugin, usePluginApi } from 'hodi:sdk'
import { Flag } from 'lucide-react'

const Report = ({ article }) => {
  const api = usePluginApi()
  const send = () => api('/report', { method: 'POST', body: JSON.stringify({ id: article.id }) })
  return (
    <ReaderButton icon={<Flag size={12} />} onClick={send}>
      Report
    </ReaderButton>
  )
}

definePlugin({ readerAction: Report })
```

## What it receives

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `article.id` | `string` | The article's id in Hodi. |
| `article.title` | `string` | Its title. |
| `article.url` | `string` | Its address on the original site. |
| `article.sourceId` | `string` | Its source's id. |
| `article.sourceName` | `string` | Its source's name, such as "The Guardian". |

## On the server

The route receives the article's id, never an address to open. With the `articles` permission, it finds the article in Hodi:

```tsx title="server/index.ts"
'POST /report': async (request, ctx) => {
  const article = await ctx.articles.get(request.body.id)
  const page = await ctx.articles.page(request.body.id)
  …
}
```

- `ctx.articles.get(id)` returns the article, or `null` if Hodi never listed it.
- `ctx.articles.page(id)` returns the article's page, as the site serves it.

So a plugin can't use the reader to open any address it likes.

## Good to know

- **How it looks**: a `ReaderButton`, like Hodi's buttons in the same place.
- **Who sees it**: the profiles in `audience`.
