---
title: "Functions"
description: "The functions of `hodi:sdk` that code calls: the question before deleting and the toasts."
intro: "Your plugin's code calls these functions, after a click for example. They show one of Hodi's windows or toasts: the plugin doesn't draw them itself."
order: 3
icon: "square-function"
---

## askToConfirm()

Hodi's question before what can't be undone. The button is red by default. With `proof`, it also asks for the person's password: pass it to a route marked `proof: true` with `api(path, { proof })`, and Hodi checks it.

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
| `title` | `string` | The question. |
| `message` | `ReactNode` | What happens, in full: what, for whom, what remains. |
| `label` | `string` | The button that does it: "Clear", "Delete". |
| `onConfirm` | `(proof: Proof) => void \| Promise<void>` | After the click. With `proof`, gets the password and code typed; an error keeps the window open. |
| `look?` | `'danger' \| 'primary'` | Red by default, `primary` for what adds. |
| `proof?` | `{}` | Asks for the person's password, and their app's code with two-step verification. |
| `onCancel?` | `() => void` | Escape, the cross, "Cancel" or a click beside it. |

## showDone()

Hodi's toasts say what happened, nothing more: never a question, never a form. `showDone` for an action done, with "Undo" if you give it `undo`. `showSaved` for a saved setting. `showError` for a failure, with a button if needed.

```tsx title="web/index.tsx" render="toasts" kind="toast" play="toasts"
import { showDone } from 'hodi:sdk'

showDone('Greeting saved')
```

<!-- prettier-ignore -->
| Functions | Type | |
| --- | --- | --- |
| `showDone` | `(message: string, undo?: () => void) => void` | An action done. With undo, an "Undo" button. |
| `showSaved` | `(message?: string) => void` | "Saved", one at a time. |
| `showError` | `(message: string, action?, id?: string) => void` | A failure: what to do next goes in the message or the button. `id` keeps only one of the same kind. |
