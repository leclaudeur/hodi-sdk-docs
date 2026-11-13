---
title: "Dialogs and messages"
description: "Windows, the question before deleting, toasts, messages and empty lists."
intro: "A window for a form, a question before what can't be undone, a toast to say what happened: never one for the other."
order: 5
icon: "message-square"
topic: "travel"
preview: "notice"
---

## Dialog

Hodi's window, centred, with its tinted header and its cross. Escape, a click beside it or the cross call `onClose`. Its buttons go in `DialogActions`.

```tsx title="web/index.tsx" render="dialog" kind="modal"
import { Button, Dialog, DialogActions, TextField } from 'hodi:sdk'
import { Hand } from 'lucide-react'

<Dialog open={open} onClose={close} size="compact" title="New greeting" intro="It replaces \"Hi\".">
  <TextField icon={Hand} aria-label="Greeting" placeholder="Hey" />
  <DialogActions>
    <Button onClick={close}>Cancel</Button>
    <Button look="primary" onClick={save}>Save</Button>
  </DialogActions>
</Dialog>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `open` | `boolean` | Open or not. |
| `onClose` | `() => void` | Escape, the cross or a click beside it. |
| `title?` | `ReactNode` | The title. Without it, use `labelledBy`. |
| `intro?` | `ReactNode` | What the window does, in one or two sentences. |
| `size?` | `'compact' \| 'wide'` | `compact` for a question or a short form, `wide` for more to read. |
| `onBack?` | `() => void` | A back arrow before the title. |
| `labelledBy?` | `string` | The id of the element that names it. |
| `describedBy?` | `string` | The id of the element that describes it. |
| `children` | `ReactNode` | Its content, then its `DialogActions`. |

## DialogActions

A window's row of buttons, under a line. "Cancel" on the left, the action on the right.

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `children` | `ReactNode` | The buttons, the main one last. |
| `className?` | `string` | One more class. |

## askToConfirm()

Hodi's question before what can't be undone. The button is red by default. With `proof`, it also asks for the person's password: pass it to a route marked `proof: true` with `api(path, { proof })`, and Hodi checks it.

```tsx title="web/index.tsx" render="asktoconfirm" kind="modal"
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

```tsx title="web/index.tsx" render="toasts" kind="toast"
import { showDone, showError, showSaved } from 'hodi:sdk'

showDone('Greeting saved')
showDone('Greeting deleted', () => restore(id))
showSaved()
showError('The server did not answer.')
```

<!-- prettier-ignore -->
| Functions | Type | |
| --- | --- | --- |
| `showDone` | `(message: string, undo?: () => void) => void` | An action done. With undo, an "Undo" button. |
| `showSaved` | `(message?: string) => void` | "Saved", one at a time. |
| `showError` | `(message: string, action?, id?: string) => void` | A failure: what to do next goes in the message or the button. `id` keeps only one of the same kind. |

## StatusLine

A line under a field: blue for what is happening, red for a failure.

```tsx title="web/index.tsx" render="statusline"
import { StatusLine } from 'hodi:sdk'

<StatusLine tone="info">Saved 2 min ago.</StatusLine>
<StatusLine tone="error">The server did not answer.</StatusLine>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `tone` | `'info' \| 'error'` | Blue or red. |
| `children` | `string` | The message. |

## Notice

A box with an icon, for information that stays in the page.

```tsx title="web/index.tsx" render="notice"
import { Notice } from 'hodi:sdk'
import { ExternalLink, Info } from 'lucide-react'

<Notice title="New version" icon={Info} action={{ label: 'See', icon: ExternalLink, href: links.plugins }}>
  Hello world 0.2 says hello in Dutch.
</Notice>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `title` | `string` | Its title. |
| `icon` | `LucideIcon` | Its icon. |
| `children` | `ReactNode` | Its text. |
| `tone?` | `'info' \| 'warning' \| 'error'` | Its colour. `info` by default. |
| `action?` | `NoticeAction` | A button at the end: `label`, `icon`, `onClick` or `href`. |
| `side?` | `ReactNode` | Round buttons at the end, in place of the button. |
| `href?` | `string` | The whole box opens this page, in a new tab. |

## EmptyState

An empty list, or one that couldn't load: a title and a line, no more.

```tsx title="web/index.tsx" render="emptystate"
import { EmptyState } from 'hodi:sdk'
import { Inbox } from 'lucide-react'

<EmptyState icon={<Inbox size={28} />} title="No hellos" compact>
  The household's greetings arrive here.
</EmptyState>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `icon` | `ReactNode` | Its icon, at 28 px. |
| `title` | `string` | What is missing. |
| `children?` | `ReactNode` | One line, at most. |
| `actions?` | `ReactNode` | Buttons under the text. |
| `tone?` | `'default' \| 'danger'` | `danger` for a failure. |
| `compact?` | `boolean` | Above other content. |
