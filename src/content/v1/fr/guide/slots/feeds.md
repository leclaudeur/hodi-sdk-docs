---
title: "feeds"
description: "Des flux d'articles que le plugin fournit, et qu'un foyer suit comme n'importe quelle autre source."
intro: "Des flux d'articles que le plugin fournit. Un foyer les suit comme n'importe quelle autre source : le plugin donne les articles, et Hodi les range dans le bon thème."
order: 11
icon: "rss"
topic: "climate"
key: "plugin.json › feeds"
---

## Où dans Hodi

Un flux d'articles du plugin apparaît dans _Réglages › Sources_, parmi les sources proposées, dans le thème que le flux indique. Une fois que le foyer suit le flux, les articles du flux arrivent dans le fil du foyer, avec ceux des autres sources.

Un flux n'a pas besoin de partie web : tout se passe dans `plugin.json` et dans la partie serveur. Pour cette raison, `feeds` n'est pas une clé de `definePlugin()`, mais un champ de `plugin.json`.

## Déclarer le flux

Dans `plugin.json`, le champ `feeds` liste les flux du plugin. La permission `network` liste les sites que le plugin lit :

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

Voici les champs d'un flux de `feeds` :

<!-- prettier-ignore -->
| Champ | Type | |
| --- | --- | --- |
| `key` | `string` | Le nom technique du flux, le même que dans `feeds` côté serveur. |
| `name` | `string` | Le nom que le foyer voit, 60 caractères au plus. |
| `site` | `string` | Le site des articles du flux. Ce site doit être dans `network`. |
| `lang` | `'fr' \| 'en'` | La langue des articles du flux. |
| `topic` | `string` | Le thème où le flux se range, comme `tech`, `world` ou `climate`. |

## Remplir le flux

Dans la partie serveur, `feeds` donne une fonction par flux, avec la même clé que dans `plugin.json`. Cette fonction renvoie la liste des articles du flux :

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

## Les champs d'un article

<!-- prettier-ignore -->
| Champ | Type | |
| --- | --- | --- |
| `title` | `string` | Le titre de l'article. |
| `link` | `string` | L'adresse de l'article, en `https`, sur le site du flux. |
| `summary?` | `string` | Le résumé de l'article, en texte simple. |
| `publishedAt?` | `string \| number` | La date de l'article, ISO ou en millisecondes. |
| `image?` | `string` | L'adresse `https` de l'image de l'article. |

## À savoir

- **Quand Hodi lit un flux** : toutes les quelques minutes, tant qu'un foyer suit ce flux.
- **Combien d'articles** : 100 articles par lecture au plus, et 5 flux par plugin au plus.
- **Comment s'ouvre un article** : avec son résumé et un lien vers le site, jamais dans le lecteur.
