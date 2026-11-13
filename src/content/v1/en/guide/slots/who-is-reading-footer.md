---
title: "whoIsReadingFooter"
description: "A button of the plugin next to _Manage profiles_, under the profiles of _Who's in?_."
intro: "A component of the plugin under the profiles of the _Who's in?_ screen, next to the _Manage profiles_ button. It is for an action on the whole household, such as _Switch household_."
order: 9
icon: "users"
topic: "sport"
key: "whoIsReadingFooter"
---

## Where in Hodi

The _Who's in?_ screen opens when Hodi starts: each profile of the household has its tile there, and the _Manage profiles_ button sits under the tiles. The `whoIsReadingFooter` component shows next to this button, at the same height.

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

- **How it is drawn**: a `Button`, at the height of _Manage profiles_.
- **Several plugins**: each plugin adds its component, in the order of the plugins.
