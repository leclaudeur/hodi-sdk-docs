---
title: "Vue d'ensemble"
description: "Une carte du plugin dans le tableau de bord du serveur, avec un chiffre ou un graphique sur la période choisie."
intro: "Une carte du plugin dans _Serveur › Vue d'ensemble_, le tableau de bord du serveur. Elle montre un chiffre ou un graphique du plugin sur la période que l'admin a choisie."
order: 4
icon: "layout-dashboard"
topic: "ai"
key: "overviewCards"
---

## Où elle s'affiche

Vue d'ensemble montre des cartes, sur une période que l'admin choisit en haut de la page (7 jours, 30 jours…). Les cartes des plugins viennent après « En ligne » et « Profils », dans l'ordre des plugins.

## Exemple

```tsx title="web/index.tsx"
import { OverviewCard, definePlugin, usePluginServerApi } from 'hodi:sdk'

const SaidCard = ({ from, to }) => {
  const count = useSaidCount(from, to)
  return <OverviewCard title="Bonjours" count={count} />
}

definePlugin({
  overviewCards: [
    {
      id: 'said',
      size: 'narrow',
      component: SaidCard
    }
  ]
})
```

## Une carte

<!-- prettier-ignore -->
| Champ | Type | |
| --- | --- | --- |
| `id` | `string` | Lettres minuscules, chiffres et tirets, une seule fois par plugin. |
| `size` | `'narrow' \| 'wide' \| 'full'` | Sa largeur, voir plus bas. |
| `component` | `ComponentType<{ from, to }>` | Ce qu'elle affiche, dessiné avec `OverviewCard`. |

## Ce qu'elle reçoit

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `from` | `string` | Le premier jour de la période, compris, au format `AAAA-MM-JJ`. |
| `to` | `string` | Le dernier jour de la période, compris, au même format. |

## Sa largeur

<!-- prettier-ignore -->
| `size` | Ordinateur | Tablette | Téléphone |
| --- | --- | --- | --- |
| `narrow` | Un tiers | La moitié | Toute la largeur |
| `wide` | Deux tiers | La moitié | Toute la largeur |
| `full` | Toute la largeur | Toute la largeur | Toute la largeur |

## À savoir

- **Qui la voit** : l'admin du serveur seulement.
- **Ses données** : la carte les demande à une `serverRoute`, avec `from` et `to`.
- **Si elle plante** : Hodi affiche un message à sa place, et le reste du tableau de bord continue de marcher.
