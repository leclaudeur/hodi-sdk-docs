---
title: "Lecteur"
description: "Un bouton au bout d'un article ouvert, à côté de « Lire l'original », pour agir sur cet article, comme le signaler."
intro: "Un bouton au bout d'un article ouvert, à côté de « Lire l'original » : pour que le plugin fasse quelque chose de cet article-là, comme le signaler."
order: 5
icon: "book-open"
topic: "culture"
key: "readerAction"
---

## Exemple

```tsx title="web/index.tsx"
import { ReaderButton, definePlugin, usePluginApi } from 'hodi:sdk'

const Report = ({ article }) => {
  const api = usePluginApi()
  const send = () => api('/report', { method: 'POST', body: JSON.stringify({ id: article.id }) })
  return <ReaderButton onClick={send}>Signaler</ReaderButton>
}

definePlugin({ readerAction: Report })
```

## À savoir

- **Ce qu’il reçoit** : `article` : son `id`, son titre, son adresse, sa source.
- **Son dessin** : un `ReaderButton`, comme les boutons de Hodi au même endroit.
- **Côté serveur** : avec la permission `articles`, `ctx.articles.get(id)` retrouve l'article et `ctx.articles.page(id)` sa page. Le plugin ne reçoit qu'un id, jamais une adresse à ouvrir.
