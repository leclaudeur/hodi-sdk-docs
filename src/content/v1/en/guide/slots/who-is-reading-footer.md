---
title: "whoIsReadingFooter"
description: "A button of the plugin next to \"Manage profiles\", under the profiles of \"Who's in?\"."
intro: "A component of the plugin under the profiles of the \"Who's in?\" screen, next to the \"Manage profiles\" button. It is for an action on the whole household, such as \"Switch household\"."
order: 9
icon: "users"
topic: "sport"
key: "whoIsReadingFooter"
---

## Where in Hodi

The "Who's in?" screen opens when Hodi starts: each profile of the household has its tile there, and the "Manage profiles" button sits under the tiles. The `whoIsReadingFooter` component shows next to this button, at the same height.

## Example

```tsx title="web/public.tsx"
import { Button, definePlugin } from 'hodi:sdk'

const SwitchHousehold = () => (
  <Button onClick={() => (window.location.hash = '#/plugin/village/households')}>Switch household</Button>
)

definePlugin({ whoIsReadingFooter: SwitchHousehold })
```

## Props

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | The screen size. |

## Good to know

- **How it is drawn**: a `Button`, at the height of "Manage profiles".
- **Several plugins**: each plugin adds its component, in the order of the plugins.
