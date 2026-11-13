---
title: "Sign-in"
description: "The screens around signing in: another way in, a sign-up, a step right after it."
intro: "The screens around signing in: another way in, a sign-up, a page in place of Sign in, or a step right after it. They are the only slots someone sees before opening their profile."
order: 6
icon: "log-in"
topic: "sport"
key: "signInExtras"
---

## Before signing in

Before someone has opened their profile, Hodi doesn't know their household yet. So it only loads the plugins that have the `publicRoutes` permission, and only their `web/public.tsx` file. That file fills the slots of this page, and calls the plugin's public routes.

## The slots

<!-- prettier-ignore -->
| `definePlugin` key | Where the screen shows |
| --- | --- |
| `signInExtras` | Under the Sign in form. For example, a "Create my household" link. |
| `signedOutPage` | In place of Sign in, on a device that has no household yet. For example, a home page. |
| `afterSignIn` | A step right after signing in, before entering the app. For example, "Which household?". |
| `whoIsReadingFooter` | Next to "Manage profiles", under "Who's in?". For example, "Switch household". |
| `ageConsent` | After the "I am at least 13 years old" box. For example, "and I accept the terms". |

## Example

This button, under Sign in, creates an account with a public route, then signs the person in:

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

## What they receive

<!-- prettier-ignore -->
| Slot | Props | |
| --- | --- | --- |
| `signInExtras` | `layout`, `signedIn()` | `signedIn()` restarts the app, signed in, after a route that answered `signIn`. |
| `signedOutPage` | `layout`, `showSignIn()`, `signedIn()` | `showSignIn()` opens Sign in. |
| `afterSignIn` | `layout`, `done()` | `done()` lets the person into the app. |
| `whoIsReadingFooter` | `layout` | |

## Signing someone in

The plugin never sets the session itself. With the `signIn` permission, its public route answers `signIn` with an account's id, and Hodi signs the device in:

```tsx title="server/index.ts"
publicRoutes: {
  'POST /signup': async (request, ctx) => {
    const account = await ctx.accounts.create({ email: request.body.email, password: request.body.password })
    if (!account) return { status: 409 }
    return { status: 201, signIn: account.id }
  }
}
```

Hodi only accepts the id of an account this call has just created, or whose password it has just checked. Never the server admin's.

## Good to know

- **Refusing a sign-in**: `checkSignIn`, on the server, at each sign-in.
- **The limits**: 30 requests a minute per address, none from another site.

`checkSignIn` answers `null` to let the person in, or a key of its `locales` to refuse with that message.
