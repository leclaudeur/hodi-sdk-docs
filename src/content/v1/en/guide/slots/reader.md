---
title: "readerAction"
description: "A button under an open article, next to \"Read the original\", so the plugin can act on that article."
intro: "A button under an open article, next to \"Read the original\". It is for doing something with that very article: report it, send it somewhere, rate it…"
order: 5
icon: "book-open"
topic: "culture"
key: "readerAction"
---

## Where `readerAction` shows

When someone opens an article in Hodi's reader, a row of buttons follows the article's text, with "Read the original". The plugin's button joins this row.

## A "Report" button

This button sends the article's id to a route of the plugin:

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

## What Hodi gives the component of `readerAction`

Hodi gives the component a single prop, `article`: the open article. Here are the fields of `article`:

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `article.id` | `string` | The article's id in Hodi. |
| `article.title` | `string` | The article's title. |
| `article.url` | `string` | The article's address on the original site. |
| `article.sourceId` | `string` | The id of the article's source. |
| `article.sourceName` | `string` | The source's name, such as "The Guardian". |

## Finding the article again in the server part

The plugin's route receives the article's id, never an address to open. With the `articles` permission, the route finds the article again in Hodi:

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

## Good to know about `readerAction`

- **How the button is drawn**: a `ReaderButton`, like Hodi's buttons in the same place.
- **Who sees the button**: the profiles allowed by `audience`.
