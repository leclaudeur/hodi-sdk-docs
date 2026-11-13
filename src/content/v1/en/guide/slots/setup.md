---
title: "setupSteps"
description: "Steps of the plugin in Hodi's setup, for what it must know from the very first start."
intro: "Steps of the plugin in Hodi's setup, the wizard that opens at the first start. They are for what the plugin must know from the beginning, such as the name of a public site."
order: 12
icon: "list-checks"
topic: "travel"
key: "setupSteps"
---

## Where in Hodi

Hodi's setup is the wizard that opens at the first start. The wizard goes through steps. One of these steps, "Plugins found", lists the plugins present and offers to turn them on. The steps of the plugins turned on come right after, before "The server is ready".

## Example

This step asks for the site's name, saves it, then goes to the next step with `next()`:

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
      <TextField
        aria-label="Site name"
        value={name}
        onChange={event => setName(event.target.value)}
      />
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

## A step's fields

`setupSteps` is a list. Each step of the list has four fields:

<!-- prettier-ignore -->
| Field | Type | |
| --- | --- | --- |
| `id` | `string` | Lowercase letters, digits and dashes. After a reload, the wizard comes back to this step. |
| `title` | `string` | The step's title, a key of the `locales`. |
| `intro` | `string` | The line under the title, a key of the `locales`. |
| `page` | `ComponentType<{ next, layout }>` | The step's content. |

## Props

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `next` | `() => void` | Goes to the next step, once the step's values are saved. |
| `layout` | `'desktop' \| 'phone'` | The screen size. |

## Who draws what

- **Hodi** draws the card, the title, the line under the title, the numbering and "Back".
- **The plugin** draws the middle, and ends with `SetupActions`, which shows "Continue".

## Good to know

- **Who sees the steps**: the admin, if the plugin is on at the "Plugins found" step.
- **A Hodi step**: `{ id: 'mail', core: 'mail' }` adds the form of _Server › E-mail_.
