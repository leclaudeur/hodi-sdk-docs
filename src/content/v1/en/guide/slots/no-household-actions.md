---
title: "noHouseholdActions"
description: "Another way on for an account that has no household any more, such as _Create my household_."
intro: "A component of the plugin on the card of an account that has no household any more. It offers a next step, such as creating a new household, instead of an invitation code."
order: 7
icon: "house-plus"
topic: "sport"
key: "noHouseholdActions"
---

## Where in Hodi

An account belongs to one household. When the person leaves their household, or when the household's admin deletes their profile, the account stays: at sign-in, Hodi then shows a card that says so, with _Sign out_ and _My account_. The `noHouseholdActions` component shows under the text of this card.

As for Sign in, Hodi then only loads the plugins that have the `publicRoutes` permission, and only their `web/public.tsx` file. `noHouseholdActions` is declared in this file.

## Example

This button calls a route of the plugin open to accounts with no household, which creates the household. Once the route has answered, the button calls `done()`: Hodi restarts the app, in the new household.

```tsx title="web/public.tsx"
import { Button, definePlugin, usePluginApi } from 'hodi:sdk'

const CreateHousehold = ({ done }) => {
  const api = usePluginApi()
  const create = async () => {
    const answer = await api('/my-household', {
      method: 'POST',
      body: JSON.stringify(form)
    })
    if (answer.ok) done()
  }
  return <Button onClick={create}>Create my household</Button>
}

definePlugin({ noHouseholdActions: CreateHousehold })
```

The route is declared in `routes` with `noHousehold: true`: [Routes](/en/guide/server-context/#a-route-for-an-account-with-no-household) explains it.

## Props

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | The screen's size. |
| `done` | `() => void` | Restarts Hodi, once the account has a household again. |

## Good to know

- **The routes it calls**: only those of `routes` marked `noHousehold: true`. Every other route answers this account 423 `no_household`.
- **Who sees the component**: only a signed-in account that has no household.
