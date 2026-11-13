---
title: "Feeds"
description: "Feeds a household follows like any source: your plugin provides the articles, Hodi files them."
intro: "Feeds a household follows like any other source: your plugin provides the articles, and Hodi files them under the topic you pick."
order: 7
icon: "rss"
topic: "climate"
key: "plugin.json › feeds"
---

## Declaring it

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

## Filling it

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

## Good to know

- **Where it appears**: in Settings › Sources, among the suggested sources, under the given topic.
- **Its articles**: 100 at most, each with a title and an `https` link on the feed's site.
- **How they open**: with their summary and the link to the site, never in the reader.
- **When it's read**: every few minutes, as long as a household follows it.
- **How many**: 5 feeds per plugin at most.
