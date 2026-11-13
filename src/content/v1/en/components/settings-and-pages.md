---
title: "Settings and pages"
description: "A settings page, its cards, its rows, the end of a long list and the Overview cards."
intro: "The pages of the [`page`](/en/guide/slots/settings/) and [`serverSections`](/en/guide/slots/server/) slots are built with these components."
order: 2
icon: "settings"
topic: "world"
preview: "settingrow"
---

## SectionPage

A settings page: its title, the line that explains it, then its cards. On a phone, the title moves into Hodi's header. It gets `layout` from the slot that draws it.

```tsx title="web/index.tsx" render="sectionpage" play="sectionpage"
import { SectionPage, SettingRow, SettingsCard } from 'hodi:sdk'
import { Pencil } from 'lucide-react'

<SectionPage
  title="Hello world"
  intro="A greeting, every time you open Hodi."
  layout="desktop"
>
  <SettingsCard>
    <SettingRow
      label="Greeting"
      value="Hi"
      action={{
        label: 'Change',
        icon: Pencil,
        onClick: edit
      }}
    />
  </SettingsCard>
</SectionPage>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `title` | `string` | The page's title. |
| `layout` | `'desktop' \| 'phone'` | The one the slot gives your page. |
| `intro?` | `ReactNode` | What the page does, under its title. |
| `aside?` | `ReactNode` | Next to the title, or under it on a phone. |
| `children` | `ReactNode` | Its cards, `SettingsCard`s. |

## SettingsCard

A group of rows: its name in small capitals, then its rows in a card.

```tsx title="web/index.tsx" render="settingscard" play="settingscard"
import { SettingRow, SettingsCard } from 'hodi:sdk'
import { Pencil } from 'lucide-react'

<SettingsCard label="Greeting">
  <SettingRow
    label="Text"
    value="Hi"
    action={{
      label: 'Change',
      icon: Pencil,
      onClick: edit
    }}
  />
</SettingsCard>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `label?` | `string` | The group's name, above the card. |
| `children` | `ReactNode` | Its rows, `SettingRow`s. |

## SettingRow

A settings row. Under its name, a 14 px line: its value, or failing that a short hint, never both. Its action is a button with a label, which becomes a 38 px round button on a phone. A choice (`Segmented`) moves under the text on a phone.

```tsx title="web/index.tsx" render="settingrow" play="settingrow"
import { SettingRow, SettingsCard } from 'hodi:sdk'
import { Pencil } from 'lucide-react'

<SettingsCard>
  <SettingRow
    label="Text"
    value="Hi"
    action={{
      label: 'Change',
      icon: Pencil,
      onClick: edit
    }}
  />
</SettingsCard>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `label` | `ReactNode` | The setting's name. |
| `value?` | `ReactNode` | Its value. A row with a value has no hint: the explanation goes in the window that changes it. |
| `hint?` | `ReactNode` | What it does, in grey, on one line. |
| `lead?` | `ReactNode` | A mark before the text: an avatar, a star. |
| `action?` | `RowAction \| RowAction[]` | A button at the end, or two side by side. `RowAction`: `label`, `icon`, `look`, `onClick` or `href`, `disabled`, `busy`, `ariaLabel`. |
| `choice?` | `ReactNode` | A `Segmented`: at the end, or under the text on a phone. |
| `as?` | `'div' \| 'li'` | `li` in a list. `div` by default. |
| `children?` | `ReactNode` | At the end, before the action, and in the same place on a phone: a `Toggle`, a `Chip`, small round buttons. |

## MoreRow

The last row of a list that only shows its first items: a click opens the rest.

```tsx title="web/index.tsx" render="morerow" play="morerow"
import { MoreRow, SettingRow, SettingsCard } from 'hodi:sdk'

<SettingsCard>
  <SettingRow label="Anna" value="Hi!" />
  <MoreRow label="See the 4 others" onClick={showAll} />
</SettingsCard>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `label` | `string` | "See the 4 others", in your plugin's words. |
| `onClick` | `() => void` | Shows the rest. |

## OverviewCard

A card of [`overviewCards`](/en/guide/slots/overview/): its title, a number, a chip at the end, then your content.

```tsx title="web/index.tsx" render="overviewcard" play="overviewcard"
import { Chip, OverviewCard } from 'hodi:sdk'
import WeekChart from './WeekChart.tsx'

<OverviewCard
  title="Hellos"
  count={128}
  aside={<Chip tone="success">+12 this week</Chip>}
>
  <WeekChart days={week} />
</OverviewCard>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `title` | `string` | Its title, already translated. |
| `count?` | `number` | A number next to the title, in grey. |
| `aside?` | `ReactNode` | At the end of the title's line: a `Chip`, a caption. |
| `children?` | `ReactNode` | The card's content. |
