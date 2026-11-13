---
title: "Buttons"
description: "With a label or an icon, the AI's and the reader's."
intro: "Every button in Hodi comes from one of these four components. A plugin that uses them therefore has buttons of the same height, the same colour and the same hover as the rest of the app, in all three themes."
order: 1
icon: "mouse-pointer-click"
topic: "tech"
preview: "button"
---

## Button

The button with a text, and if needed a Lucide icon before that text. It is 44 px tall, or 34 px with `compact`. On a screen, the main action's button takes the `primary` look, and a button that erases takes the `danger` look.

```tsx title="web/index.tsx" render="button" play="button"
import { Button } from 'hodi:sdk'
import { Check } from 'lucide-react'

<Button
  look="primary"
  icon={Check}
  onClick={save}
>
  Save
</Button>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `children` | `ReactNode` | The button's text. |
| `look?` | `'neutral' \| 'primary' \| 'danger' \| 'ai'` | The button's colour: `neutral` by default, `primary` for the main action, `danger` for erasing, `ai` for the AI. |
| `icon?` | `ComponentType` | A Lucide icon, shown at 16 px before the text. |
| `busy?` | `boolean` | The button waits for the server: its icon becomes a spinning circle, and it can't be pressed. |
| `compact?` | `boolean` | The button is 34 px tall, to fit in a row or a header. |
| `wide?` | `boolean` | The button takes its parent's whole width. |
| `href?` | `string` | Makes the button a link to this address. An address in Hodi comes from [usePluginLinks()](/en/hooks/#usepluginlinks). |
| `external?` | `boolean` | With `href`: the link opens in a new tab. |
| `…` | `ButtonHTMLAttributes` | Everything a `<button>` accepts, such as `onClick` or `disabled`. |

## RoundButton

The round button, with a single icon and no text. Its `label` says what the button does: screen readers read it, and it shows on hover.

```tsx title="web/index.tsx" render="roundbutton" play="roundbutton"
import { RoundButton } from 'hodi:sdk'
import { Pencil } from 'lucide-react'

<RoundButton
  icon={Pencil}
  label="Edit"
  size={44}
  onClick={edit}
/>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `icon` | `LucideIcon` | The button's icon, a Lucide icon. |
| `label` | `string` | What the button does, for screen readers and on hover. |
| `size?` | `28 \| 34 \| 38 \| 44` | The button's diameter, in px: 28 in a card, 34 in a header, 38 in a settings row on a phone, 44 for a button touched with a finger. |
| `variant?` | `'default' \| 'on' \| 'danger' \| 'primary' \| 'ai' \| 'glass' \| 'image'` | The button's colour. `on` shows it lit, like a chosen filter. `glass` and `image` are for a button laid over a photo. |
| `filled?` | `boolean` | Fills the icon in, for example to show an article is saved. |
| `busy?` | `boolean` | Makes the icon spin, so it must be a loading icon. |
| `href?` | `string` | Makes the button a link to this address. |
| `external?` | `boolean` | With `href`: the link opens in a new tab. |

## AiButton

The purple button. It is the only way for a plugin to ask the household's AI a question. Each click runs the action of the same name in `aiActions` once, on the server side, and sends its answer to `onAnswer`.

Hodi hides this button for a teen, a child or a household without AI. It greys it out when the household has reached its limit for the day. [The server context](/en/guide/server-context/#the-ai-only-on-a-click) explains the server side.

```tsx title="web/index.tsx" render="aibutton" play="aibutton"
import { AiButton } from 'hodi:sdk'

<AiButton
  action="summary"
  input={{ id: article.id }}
  onAnswer={answer => setSummary(String(answer))}
>
  Summarise
</AiButton>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `action` | `string` | The name of the action to run, as written in the server part's `aiActions`. |
| `input?` | `unknown` | The value the action receives in `request.input`, 16 KB of JSON at most. |
| `onAnswer` | `(answer: unknown) => void` | Receives what the action answered. |
| `onError?` | `(error: AiButtonError) => void` | Called when the question fails, instead of Hodi's error toast. The error is `unavailable`, `off`, `limited`, `refused` or `failed`. |
| `children` | `ReactNode` | The button's text, a verb such as _Summarise_ or _Translate_. |
| `compact?` | `boolean` | The button is 34 px tall instead of 44. |
| `wide?` | `boolean` | The button takes its parent's whole width. |
| `disabled?` | `boolean` | The button is greyed out and can't be pressed. |

## ReaderButton

The small button that goes at the end of an article, next to _Read the original_. It is the button to use in the [`readerAction`](/en/guide/slots/reader/) slot.

```tsx title="web/index.tsx" render="readerbutton" play="readerbutton"
import { ReaderButton } from 'hodi:sdk'
import { Flag } from 'lucide-react'

<ReaderButton icon={<Flag size={12} />} onClick={report}>Report</ReaderButton>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `children` | `ReactNode` | The button's text. |
| `onClick` | `() => void` | What a click on the button does. |
| `icon?` | `ReactNode` | A 12 px Lucide icon, shown before the text. |
| `done?` | `boolean` | Shows the action is already done for this article. |
| `label?` | `string` | A fuller name than the text, for screen readers. |
