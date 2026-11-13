---
title: "Les emplacements"
description: "Les endroits de Hodi où un plugin peut afficher quelque chose, et comment les déclarer avec `definePlugin()`."
intro: "Un plugin n'affiche rien n'importe où : il remplit des emplacements, des endroits précis de Hodi prévus pour les plugins. Chaque carte ci-dessous porte le nom d'un emplacement, tel qu'il s'écrit dans le code, et mène à sa page : où l'emplacement se trouve dans Hodi, un exemple et ce que Hodi donne au composant."
order: 3
icon: "layout-grid"
cards: "children"
---

## Ce qu'est un emplacement

Hodi garde la main sur ses propres écrans. Un plugin ne peut pas modifier une page de Hodi, ni y ajouter un bouton où il veut. À la place, Hodi prévoit des **emplacements** : une entrée dans Réglages, une carte dans le tableau de bord du serveur, un bouton sous un article…

Pour chaque emplacement, le plugin donne un composant React. Hodi affiche ce composant au bon endroit, au bon moment, et seulement pour les bonnes personnes.

## Déclarer un emplacement

La partie web appelle `definePlugin()` une seule fois, dans `web/index.tsx`. `definePlugin()` reçoit un objet : chaque clé de cet objet est le nom d'un emplacement, et la valeur de la clé est ce que le plugin affiche dans cet emplacement.

```tsx title="web/index.tsx"
import { definePlugin } from 'hodi:sdk'

definePlugin({
  settingsPage: HelloCard,
  readerAction: ReportButton
})
```

Dans cet exemple, le plugin remplit deux emplacements :

- `settingsPage` : la carte `HelloCard`, sur la page du plugin dans _Serveur › Plugins_ ;
- `readerAction` : le bouton `ReportButton`, sous chaque article ouvert.

Un emplacement que le plugin ne donne pas reste vide. Si le composant d'un plugin plante, Hodi enlève ce composant, et le reste de la page continue de marcher.
