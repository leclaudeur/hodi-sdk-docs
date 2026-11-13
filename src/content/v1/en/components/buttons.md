---
title: "Buttons"
description: "With a label or an icon, the AI's and the reader's."
intro: "Every button in Hodi comes from these four components: same heights, same colours, same hovers, in all three themes."
order: 1
icon: "mouse-pointer-click"
topic: "tech"
preview: "button"
---

## Button

The button with a label, and a Lucide icon before it if you like. It is 44 px tall, 34 px when `compact`. A screen's main button is `primary`, what deletes is `danger`.

```tsx title="web/index.tsx" render="button" play="button"
import { Button } from 'hodi:sdk'
import { Check, Download, Plus, Trash2 } from 'lucide-react'

<Button look="primary" icon={Check}>Save</Button>
<Button icon={Download}>Export</Button>
<Button look="danger" icon={Trash2} onClick={clear}>Delete</Button>
<Button compact icon={Plus}>Add</Button>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `children` | `ReactNode` | The label. |
| `look?` | `'neutral' \| 'primary' \| 'danger' \| 'ai'` | Its colour, `neutral` by default. |
| `icon?` | `ComponentType` | A Lucide icon, at 16 px before the label. |
| `busy?` | `boolean` | Waiting for the server: the icon becomes a spinning circle, and the button can't be pressed. |
| `compact?` | `boolean` | 34 px tall, for a row or a header. |
| `wide?` | `boolean` | Its parent's whole width. |
| `href?` | `string` | A link drawn as a button. For an address in Hodi, take it from [usePluginLinks()](/en/components/hooks/). |
| `external?` | `boolean` | The link opens in a new tab. |
| `…` | `ButtonHTMLAttributes` | What a `<button>` accepts: `onClick`… |

## RoundButton

The button with a single icon. Its `label` is read by screen readers and shows on hover.

```tsx title="web/index.tsx" render="roundbutton"
import { RoundButton } from 'hodi:sdk'
import { Pencil, Trash2 } from 'lucide-react'

<RoundButton icon={Pencil} label="Edit" size={28} />
<RoundButton icon={Pencil} label="Edit" size={34} />
<RoundButton icon={Pencil} label="Edit" size={38} />
<RoundButton icon={Pencil} label="Edit" size={44} />
<RoundButton icon={Trash2} label="Delete" size={38} variant="danger" />
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `icon` | `LucideIcon` | The icon, a Lucide icon. |
| `label` | `string` | What the button does, for screen readers and on hover. |
| `size?` | `28 \| 34 \| 38 \| 44` | 28 in a card, 34 in a header, 38 in a settings row on a phone, 44 under a finger. |
| `variant?` | `'default' \| 'on' \| 'danger' \| 'primary' \| 'ai' \| 'glass' \| 'image'` | Its colour. `on`: lit, like a chosen filter. `glass` and `image`: laid over a photo. |
| `filled?` | `boolean` | The icon filled in, like a saved article. |
| `busy?` | `boolean` | The icon spins: give it a loading icon. |
| `href?` | `string` | A link drawn as a round button. |
| `external?` | `boolean` | The link opens in a new tab. |

## AiButton

The purple button, the only door to the household's AI. A click runs the `aiActions` action of the same name on your server, once. Hodi hides it for a teen, a child or a household without AI, and greys it out when the day's limit is reached. See [the server context](/en/guide/server-context/).

```tsx title="web/index.tsx" render="aibutton"
import { AiButton } from 'hodi:sdk'

<AiButton action="summary" input={{ id: article.id }} onAnswer={answer => setSummary(String(answer))}>
  Summarise
</AiButton>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `action` | `string` | The action's name in your server part's `aiActions`. |
| `input?` | `unknown` | Its `request.input`, 16 KB of JSON at most. |
| `onAnswer` | `(answer: unknown) => void` | What the action answered. |
| `onError?` | `(error: AiButtonError) => void` | Called instead of Hodi's toast. `AiButtonError`: `unavailable`, `off`, `limited`, `refused` or `failed`. |
| `children` | `ReactNode` | The label, a verb: "Summarise", "Translate". |
| `compact?` | `boolean` | 34 px tall. |
| `wide?` | `boolean` | The whole width. |
| `disabled?` | `boolean` | Can't be pressed. |

## ReaderButton

A button at the end of an article, next to "Read the original". It's what [the reader](/en/guide/slots/reader/) draws.

```tsx title="web/index.tsx" render="readerbutton"
import { ReaderButton } from 'hodi:sdk'
import { Check, Flag } from 'lucide-react'

<ReaderButton icon={<Flag size={12} />} onClick={report}>Report</ReaderButton>
<ReaderButton icon={<Check size={12} />} onClick={report} done>Reported</ReaderButton>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `children` | `ReactNode` | The label. |
| `onClick` | `() => void` | What the button does. |
| `icon?` | `ReactNode` | A 12 px Lucide icon, before the label. |
| `done?` | `boolean` | The action is done for this article: the button shows it. |
| `label?` | `string` | A fuller name for screen readers. |
