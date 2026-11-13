---
title: "Feeds"
description: "Feeds of articles the plugin provides, which a household follows like any other source."
intro: "Feeds of articles the plugin provides. A household follows them like any other source: the plugin gives the articles, and Hodi files them under the right topic."
order: 7
icon: "rss"
topic: "climate"
key: "plugin.json › feeds"
---

## Where it shows

In _Settings › Sources_, among the suggested sources, under the topic the feed gives. Once followed, its articles reach the household's feed with those of the other sources.

A feed needs no web part: everything happens in `plugin.json` and in the server part.

## Declaring it

In `plugin.json`, `feeds` lists the feeds, and `network` the sites the plugin reads:

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

<!-- prettier-ignore -->
| Field | Type | |
| --- | --- | --- |
| `key` | `string` | Its technical name, the same as in `feeds` on the server. |
| `name` | `string` | The name the household sees, 60 characters at most. |
| `site` | `string` | The site of its articles. It must be in `network`. |
| `lang` | `'fr' \| 'en'` | The language of its articles. |
| `topic` | `string` | The topic it goes under, such as `tech`, `world` or `climate`. |

## Filling it

On the server, `feeds` gives one function per feed, with the same key. It returns the list of its articles:

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

## An article

<!-- prettier-ignore -->
| Field | Type | |
| --- | --- | --- |
| `title` | `string` | Its title. |
| `link` | `string` | Its address, in `https`, on the feed's site. |
| `summary?` | `string` | Its summary, as plain text. |
| `publishedAt?` | `string \| number` | Its date, ISO or in milliseconds. |
| `image?` | `string` | The `https` address of its image. |

## Good to know

- **When it is read**: every few minutes, as long as at least one household follows it.
- **How many**: 100 articles per read, and 5 feeds per plugin, at most.
- **How they open**: with their summary and a link to the site, never in the reader.
