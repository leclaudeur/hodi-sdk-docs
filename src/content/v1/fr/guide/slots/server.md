---
title: "Serveur"
description: "Un groupe de sections dans l'espace Serveur, pour tout ce que seul l'admin du serveur doit voir et gérer."
intro: "Un groupe de sections dans l'espace Serveur, au nom de ton plugin : pour tout ce que seul l'admin du serveur doit voir, régler et gérer."
order: 3
icon: "server"
topic: "science"
key: "serverSections"
---

## Où elles s'affichent

Dans la sidebar de l'espace Serveur, sous les groupes de Hodi. Chaque section a son adresse, `#/server/plugin/<id>/<section>`, et sa page.

## Exemple

```tsx title="web/index.tsx"
definePlugin({
  serverSections: [
    {
      id: 'said',
      label: 'server.said',
      page: SaidPage
    }
  ]
})
```

## À savoir

- **id** : lettres minuscules, chiffres et tirets, une fois par plugin.
- **label** : une clé de ses `locales` : son nom dans la sidebar, et le titre de sa page sur téléphone.
- **hint et icon** : la ligne sous son nom sur téléphone, et son icône Lucide.
- **Ses routes** : des `serverRoutes`, appelées avec `usePluginServerApi()` côté web.
