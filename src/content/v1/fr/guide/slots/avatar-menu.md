---
title: "avatarMenu"
description: "Des entrées du plugin dans le menu de l'avatar, comme « Changer de foyer »."
intro: "Des entrées que le plugin ajoute au menu de l'avatar, le menu du profil ouvert. Elles servent à une action rapide, accessible depuis n'importe quelle page."
order: 14
icon: "circle-user-round"
topic: "world"
key: "avatarMenu"
---

## Où s'affiche `avatarMenu`

Sur un ordinateur, le menu de l'avatar s'ouvre depuis l'avatar, en bas de la sidebar. Sur un téléphone ou une tablette, les entrées de ce menu se trouvent en bas de la fiche du profil. Les entrées `avatarMenu` du plugin s'ajoutent aux entrées de Hodi.

## Une entrée « Changer de foyer »

`avatarMenu` est une liste d'entrées, et pas un composant : Hodi dessine lui-même chaque entrée.

```tsx title="web/index.tsx"
import { definePlugin } from 'hodi:sdk'
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

## Les champs d'une entrée de `avatarMenu`

<!-- prettier-ignore -->
| Champ | Type | |
| --- | --- | --- |
| `id` | `string` | Le nom technique de l'entrée, une seule fois par plugin. |
| `label` | `string` | Le texte de l'entrée, une clé des `locales` du plugin. |
| `icon?` | `ComponentType` | Une icône Lucide, en 16 px. Sans icône, Hodi affiche une pièce de puzzle. |
| `onClick` | `() => void` | Ce que fait un clic sur l'entrée. |
