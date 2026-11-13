---
title: "Flux"
description: "Des flux qu'un foyer suit comme n'importe quelle source : le plugin fournit les articles, Hodi les range."
intro: "Des flux qu'un foyer suit comme n'importe quelle autre source : le plugin fournit les articles, et Hodi les range dans le thème choisi."
order: 7
icon: "rss"
topic: "climate"
key: "plugin.json › feeds"
---

## Le déclarer

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
    "lang": "fr",
    "topic": "tech"
  }
]
```

## Le remplir

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

## À savoir

- **Où il apparaît** : dans Réglages › Sources, parmi les sources proposées, dans le thème donné.
- **Ses articles** : 100 au plus, chacun avec un titre et un lien `https` sur le site du flux.
- **Comment ils s’ouvrent** : avec leur résumé et le lien vers le site, jamais dans le lecteur.
- **Quand il est lu** : toutes les quelques minutes, tant qu'un foyer le suit.
- **Combien** : 5 flux par plugin au plus.
