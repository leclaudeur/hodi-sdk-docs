---
title: "accountRows"
description: "Rows of the plugin at the end of the _Account_ card, in Settings › My account."
intro: "Rows the plugin adds at the end of the _Account_ card, in _Settings › My account_. They are for showing what the plugin knows about the account, such as a linked Google account."
order: 13
icon: "user-round"
topic: "world"
key: "accountRows"
---

## Where in Hodi

Each person has a _Settings › My account_ page. The _Account_ card of this page shows the account's e-mail and password. The plugin's `accountRows` rows join the end of this card.

## Example

```tsx title="web/index.tsx"
import { SettingRow, definePlugin } from 'hodi:sdk'

const GoogleRow = () => <SettingRow label="Google" value="anna@gmail.com" />

definePlugin({ accountRows: GoogleRow })
```

## Props

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | The screen size. |

## Good to know

- **How the rows are drawn**: with `SettingRow`s, like Hodi's rows in the same card.
- **Who sees the rows**: each person, on the page of their own account.
