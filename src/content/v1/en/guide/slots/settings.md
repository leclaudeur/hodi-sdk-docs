---
title: "page"
description: "A page of the plugin in Settings, for what each profile of the household sets or looks up itself."
intro: "A plugin can add its own entry to Hodi's Settings page. This entry opens a page the plugin draws itself. The plugin puts there what each profile of the household sets or looks up for itself: its notes, its statistics, its preferences for the plugin."
order: 2
icon: "settings"
topic: "world"
key: "page"
---

## Where in Hodi

In Hodi, each profile has its Settings page. The Settings page lists entries, sorted in six groups: Reading, Subjects, You, Household, This device and Hodi. Each entry opens a page.

A plugin can add its own entry to this list. The plugin's entry bears the plugin's name. A click on the plugin's entry opens the plugin's page, which the plugin draws itself.

Two files of the plugin take part in this entry and this page:

- `plugin.json` says **where** to put the plugin's entry, with the `menu` field.
- `web/index.tsx` says **what** the plugin's page shows, with the `page` key of `definePlugin`.

## Placing the entry

The plugin's entry goes in one of the six groups of the Settings page. The `menu` field of `plugin.json` picks this group, with `group`. The `menu` field can also pick, with `after`, the Hodi entry the plugin's entry goes after.

```json title="plugin.json"
"menu": {
  "group": "you",
  "after": "stats"
}
```

With this example, the plugin's entry goes in the "You" group, right after the "Statistics" entry.

Without `after`, the plugin's entry goes at the end of its group. Without `menu`, or with a group Hodi doesn't know, the plugin's entry goes at the end of the "Household" group.

Here are the six possible values of `group`. For each value, the group's name in the Settings page, and the Hodi entries this group already holds, with the value to give `after` to put the plugin's entry after one of them:

<!-- prettier-ignore -->
| Value of `group` | The group and its entries |
| --- | --- |
| `reading` | The "Reading" group. This group holds Reading and display (`reading`), Topics (`themes`), Sources (`sources`) and History (`history`). |
| `subjects` | The "Subjects" group. This group holds Followed subjects (`followed`) and Muted subjects (`muted`). |
| `you` | The "You" group. This group holds My profile (`me`), Statistics (`stats`), Account and data (`account`) and Sharing (`sharing`). |
| `household` | The "Household" group. This group holds Household (`household`), Profiles (`profiles`) and AI & credits (`ai`). It is the default group. |
| `device` | The "This device" group. This group holds Notifications (`notifications`) and Keyboard shortcuts (`shortcuts`). |
| `about` | The "Hodi" group. This group holds Server (`server`) and About (`about`). |

## Drawing the page

The plugin's page is a React component, written in the plugin's web part (`web/index.tsx`). The plugin gives this component to Hodi with the `page` key of `definePlugin`. Without the `page` key, the Settings page shows no entry for the plugin, even with a `menu` field in `plugin.json`.

So that the plugin's page looks like Hodi's pages, the plugin's page is built with the same components as Hodi:

- `SectionPage` draws the page, with its title and its intro line.
- `SettingsCard` draws a card, in the page.
- `SettingRow` draws a row, in a card.

```tsx title="web/index.tsx"
import { SectionPage, SettingRow, SettingsCard, definePlugin } from 'hodi:sdk'
import { NotebookPen } from 'lucide-react'

const NotesPage = ({ layout }) => (
  <SectionPage
    title="My notes"
    intro="The notes taken while reading."
    layout={layout}
  >
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

With this example, the Settings page shows an entry for the plugin, with a notebook icon. A click on this entry opens the "My notes" page. The "My notes" page holds a card, and this card holds a "Saved notes: 12" row.

## Props

Hodi gives a single prop to the component of the plugin's page: `layout`.

On a computer, the Settings page shows in columns: the list of entries on the left, the open page on the right. On a tablet or a phone, the Settings page shows page by page. The `layout` prop says which of these two cases the plugin's page is in.

The page's component has nothing to do with `layout` itself: passing `layout` as it is to `SectionPage` is enough, and `SectionPage` takes care of the layout.

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | `'desktop'` when the Settings page shows in columns, `'phone'` when it shows page by page. To pass as it is to `SectionPage`. |

## Icon and grey line

In the list of the Settings page, each entry has an icon left of its name, and a grey line under its name. The name of the plugin's entry is always the plugin's name. The icon and the grey line of the plugin's entry are chosen with two other keys of `definePlugin`, both optional.

Here are the three keys of `definePlugin` used for the Settings page:

<!-- prettier-ignore -->
| Key of `definePlugin` | Type | |
| --- | --- | --- |
| `page` | `ComponentType<{ layout }>` | The component of the plugin's page, described above. Without this key, the Settings page has no entry for the plugin. |
| `menuIcon?` | `ComponentType` | The icon left of the entry's name, a Lucide icon. Without this key, Hodi shows a puzzle piece. |
| `menuHint?` | `ComponentType` | The grey line under the entry's name, for example "12 notes". Without this key, Hodi shows the plugin's description. |

`menuHint` is a component, not a plain text: the `menuHint` component can therefore read data, for example the number of notes, and show this number.

## Good to know

- **Who sees the plugin's entry**: the profiles allowed by `audience` in `plugin.json`.
- **With `audience: "admin"`**: only the household's admin sees the plugin's entry and page.
- **The title of the plugin's page**: the plugin gives it, with `SectionPage`.
- **If the plugin's page crashes**: Hodi shows a message in place of this page.
