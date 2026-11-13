---
title: "Petits éléments"
description: "Les puces, les filtres, l'avatar d'une source et celui d'un foyer."
intro: "Les petits éléments qui accompagnent une ligne ou un titre : une puce, un filtre, l'avatar d'une source ou d'un foyer. Comme les légendes et les métadonnées de Hodi, les puces sont écrites en police mono."
order: 6
icon: "tag"
topic: "sport"
preview: "chip"
---

## Chip

Une petite capsule de texte, pour une information courte comme une langue, un état ou une durée.

```tsx title="web/index.tsx" render="chip" play="chip"
import { Chip } from 'hodi:sdk'

<Chip tone="success">Actif</Chip>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `children` | `ReactNode` | Le texte de la puce, en quelques mots. |
| `tone?` | `'success' \| 'warning' \| 'danger' \| 'accent'` | La couleur de la puce : neutre par défaut, verte, jaune, rouge ou dans la couleur d'accent. |
| `size?` | `'capsule' \| 'row'` | La taille de la puce : `capsule` par défaut, `row` au bout d'une ligne de réglage. |
| `title?` | `string` | Ce que veut dire la puce, affiché au survol. |
| `label?` | `string` | Un nom plus complet que le texte, pour les lecteurs d'écran. |

## FilterChip

Un filtre dans une rangée de filtres. C'est une pilule, qui devient blanche quand elle est choisie.

```tsx title="web/index.tsx" render="filterchip" play="filterchip"
import { FilterChip } from 'hodi:sdk'

<FilterChip
  selected={filter === 'all'}
  count={12}
  onClick={() => setFilter('all')}
>
  Tout
</FilterChip>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `selected` | `boolean` | `true` quand le filtre est choisi. |
| `children` | `ReactNode` | Le texte du filtre. |
| `onClick?` | `() => void` | Ce que fait un clic, pour un filtre qui change la page sans la quitter. |
| `href?` | `string` | L'adresse à ouvrir, pour un filtre qui mène à une autre page. |
| `count?` | `number` | Le nombre d'éléments que le filtre garde, affiché après le texte. |
| `icon?` | `LucideIcon` | Une icône Lucide, affichée avant le texte. |
| `disabled?` | `boolean` | Le filtre est grisé et ne se choisit pas. |

## SourceAvatar

L'icône d'une source, prise sur son site, ou ses initiales quand le site n'en a pas. Elle n'est jamais ronde : le rond est réservé aux personnes et aux foyers.

```tsx title="web/index.tsx" render="sourceavatar" play="sourceavatar"
import { SourceAvatar } from 'hodi:sdk'

<SourceAvatar
  sourceId={article.sourceId}
  sourceName="Le Monde"
  size={44}
/>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `sourceId` | `string` | L'id de la source, tel qu'un article le donne. |
| `sourceName` | `string` | Le nom de la source, dont l'avatar prend les initiales quand il n'a pas d'icône. |
| `size?` | `18 \| 20 \| 22 \| 26 \| 44` | La taille de l'avatar, en px. Elle vaut 18 par défaut. |

## HouseholdAvatar

La photo d'un foyer, ou son initiale quand il n'a pas de photo. Elle est ronde, comme un profil sur l'écran _Qui lit ?_.

```tsx title="web/index.tsx" render="householdavatar" play="householdavatar"
import { HouseholdAvatar } from 'hodi:sdk'

<HouseholdAvatar
  name="Dupont"
  photo={household.photo}
  size={64}
/>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `name` | `string` | Le nom du foyer, dont l'avatar prend l'initiale quand il n'a pas de photo. |
| `photo` | `string \| null` | L'adresse de la photo du foyer (`household.photo`), ou `null`. |
| `size` | `number` | La largeur de l'avatar, en px, anneau compris. |
| `preview?` | `string \| null` | Une photo que la personne vient de choisir mais n'a pas encore envoyée. Elle s'affiche à la place de `photo`. |
