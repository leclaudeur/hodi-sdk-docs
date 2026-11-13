---
title: "Lecteur"
description: "Un bouton sous un article ouvert, à côté de « Lire l'original », pour que le plugin agisse sur cet article."
intro: "Un bouton sous un article ouvert, à côté de « Lire l'original ». Il sert à faire quelque chose de cet article-là : le signaler, l'envoyer quelque part, le noter…"
order: 5
icon: "book-open"
topic: "culture"
key: "readerAction"
---

## Où il s'affiche

Quand une personne ouvre un article dans le lecteur de Hodi, une rangée de boutons suit le texte, avec « Lire l'original ». Le bouton du plugin s'y ajoute.

## Exemple

Ce bouton signale l'article à la partie serveur du plugin :

```tsx title="web/index.tsx"
import { ReaderButton, definePlugin, usePluginApi } from 'hodi:sdk'
import { Flag } from 'lucide-react'

const Report = ({ article }) => {
  const api = usePluginApi()
  const send = () => api('/report', { method: 'POST', body: JSON.stringify({ id: article.id }) })
  return (
    <ReaderButton icon={<Flag size={12} />} onClick={send}>
      Signaler
    </ReaderButton>
  )
}

definePlugin({ readerAction: Report })
```

## Ce qu'il reçoit

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `article.id` | `string` | L'id de l'article dans Hodi. |
| `article.title` | `string` | Son titre. |
| `article.url` | `string` | Son adresse sur le site d'origine. |
| `article.sourceId` | `string` | L'id de sa source. |
| `article.sourceName` | `string` | Le nom de sa source, comme « Le Monde ». |

## Côté serveur

La route reçoit l'id de l'article, jamais une adresse à ouvrir. Avec la permission `articles`, elle retrouve l'article chez Hodi :

```tsx title="server/index.ts"
'POST /report': async (request, ctx) => {
  const article = await ctx.articles.get(request.body.id)
  const page = await ctx.articles.page(request.body.id)
  …
}
```

- `ctx.articles.get(id)` renvoie l'article, ou `null` si Hodi ne l'a jamais listé.
- `ctx.articles.page(id)` renvoie la page de l'article, telle que le site la sert.

Ainsi, un plugin ne peut pas se servir du lecteur pour ouvrir n'importe quelle adresse.

## À savoir

- **Son dessin** : un `ReaderButton`, comme les boutons de Hodi au même endroit.
- **Qui le voit** : les profils prévus par `audience`.
