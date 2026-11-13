---
title: "readerAction"
description: "Un bouton sous un article ouvert, à côté de _Lire l'original_, pour que le plugin agisse sur cet article."
intro: "Un bouton sous un article ouvert, à côté de _Lire l'original_. Il sert à faire quelque chose de cet article-là : le signaler, l'envoyer quelque part, le noter…"
order: 5
icon: "book-open"
topic: "culture"
key: "readerAction"
---

## Où dans Hodi

Quand une personne ouvre un article dans le lecteur de Hodi, une rangée de boutons suit le texte de l'article, avec _Lire l'original_. Le bouton du plugin s'ajoute à cette rangée.

## Exemple

Ce bouton envoie l'id de l'article à une route du plugin :

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

## Les props

Hodi donne au composant une seule prop, `article` : l'article ouvert. Voici les champs de `article` :

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `article.id` | `string` | L'id de l'article dans Hodi. |
| `article.title` | `string` | Le titre de l'article. |
| `article.url` | `string` | L'adresse de l'article sur le site d'origine. |
| `article.sourceId` | `string` | L'id de la source de l'article. |
| `article.sourceName` | `string` | Le nom de la source, comme _Le Monde_. |

## Côté serveur

La route du plugin reçoit l'id de l'article, jamais une adresse à ouvrir. Avec la permission `articles`, la route retrouve l'article chez Hodi :

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

- **Le dessin du bouton** : un `ReaderButton`, comme les boutons de Hodi au même endroit.
- **Qui voit le bouton** : les profils prévus par `audience`.
