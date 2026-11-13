---
title: "Setup"
description: "Steps of the plugin in Hodi's setup, for what it must know from the very first start."
intro: "Steps of the plugin in Hodi's setup, the wizard that opens at the first start. They are for what the plugin must know from the beginning, such as the name of a public site."
order: 8
icon: "list-checks"
topic: "travel"
key: "setupSteps"
---

## Where they show

Hodi's setup goes through steps. One of them, "Plugins found", lists the plugins present and lets the admin turn them on. The steps of the plugins turned on come right after, before "The server is ready".

## Example

```tsx title="web/index.tsx"
import { SetupActions, TextField, definePlugin } from 'hodi:sdk'

const Welcome = ({ next }) => {
  const [name, setName] = useState('')
  const save = async () => {
    await saveName(name)
    next()
  }
  return (
    <>
      <TextField aria-label="Site name" value={name} onChange={event => setName(event.target.value)} />
      <SetupActions onNext={save} />
    </>
  )
}

definePlugin({
  setupSteps: [
    {
      id: 'welcome',
      title: 'setup.title',
      intro: 'setup.intro',
      page: Welcome
    }
  ]
})
```

## A step

<!-- prettier-ignore -->
| Field | Type | |
| --- | --- | --- |
| `id` | `string` | Lowercase letters, digits and dashes. The setup comes back to it after a reload. |
| `title` | `string` | A key of its `locales`: the step's title. |
| `intro` | `string` | A key of its `locales`: the line under the title. |
| `page` | `ComponentType<{ next, layout }>` | The step's content. |

## What it receives

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `next` | `() => void` | Goes to the next step, once what's needed is saved. |
| `layout` | `'desktop' \| 'phone'` | The screen size. |

## Who draws what

- **Hodi** draws the card, the title, the line under the title, the numbering and "Back".
- **The plugin** draws the middle, and ends with `SetupActions`, which shows "Continue".

## Good to know

- **Who sees them**: only if the plugin was turned on at the "Plugins found" step.
- **A step of Hodi**: `{ id: 'mail', core: 'mail' }` puts the form of _Server › E-mail_ among the plugin's steps.
