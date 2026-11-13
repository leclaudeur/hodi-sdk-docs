---
title: "overviewCards"
description: "Une carte du plugin dans le tableau de bord du serveur, avec un chiffre ou un graphique sur la période choisie."
intro: "Une carte du plugin dans _Serveur › Vue d'ensemble_, le tableau de bord du serveur. Elle montre un chiffre ou un graphique du plugin sur la période que l'admin a choisie."
order: 4
icon: "layout-dashboard"
topic: "ai"
key: "overviewCards"
---

## Où s'affiche `overviewCards`

_Serveur › Vue d'ensemble_ est le tableau de bord du serveur. En haut de cette page, l'admin du serveur choisit une période : 7 jours, 30 jours… Chaque carte de la page montre un chiffre ou un graphique sur cette période. Les cartes des plugins viennent après les cartes « En ligne » et « Profils » de Hodi, dans l'ordre des plugins.

## Une carte « Bonjours »

Cette carte montre combien de bonjours le plugin a dits pendant la période choisie :

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

## Les champs d'une carte de `overviewCards`

`overviewCards` est une liste. Chaque carte de la liste a trois champs :

<!-- prettier-ignore -->
| Champ | Type | |
| --- | --- | --- |
| `id` | `string` | Lettres minuscules, chiffres et tirets, une seule fois par plugin. |
| `size` | `'narrow' \| 'wide' \| 'full'` | La largeur de la carte, voir plus bas. |
| `component` | `ComponentType<{ from, to }>` | Le contenu de la carte, dessiné avec `OverviewCard`. |

## Ce que Hodi donne au composant de la carte

Hodi donne au composant la période que l'admin a choisie :

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `from` | `string` | Le premier jour de la période, compris, au format `AAAA-MM-JJ`. |
| `to` | `string` | Le dernier jour de la période, compris, au même format. |

## La largeur d'une carte : `size`

<!-- prettier-ignore -->
| Valeur de `size` | La largeur de la carte |
| --- | --- |
| `narrow` | Un tiers de la largeur sur ordinateur, la moitié sur tablette, toute la largeur sur téléphone. |
| `wide` | Deux tiers de la largeur sur ordinateur, la moitié sur tablette, toute la largeur sur téléphone. |
| `full` | Toute la largeur, sur ordinateur, tablette et téléphone. |

## À savoir sur `overviewCards`

- **Qui voit les cartes** : l'admin du serveur seulement.
- **Les données d'une carte** : une `serverRoute`, appelée avec `from` et `to`.
- **Si une carte plante** : Hodi affiche un message à la place de cette carte.
