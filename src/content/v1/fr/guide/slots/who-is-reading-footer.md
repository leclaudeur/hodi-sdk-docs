---
title: "whoIsReadingFooter"
description: "Un bouton du plugin à côté de « Gérer les profils », sous les profils de « Qui lit ? »."
intro: "Un composant du plugin sous les profils de l'écran « Qui lit ? », à côté du bouton « Gérer les profils ». Il sert à une action sur le foyer entier, comme « Changer de foyer »."
order: 9
icon: "users"
topic: "sport"
key: "whoIsReadingFooter"
---

## Où s'affiche `whoIsReadingFooter`

L'écran « Qui lit ? » s'ouvre quand Hodi démarre : chaque profil du foyer y a sa vignette, et le bouton « Gérer les profils » se trouve sous les vignettes. Le composant `whoIsReadingFooter` s'affiche à côté de ce bouton, à la même hauteur.

## Un bouton « Changer de foyer »

```tsx title="web/public.tsx"
import { Button, definePlugin } from 'hodi:sdk'

const SwitchHousehold = () => (
  <Button onClick={() => (window.location.hash = '#/plugin/village/households')}>Changer de foyer</Button>
)

definePlugin({ whoIsReadingFooter: SwitchHousehold })
```

## Ce que Hodi donne au composant de `whoIsReadingFooter`

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | La taille de l'écran. |

## À savoir sur `whoIsReadingFooter`

- **Le dessin** : un `Button`, à la hauteur de « Gérer les profils ».
- **Plusieurs plugins** : chaque plugin ajoute son composant, dans l'ordre des plugins.
