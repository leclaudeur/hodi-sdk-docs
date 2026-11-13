---
title: "signInExtras"
description: "A button or a link of the plugin under the Sign in form, such as \"Create my household\"."
intro: "A component of the plugin under Hodi's Sign in form. It is for offering another way in: a \"Create my household\" link, a \"Continue with Google\" button…"
order: 6
icon: "log-in"
topic: "sport"
key: "signInExtras"
---

## Where in Hodi

On Hodi's Sign in screen, under the form, before the person has opened their profile.

At that moment, Hodi doesn't know the person's household yet. So Hodi only loads the plugins that have the `publicRoutes` permission, and only the `web/public.tsx` file of these plugins. The five sign-in slots are declared in this file: `signInExtras`, `signedOutPage`, `afterSignIn`, `whoIsReadingFooter` and `ageConsent`.

## Example

This button calls a public route of the plugin, which creates an account. Once the route has answered, the button calls `signedIn()`: Hodi restarts the app, with the person signed in.

```tsx title="web/public.tsx"
import { Button, definePlugin, usePluginPublicApi } from 'hodi:sdk'

const SignUp = ({ signedIn }) => {
  const publicApi = usePluginPublicApi()
  const join = async () => {
    const answer = await publicApi('/signup', { method: 'POST', body: JSON.stringify(form) })
    if (answer.ok) signedIn()
  }
  return <Button onClick={join}>Create my household</Button>
}

definePlugin({ signInExtras: SignUp })
```

## Props

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | The screen size. |
| `signedIn` | `() => void` | Restarts the app, signed in, after a route that answered `signIn`. |

## Signing the person in

The plugin never sets the session itself. With the `signIn` permission, the plugin's public route answers `signIn` with an account's id, and Hodi signs the device in to this account:

```tsx title="server/index.ts"
publicRoutes: {
  'POST /signup': async (request, ctx) => {
    const account = await ctx.accounts.create({ email: request.body.email, password: request.body.password })
    if (!account) return { status: 409 }
    return { status: 201, signIn: account.id }
  }
}
```

Hodi only accepts the id of an account this call has just created, or whose password this call has just checked. Never the server admin's id.

## Good to know

- **Refusing a sign-in**: `checkSignIn`, in the server part, at each sign-in.
- **The limits**: 30 requests per minute per address, none coming from another site.

`checkSignIn` answers `null` to let the person in, or a key of the plugin's `locales` to refuse the sign-in with this message.
