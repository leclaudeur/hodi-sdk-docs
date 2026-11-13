---
title: "Settings and pages"
description: "A settings page, its cards, its rows, the end of a long list and the Overview cards."
intro: "These components build a settings page, such as those of the [`page`](/en/guide/slots/settings/) and [`serverSections`](/en/guide/slots/server/) slots, and the cards of [`overviewCards`](/en/guide/slots/overview/). A page made with them looks like Hodi's own pages."
order: 2
icon: "settings"
topic: "world"
preview: "settingrow"
---

## SectionPage

A whole settings page: its title, the sentence that explains it, then its cards. On a phone, the title moves into Hodi's header. The page receives `layout` from the slot that draws it, and passes it to `SectionPage`.

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
| `title` | `string` | The page's title, already translated. |
| `layout` | `'desktop' \| 'phone'` | The screen's size, as the slot gives it to the page. |
| `intro?` | `ReactNode` | A sentence under the title, which says what the page is for. |
| `aside?` | `ReactNode` | An element next to the title, or under the title on a phone. |
| `children` | `ReactNode` | The page's cards, `SettingsCard`s. |

## SettingsCard

A card that groups settings rows. Its name shows in small capitals above the card.

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
| `label?` | `string` | The group's name, shown above the card. |
| `children` | `ReactNode` | The card's rows, `SettingRow`s. |

## SettingRow

A settings row. Under its name, a 14 px line shows its value, or failing that a short hint, never both. Its action is a button with a text at the end of the row; on a phone, this button becomes a 38 px round button with the same icon. A choice (`Segmented`) moves under the text on a phone.

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
| `value?` | `ReactNode` | The setting's value, in the text colour. A row with a value has no hint: the explanation goes in the window that changes the value. |
| `hint?` | `ReactNode` | A short hint, in grey, on a single line, when the row has no value. |
| `lead?` | `ReactNode` | An element before the text, such as an avatar or an icon. |
| `action?` | `RowAction \| RowAction[]` | A button at the end of the row, or two side by side. A `RowAction` has a `label`, an `icon`, a `look`, an `onClick` or an `href`, and can be `disabled` or `busy`. `ariaLabel` gives screen readers a fuller name. |
| `choice?` | `ReactNode` | A `Segmented`, at the end of the row, or under the text on a phone. |
| `as?` | `'div' \| 'li'` | The row's tag: `div` by default, `li` when the rows form a list. |
| `children?` | `ReactNode` | Elements at the end of the row, before the action, which stay in the same place on a phone: a `Toggle`, a `Chip` or small round buttons. |

## MoreRow

The last row of a long list, when the list only shows its first items. A click on this row shows the rest.

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
| `label` | `string` | The row's text, such as "See the 4 others", in the plugin's words. |
| `onClick` | `() => void` | What the click does: show the rest of the list. |

## OverviewCard

A card of [`overviewCards`](/en/guide/slots/overview/), in _Server › Overview_. Its title line shows a title, a number and a chip at the end. The plugin puts what it wants under it, such as a chart.

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
| `title` | `string` | The card's title, already translated. |
| `count?` | `number` | A number shown in grey next to the title. |
| `aside?` | `ReactNode` | An element at the end of the title's line, such as a `Chip` or a caption. |
| `children?` | `ReactNode` | The card's content, under the title line. |
