---
title: "signedOutPage"
description: "A page of the plugin in place of Sign in, on a device that isn't linked to any household yet."
intro: "A page the plugin draws in place of Hodi's Sign in screen. It is for welcoming someone who has no household yet: a home page, a presentation of the service…"
order: 7
icon: "door-open"
topic: "sport"
key: "signedOutPage"
---

## Where in Hodi

On a device that isn't linked to any household yet, Hodi usually opens its Sign in screen. With `signedOutPage`, Hodi opens the plugin's page instead.

At that moment, Hodi only loads the plugins that have the `publicRoutes` permission, and only their `web/public.tsx` file. If several plugins give a `signedOutPage`, Hodi shows the first one's.

Hodi's Sign in screen always stays reachable: a code's link, a new password's link and the `#/sign-in` address always open Hodi's Sign in.

## Example

This page presents the service and offers two buttons: "Sign in", which opens Hodi's Sign in, and "Create my household", which calls a public route of the plugin.

```tsx title="web/public.tsx"
import { Button, definePlugin } from 'hodi:sdk'

const Welcome = ({ showSignIn }) => (
  <main className="village-welcome">
    <h1>Hodi, the news for the whole family</h1>
    <Button onClick={showSignIn}>Sign in</Button>
    <Button look="primary" onClick={() => (window.location.hash = '#/plugin/village/join')}>
      Create my household
    </Button>
  </main>
)

definePlugin({ signedOutPage: Welcome })
```

## Props

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | The screen size. |
| `showSignIn` | `() => void` | Opens Hodi's Sign in screen. |
| `signedIn` | `() => void` | Restarts the app, signed in, after a route that answered `signIn`. |

## Good to know

- **If the plugin's page crashes**: Hodi shows its own Sign in, never a blank screen.
- **Signing someone in**: the public route answers `signIn`, see [`signInExtras`](/en/guide/slots/sign-in/).
