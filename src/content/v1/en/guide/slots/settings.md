---
title: "Settings"
description: "An entry in Settings for the plugin alone, with its own page, for what each profile of the household sets or looks up itself."
intro: "An entry in Settings for the plugin alone, with its own page. It is for what each profile of the household sets or looks up itself: its notes, its statistics, its preferences for the plugin…"
order: 2
icon: "settings"
topic: "world"
key: "page"
---

## Where it shows

Settings lists its entries in six groups. The plugin adds an entry there, which opens its page. Two files take part:

- `plugin.json` says **where** to put the entry, with `menu`;
- `web/index.tsx` says **what** the page shows, with `page`.

## Placing the entry

```json title="plugin.json"
"menu": {
  "group": "you",
  "after": "stats"
}
```

`group` is the Settings group, and `after` the entry the plugin goes after. Without `menu`, or with an unknown group, the entry goes at the end of the Household group.

<!-- prettier-ignore -->
| `group` | The group in Settings |
| --- | --- |
| `reading` | Reading |
| `subjects` | Subjects |
| `you` | You |
| `household` | Household |
| `device` | This device |
| `about` | Hodi |

## Example

```tsx title="web/index.tsx"
import { SectionPage, SettingRow, SettingsCard, definePlugin } from 'hodi:sdk'
import { NotebookPen } from 'lucide-react'

const NotesPage = ({ layout }) => (
  <SectionPage title="My notes" intro="The notes taken while reading." layout={layout}>
    <SettingsCard>
      <SettingRow label="Saved notes" value="12" />
    </SettingsCard>
  </SectionPage>
)

definePlugin({
  page: NotesPage,
  menuIcon: NotebookPen
})
```

## What it receives

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | The screen size. To pass as it is to `SectionPage`, which draws the page like Hodi's own. |

## The other keys

<!-- prettier-ignore -->
| `definePlugin` key | Type | |
| --- | --- | --- |
| `page` | `ComponentType<{ layout }>` | The page itself. Without it, Settings has no entry for the plugin. |
| `menuIcon?` | `ComponentType` | The entry's icon, an 18 px Lucide icon. A puzzle piece without it. |
| `menuHint?` | `ComponentType` | The line under the entry's name, such as "12 notes". The plugin's description without it. |

## Good to know

- **Who sees it**: the profiles in `audience`, as for its routes.
- **Its title**: the plugin gives it, with `SectionPage`. Hodi adds nothing around it.
- **If it crashes**: Hodi shows a message in its place, and the rest of Settings keeps working.
