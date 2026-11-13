---
title: "whoIsReadingFooter"
description: "Un bouton du plugin à côté de _Gérer les profils_, sous les profils de _Qui lit ?_."
intro: "Un composant du plugin sous les profils de l'écran _Qui lit ?_, à côté du bouton _Gérer les profils_. Il sert à une action sur le foyer entier, comme _Changer de foyer_."
order: 9
icon: "users"
topic: "sport"
key: "whoIsReadingFooter"
---

## Où dans Hodi

L'écran _Qui lit ?_ s'ouvre quand Hodi démarre : chaque profil du foyer y a sa vignette, et le bouton _Gérer les profils_ se trouve sous les vignettes. Le composant `whoIsReadingFooter` s'affiche à côté de ce bouton, à la même hauteur.

## Exemple

```tsx title="web/public.tsx"
import { Button, definePlugin } from 'hodi:sdk'

const SwitchHousehold = () => (
  <Button onClick={() => (window.location.hash = '#/plugin/village/households')}>Changer de foyer</Button>
)

definePlugin({ whoIsReadingFooter: SwitchHousehold })
```

## Les props

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | La taille de l'écran. |

## À savoir

- **Le dessin** : un `Button`, à la hauteur de _Gérer les profils_.
- **Plusieurs plugins** : chaque plugin ajoute son composant, dans l'ordre des plugins.
