---
title: "afterSignIn"
description: "A step of the plugin right after signing in, before entering the app, such as \"Which household?\"."
intro: "A step the plugin draws right after signing in, before \"Who's reading?\" and before the app. It is for asking one thing before entering: choosing a household, accepting new terms…"
order: 8
icon: "house"
topic: "sport"
key: "afterSignIn"
---

## Where `afterSignIn` shows

Right after someone signs in, before the "Who's reading?" screen and before the app. The person only sees this step once per sign-in.

If several plugins give an `afterSignIn`, Hodi shows the first one's. The server admin who has no household never sees this step: they go straight to the Server space.

## A "Which household?" step

This step lists the person's households. A click on a household calls a route of the plugin, then `done()` lets the person into the app.

```tsx title="web/public.tsx"
import { Button, StepPage, definePlugin, usePluginPublicApi } from 'hodi:sdk'

const WhichHousehold = ({ done }) => {
  const publicApi = usePluginPublicApi()
  const pick = async (id) => {
    await publicApi('/household', { method: 'POST', body: JSON.stringify({ id }) })
    done()
  }
  return (
    <StepPage title="Which household?">
      <Button onClick={() => pick('smith')}>The Smiths</Button>
    </StepPage>
  )
}

definePlugin({ afterSignIn: WhichHousehold })
```

## What Hodi gives the component of `afterSignIn`

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | The screen size. |
| `done` | `() => void` | Ends the step: the person enters the app. |

## Good to know about `afterSignIn`

- **If the plugin's step crashes**: Hodi offers to go in anyway, the person is never stuck.
- **A page reload**: the person comes back to the step, as long as `done()` wasn't called.
