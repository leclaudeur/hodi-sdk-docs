---
title: "Small elements"
description: "Chips, filters, a source's avatar and a household's."
intro: "Hodi's captions and metadata are in the mono font: so are its chips."
order: 6
icon: "tag"
topic: "sport"
preview: "chip"
---

## Chip

A small capsule: a language, a state, a duration.

```tsx title="web/index.tsx" render="chip"
import { Chip } from 'hodi:sdk'

<Chip>EN</Chip>
<Chip tone="success">Active</Chip>
<Chip tone="warning">Rarely opened</Chip>
<Chip tone="danger">Error</Chip>
<Chip tone="accent">This device</Chip>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `children` | `ReactNode` | Its text, short. |
| `tone?` | `'success' \| 'warning' \| 'danger' \| 'accent'` | Its colour. Neutral by default. |
| `size?` | `'capsule' \| 'row'` | `row` at the end of a settings row. |
| `title?` | `string` | What it means, on hover. |
| `label?` | `string` | A fuller name for screen readers. |

## FilterChip

A filter in a row: a pill, white when chosen.

```tsx title="web/index.tsx" render="filterchip"
import { FilterChip } from 'hodi:sdk'
import { Bell } from 'lucide-react'

<FilterChip selected={filter === 'all'} count={12} onClick={() => setFilter('all')}>All</FilterChip>
<FilterChip selected={filter === 'morning'} icon={Bell} onClick={() => setFilter('morning')}>Morning</FilterChip>
<FilterChip selected={filter === 'evening'} onClick={() => setFilter('evening')}>Evening</FilterChip>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `selected` | `boolean` | Chosen or not. |
| `children` | `ReactNode` | Its label. |
| `onClick?` | `() => void` | A filter of the page. |
| `href?` | `string` | Or a link to a page. |
| `count?` | `number` | How many it keeps, after the label. |
| `icon?` | `LucideIcon` | An icon before the label. |
| `disabled?` | `boolean` | Can't be chosen. |

## SourceAvatar

A source's icon, taken from its site, or its initials when it has none. Never round.

```tsx title="web/index.tsx" render="sourceavatar"
import { SourceAvatar } from 'hodi:sdk'

<SourceAvatar sourceId={article.sourceId} sourceName={article.sourceName} size={26} />
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `sourceId` | `string` | The source's id, as an article gives it. |
| `sourceName` | `string` | Its name, for the initials. |
| `size?` | `18 \| 20 \| 22 \| 26 \| 44` | Its size. 18 by default. |

## HouseholdAvatar

A household's photo, or its initial, round like a profile in "Who's in?".

```tsx title="web/index.tsx" render="householdavatar"
import { HouseholdAvatar } from 'hodi:sdk'

<HouseholdAvatar name={household.name} photo={household.photo} size={44} />
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `name` | `string` | The household's name, for the initial. |
| `photo` | `string \| null` | Its photo's address (`household.photo`), or null. |
| `size` | `number` | Its width, ring included. |
| `preview?` | `string \| null` | A photo chosen but not sent yet. |
