---
title: "Flux"
description: "Des flux d'articles que le plugin fournit, et qu'un foyer suit comme n'importe quelle autre source."
intro: "Des flux d'articles que le plugin fournit. Un foyer les suit comme n'importe quelle autre source : le plugin donne les articles, et Hodi les range dans le bon thème."
order: 7
icon: "rss"
topic: "climate"
key: "plugin.json › feeds"
---

## Où il apparaît

Dans _Réglages › Sources_, parmi les sources proposées, dans le thème que le flux indique. Une fois suivi, ses articles arrivent dans le fil du foyer avec ceux des autres sources.

Un flux n'a pas besoin de partie web : tout se passe dans `plugin.json` et dans la partie serveur.

## Le déclarer

Dans `plugin.json`, `feeds` liste les flux, et `network` les sites que le plugin lit :

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

<!-- prettier-ignore -->
| Champ | Type | |
| --- | --- | --- |
| `key` | `string` | Son nom technique, le même que dans `feeds` côté serveur. |
| `name` | `string` | Le nom que le foyer voit, 60 caractères au plus. |
| `site` | `string` | Le site de ses articles. Il doit être dans `network`. |
| `lang` | `'fr' \| 'en'` | La langue de ses articles. |
| `topic` | `string` | Le thème où il se range, comme `tech`, `world` ou `climate`. |

## Le remplir

Côté serveur, `feeds` donne une fonction par flux, avec la même clé. Elle renvoie la liste de ses articles :

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

## Un article

<!-- prettier-ignore -->
| Champ | Type | |
| --- | --- | --- |
| `title` | `string` | Son titre. |
| `link` | `string` | Son adresse, en `https`, sur le site du flux. |
| `summary?` | `string` | Son résumé, en texte simple. |
| `publishedAt?` | `string \| number` | Sa date, ISO ou en millisecondes. |
| `image?` | `string` | L'adresse `https` de son image. |

## À savoir

- **Quand il est lu** : toutes les quelques minutes, tant qu'au moins un foyer le suit.
- **Combien** : 100 articles par lecture, et 5 flux par plugin, au plus.
- **Comment ils s'ouvrent** : avec leur résumé et un lien vers le site, jamais dans le lecteur.
