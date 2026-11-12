---
title: "Les emplacements"
description: "Un plugin s'affiche aux endroits qu'il déclare dans `definePlugin()`, avec les composants de Hodi, et n'en touche aucun autre."
intro: "Un plugin s'affiche aux endroits qu'il déclare dans `definePlugin()`, avec les composants de Hodi, et n'en touche aucun autre. Chaque carte mène à sa page : où il s'affiche, un exemple de code et ce qu'il faut savoir avant de t'en servir."
order: 3
icon: "layout-grid"
cards: "children"
---

## Déclarer ses emplacements

La partie web appelle `definePlugin()` une fois, avec ce qu'elle dessine à chaque endroit. Un emplacement qu'elle ne donne pas reste à Hodi.

```tsx title="web/index.tsx"
import { definePlugin } from 'hodi:sdk'

definePlugin({
  settingsPage: HelloCard,
  serverSections: [
    {
      id: 'said',
      label: 'server.said',
      page: SaidPage
    }
  ]
})
```

## Deux petits emplacements

- `accountRows` : des lignes à la fin de « Ton compte », dans _Réglages › Compte et données_.
- `avatarMenu` : des entrées du menu de l'avatar, avec un libellé, une icône et un clic.
