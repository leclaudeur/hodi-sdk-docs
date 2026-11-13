---
title: "Les emplacements"
description: "Les endroits de Hodi où un plugin peut afficher quelque chose, et comment les déclarer avec `definePlugin()`."
intro: "Un plugin n'affiche rien n'importe où : il remplit des emplacements, des endroits précis de Hodi prévus pour les plugins. Chaque carte ci-dessous mène à la page d'un emplacement : où il se trouve, un exemple de code et ce qu'il reçoit."
order: 3
icon: "layout-grid"
cards: "children"
---

## Le principe

Hodi garde la main sur ses propres écrans. Un plugin ne peut pas modifier une page de Hodi, ni y ajouter un bouton où il veut. À la place, Hodi prévoit des **emplacements** : une entrée dans Réglages, une carte dans le tableau de bord du serveur, un bouton sous un article…

Pour chaque emplacement, le plugin donne un composant React. Hodi l'affiche au bon endroit, au bon moment, et seulement pour les bonnes personnes.

## Les déclarer

La partie web appelle `definePlugin()` une seule fois, dans `web/index.tsx`. Elle lui passe un objet : chaque clé est un emplacement, et sa valeur est ce que le plugin y affiche.

```tsx title="web/index.tsx"
import { definePlugin } from 'hodi:sdk'

definePlugin({
  settingsPage: HelloCard,
  readerAction: ReportButton
})
```

Ici, le plugin remplit deux emplacements :

- `settingsPage` : la carte `HelloCard`, sur sa page dans _Serveur › Plugins_ ;
- `readerAction` : le bouton `ReportButton`, sous chaque article ouvert.

Un emplacement que le plugin ne donne pas reste vide. Si le composant d'un plugin plante, Hodi l'enlève, et le reste de la page continue de marcher.

## Deux petits emplacements

Ces deux emplacements n'ont pas de page à eux.

### `accountRows`

Des lignes à la fin de la carte « Compte », dans _Réglages › Compte et données_. Le composant renvoie des `SettingRow`.

```tsx title="web/index.tsx"
const GoogleRow = () => <SettingRow label="Google" value="anna@gmail.com" />

definePlugin({ accountRows: GoogleRow })
```

### `avatarMenu`

Des entrées dans le menu de l'avatar : dans la sidebar sur un ordinateur, en bas de la fiche du profil sur un téléphone ou une tablette. Chaque entrée a un `id`, un libellé (une clé de ses `locales`), une icône Lucide et une action.

```tsx title="web/index.tsx"
import { House } from 'lucide-react'

definePlugin({
  avatarMenu: [
    {
      id: 'switch',
      label: 'menu.switch',
      icon: House,
      onClick: () => openSwitcher()
    }
  ]
})
```
