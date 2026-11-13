---
title: "Small elements"
description: "Chips, filters, a source's avatar and a household's."
intro: "The small elements that go with a row or a title: a chip, a filter, a source's or a household's avatar. Like Hodi's captions and metadata, chips are written in the mono font."
order: 6
icon: "tag"
topic: "sport"
preview: "chip"
---

## Chip

A small capsule of text, for a short piece of information such as a language, a state or a duration.

```tsx title="web/index.tsx" render="chip" play="chip"
import { Chip } from 'hodi:sdk'

<Chip tone="success">Active</Chip>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `children` | `ReactNode` | The chip's text, in a few words. |
| `tone?` | `'success' \| 'warning' \| 'danger' \| 'accent'` | The chip's colour: neutral by default, green, yellow, red or in the accent colour. |
| `size?` | `'capsule' \| 'row'` | The chip's size: `capsule` by default, `row` at the end of a settings row. |
| `title?` | `string` | What the chip means, shown on hover. |
| `label?` | `string` | A fuller name than the text, for screen readers. |

## FilterChip

A filter in a row of filters. It is a pill, which turns white when chosen.

```tsx title="web/index.tsx" render="filterchip" play="filterchip"
import { FilterChip } from 'hodi:sdk'

<FilterChip
  selected={filter === 'all'}
  count={12}
  onClick={() => setFilter('all')}
>
  All
</FilterChip>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `selected` | `boolean` | `true` when the filter is chosen. |
| `children` | `ReactNode` | The filter's text. |
| `onClick?` | `() => void` | What a click does, for a filter that changes the page without leaving it. |
| `href?` | `string` | The address to open, for a filter that leads to another page. |
| `count?` | `number` | The number of items the filter keeps, shown after the text. |
| `icon?` | `LucideIcon` | A Lucide icon, shown before the text. |
| `disabled?` | `boolean` | The filter is greyed out and can't be chosen. |

## SourceAvatar

A source's icon, taken from its site, or its initials when the site has none. It is never round: round is kept for people and households.

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
| `sourceId` | `string` | The source's id, as an article gives it. |
| `sourceName` | `string` | The source's name, whose initials the avatar takes when it has no icon. |
| `size?` | `18 \| 20 \| 22 \| 26 \| 44` | The avatar's size, in px. It is 18 by default. |

## HouseholdAvatar

A household's photo, or its initial when it has no photo. It is round, like a profile on the "Who's in?" screen.

```tsx title="web/index.tsx" render="householdavatar" play="householdavatar"
import { HouseholdAvatar } from 'hodi:sdk'

<HouseholdAvatar
  name="Smith"
  photo={household.photo}
  size={64}
/>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `name` | `string` | The household's name, whose initial the avatar takes when it has no photo. |
| `photo` | `string \| null` | The address of the household's photo (`household.photo`), or `null`. |
| `size` | `number` | The avatar's width, in px, ring included. |
| `preview?` | `string \| null` | A photo the person just chose but hasn't sent yet. It shows in place of `photo`. |
