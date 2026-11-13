---
title: "feeds"
description: "Feeds of articles the plugin provides, which a household follows like any other source."
intro: "Feeds of articles the plugin provides. A household follows them like any other source: the plugin gives the articles, and Hodi files them under the right topic."
order: 11
icon: "rss"
topic: "climate"
key: "plugin.json › feeds"
---

## Where `feeds` shows

A feed of articles of the plugin shows in _Settings › Sources_, among the suggested sources, in the topic the feed gives. Once the household follows the feed, the feed's articles arrive in the household's stream, with those of the other sources.

A feed needs no web part: everything happens in `plugin.json` and in the server part. For that reason, `feeds` isn't a key of `definePlugin()`, but a field of `plugin.json`.

## Declaring a feed in `plugin.json`

In `plugin.json`, the `feeds` field lists the plugin's feeds. The `network` permission lists the sites the plugin reads:

```json title="plugin.json"
"permissions": {
  "network": [
    "example.com"
  ]
},
"feeds": [
  {
    "key": "news",
    "name": "Example",
    "site": "example.com",
    "lang": "en",
    "topic": "tech"
  }
]
```

Here are the fields of a feed of `feeds`:

<!-- prettier-ignore -->
| Field | Type | |
| --- | --- | --- |
| `key` | `string` | The feed's technical name, the same as in `feeds` in the server part. |
| `name` | `string` | The name the household sees, 60 characters at most. |
| `site` | `string` | The site of the feed's articles. This site must be in `network`. |
| `lang` | `'fr' \| 'en'` | The language of the feed's articles. |
| `topic` | `string` | The topic the feed goes under, such as `tech`, `world` or `climate`. |

## Filling a feed in the server part

In the server part, `feeds` gives one function per feed, with the same key as in `plugin.json`. This function returns the list of the feed's articles:

```tsx title="server/index.ts"
const plugin: ServerPlugin = {
  feeds: {
    news: async ctx => {
      const { text } = await ctx.fetchText('https://example.com/api/latest')
      return JSON.parse(text).map(item => ({
        title: item.title,
        link: item.url,
        summary: item.lead
      }))
    }
  }
}
```

## The fields of an article of the feed

<!-- prettier-ignore -->
| Field | Type | |
| --- | --- | --- |
| `title` | `string` | The article's title. |
| `link` | `string` | The article's address, in `https`, on the feed's site. |
| `summary?` | `string` | The article's summary, in plain text. |
| `publishedAt?` | `string \| number` | The article's date, ISO or in milliseconds. |
| `image?` | `string` | The `https` address of the article's image. |

## Good to know about `feeds`

- **When Hodi reads a feed**: every few minutes, as long as a household follows this feed.
- **How many articles**: 100 articles per read at most, and 5 feeds per plugin at most.
- **How an article opens**: with its summary and a link to the site, never in the reader.
