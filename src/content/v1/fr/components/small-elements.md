---
title: "Petits éléments"
description: "Les puces, les filtres, l'avatar d'une source et celui d'un foyer."
intro: "Les légendes et les métadonnées de Hodi sont en police mono : les puces aussi."
order: 6
icon: "tag"
topic: "sport"
preview: "chip"
---

## Chip

Une petite capsule : une langue, un état, une durée.

```tsx title="web/index.tsx" render="chip" play="chip"
import { Chip } from 'hodi:sdk'

<Chip tone="success">Actif</Chip>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `children` | `ReactNode` | Son texte, court. |
| `tone?` | `'success' \| 'warning' \| 'danger' \| 'accent'` | Sa couleur. Neutre par défaut. |
| `size?` | `'capsule' \| 'row'` | `row` au bout d'une ligne de réglage. |
| `title?` | `string` | Ce qu'elle veut dire, au survol. |
| `label?` | `string` | Un nom plus complet pour les lecteurs d'écran. |

## FilterChip

Un filtre d'une rangée : une pilule, blanche quand elle est choisie.

```tsx title="web/index.tsx" render="filterchip" play="filterchip"
import { FilterChip } from 'hodi:sdk'

<FilterChip selected={filter === 'all'} count={12} onClick={() => setFilter('all')}>Tout</FilterChip>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `selected` | `boolean` | Choisi ou non. |
| `children` | `ReactNode` | Son libellé. |
| `onClick?` | `() => void` | Un filtre de la page. |
| `href?` | `string` | Ou un lien vers une page. |
| `count?` | `number` | Combien il en garde, après le libellé. |
| `icon?` | `LucideIcon` | Une icône avant le libellé. |
| `disabled?` | `boolean` | Ne se choisit pas. |

## SourceAvatar

L'icône d'une source, prise sur son site, ou ses initiales quand elle n'en a pas. Jamais ronde.

```tsx title="web/index.tsx" render="sourceavatar" play="sourceavatar"
import { SourceAvatar } from 'hodi:sdk'

<SourceAvatar sourceId={article.sourceId} sourceName="Le Monde" size={44} />
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `sourceId` | `string` | L'id de la source, comme le donne un article. |
| `sourceName` | `string` | Son nom, pour les initiales. |
| `size?` | `18 \| 20 \| 22 \| 26 \| 44` | Sa taille. Par défaut 18. |

## HouseholdAvatar

La photo d'un foyer, ou son initiale, ronde comme un profil de « Qui lit ? ».

```tsx title="web/index.tsx" render="householdavatar" play="householdavatar"
import { HouseholdAvatar } from 'hodi:sdk'

<HouseholdAvatar name="Dupont" photo={household.photo} size={64} />
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `name` | `string` | Le nom du foyer, pour l'initiale. |
| `photo` | `string \| null` | L'adresse de sa photo (`household.photo`), ou null. |
| `size` | `number` | Sa largeur, anneau compris. |
| `preview?` | `string \| null` | Une photo choisie mais pas encore envoyée. |
