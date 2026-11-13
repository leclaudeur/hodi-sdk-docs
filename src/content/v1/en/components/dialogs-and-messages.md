---
title: "Dialogs and messages"
description: "Windows, messages in the page and empty lists."
intro: "These components open a window, show a message in the page or show an empty list. The question before deleting and the toasts are not components: they are functions, described in [Functions](/en/functions/)."
order: 5
icon: "message-square"
topic: "travel"
preview: "notice"
---

## Dialog

Hodi's window, centred on the screen, with a tinted header and a cross to close it. The Escape key, a click beside the window or the cross call `onClose`. The window's buttons go in `DialogActions`.

```tsx title="web/index.tsx" render="dialog" kind="modal" play="dialog"
import { Button, Dialog, DialogActions, TextField } from 'hodi:sdk'
import { Hand } from 'lucide-react'

<Dialog
  open={open}
  onClose={close}
  size="compact"
  title="New greeting"
  intro="It replaces “Hi”."
>
  <TextField
    icon={Hand}
    aria-label="Greeting"
    placeholder="Hey"
  />
  <DialogActions>
    <Button onClick={close}>Cancel</Button>
    <Button look="primary" onClick={save}>Save</Button>
  </DialogActions>
</Dialog>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `open` | `boolean` | `true` when the window is open. |
| `onClose` | `() => void` | Called when the person closes the window: with Escape, the cross or a click beside it. |
| `title?` | `ReactNode` | The window's title. Without a title, `labelledBy` must name the window. |
| `intro?` | `ReactNode` | One or two sentences under the title, which say what the window is for. |
| `size?` | `'compact' \| 'wide'` | The window's width: `compact` for a question or a short form, `wide` when there is more to read. |
| `onBack?` | `() => void` | Adds a back arrow before the title, which calls this function. |
| `labelledBy?` | `string` | The id of the element that names the window, for screen readers. |
| `describedBy?` | `string` | The id of the element that describes the window, for screen readers. |
| `children` | `ReactNode` | The window's content, then its `DialogActions`. |

## DialogActions

The row of buttons at the bottom of a window, under a line. The secondary button, such as "Cancel", goes on the left; the action's button goes on the right.

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `children` | `ReactNode` | The row's buttons. The main button comes last. |
| `className?` | `string` | One more CSS class, prefixed by the plugin's id. |

## StatusLine

A message line under a field: in blue to say what is happening, in red to say something failed.

```tsx title="web/index.tsx" render="statusline" play="statusline"
import { StatusLine } from 'hodi:sdk'

<StatusLine tone="info">Saved 2 min ago.</StatusLine>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `tone` | `'info' \| 'error'` | The line's colour: `info` in blue, `error` in red. |
| `children` | `string` | The message, already translated. |

## Notice

A box with an icon and a title, for information that must stay visible in the page, such as a warning.

```tsx title="web/index.tsx" render="notice" play="notice"
import { Notice } from 'hodi:sdk'
import { ExternalLink, Info } from 'lucide-react'

<Notice
  title="New version"
  icon={Info}
  action={{
    label: 'See',
    icon: ExternalLink,
    href: links.plugins
  }}
>
  Hello world 0.2 says hello in Dutch.
</Notice>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `title` | `string` | The box's title. |
| `icon` | `LucideIcon` | The box's icon, a Lucide icon. |
| `children` | `ReactNode` | The text under the title. |
| `tone?` | `'info' \| 'warning' \| 'error'` | The box's colour: `info` in blue by default, `warning` in yellow, `error` in red. |
| `action?` | `NoticeAction` | A button at the end of the box. It has a `label`, an `icon`, and an `onClick` or an `href`. |
| `side?` | `ReactNode` | Round buttons at the end of the box, in place of `action`. |
| `href?` | `string` | Makes the whole box a link to this address, opened in a new tab. |

## EmptyState

What an empty list shows, or a list that couldn't load: an icon, a title and one line of text at most.

```tsx title="web/index.tsx" render="emptystate" play="emptystate"
import { EmptyState } from 'hodi:sdk'
import { Inbox } from 'lucide-react'

<EmptyState
  icon={<Inbox size={28} />}
  title="No hellos"
  compact
>
  The household’s greetings arrive here.
</EmptyState>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `icon` | `ReactNode` | The icon, shown at 28 px in a square. |
| `title` | `string` | The title, which says what is missing, such as "No hellos". |
| `children?` | `ReactNode` | One line of text under the title, no more. |
| `actions?` | `ReactNode` | Buttons under the text, such as "Try again". |
| `tone?` | `'default' \| 'danger'` | `danger` turns the icon red, when the list couldn't load. |
| `compact?` | `boolean` | A smaller version, for an empty state placed above other content. |
