---
title: "Functions"
description: "The functions of `hodi:sdk` that code calls: the question before deleting and the toasts."
intro: "The plugin's code calls these functions, after a click for example. They show one of Hodi's windows or toasts: the plugin doesn't draw them itself, so they look the same as everywhere else in the app."
order: 3
icon: "square-function"
---

## askToConfirm()

This function opens Hodi's window that asks a question before an action that can't be undone, such as clearing a history. The person confirms with a red button, or cancels.

With `proof`, the window also asks for the person's password. `onConfirm` then receives a proof, which the web part passes to a route marked `proof: true` with `api(path, { proof })`. Hodi checks the password before running the route.

```tsx title="web/index.tsx" render="asktoconfirm" kind="modal" play="asktoconfirm"
import { askToConfirm, usePluginApi } from 'hodi:sdk'

const api = usePluginApi()
askToConfirm({
  title: 'Clear the history?',
  message: 'The last 30 hellos of this household will be deleted.',
  label: 'Clear',
  onConfirm: () => api('/history', { method: 'DELETE' })
})
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `title` | `string` | The question asked, such as _Clear the history?_. |
| `message` | `ReactNode` | What will happen, in full: what will be erased, for whom, and what will remain. |
| `label` | `string` | The text of the button that confirms, a verb such as _Clear_ or _Delete_. |
| `onConfirm` | `(proof: Proof) => void \| Promise<void>` | What the click on that button does. With `proof`, it receives the password and code typed. If the promise fails, the window stays open. |
| `look?` | `'danger' \| 'primary'` | The button's colour: red by default, `primary` for an action that adds instead of erasing. |
| `proof?` | `{}` | Asks for the person's password, and their app's code when they use two-step verification. |
| `onCancel?` | `() => void` | What happens when the person closes the window without confirming: with Escape, the cross, _Cancel_ or a click beside it. |

## showDone()

These functions show one of Hodi's toasts: a short message that says what just happened. A toast never asks a question and never holds a form. There are three:

- `showDone` says an action is done. With `undo`, it adds an _Undo_ button.
- `showSaved` says a setting is saved.
- `showError` says something failed, with a button to try again if needed.

```tsx title="web/index.tsx" render="toasts" kind="toast" play="toasts"
import { showDone } from 'hodi:sdk'

showDone('Greeting saved')
```

<!-- prettier-ignore -->
| Functions | Type | |
| --- | --- | --- |
| `showDone` | `(message: string, undo?: () => void) => void` | Shows the message of an action done. With `undo`, an _Undo_ button calls that function. |
| `showSaved` | `(message?: string) => void` | Shows _Saved_, or the message given. Only one of these toasts stays on screen at a time. |
| `showError` | `(message: string, action?, id?: string) => void` | Shows a failure. The message, or the `action` button, says what to do next. With `id`, a new toast replaces the one with the same `id`. |
