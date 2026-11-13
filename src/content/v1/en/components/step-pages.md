---
title: "Step pages"
description: "The pages of setup and of \"I have a code\": a step, tiles, the buttons."
intro: "These components draw full-page screens, such as those of the [`signedOutPage`](/en/guide/slots/signed-out-page/), [`afterSignIn`](/en/guide/slots/after-sign-in/) and [`setupSteps`](/en/guide/slots/setup/) slots. As on Hodi's own screens, the logo is at the top, the licence at the bottom and the card in the middle."
order: 3
icon: "list-checks"
topic: "climate"
preview: "setupactions"
---

## StepPage

A full-page step, outside Hodi's setup, such as a sign-up before signing in. It shows, from top to bottom: a progress bar, a title, a sentence that explains it, the step's fields, then its buttons.

```tsx title="web/index.tsx" render="steppage" kind="page" play="steppage"
import { Button, StepPage, TextField } from 'hodi:sdk'
import { Hand } from 'lucide-react'

<StepPage
  step={2}
  total={3}
  title="Your first name"
  intro="Hodi puts it in every greeting."
  onSubmit={save}
  onBack={back}
  actions={<Button look="primary" type="submit">Continue</Button>}
>
  <TextField
    icon={Hand}
    aria-label="First name"
    value={name}
    onChange={e => setName(e.target.value)}
  />
</StepPage>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `title` | `string` | The step's title, already translated. |
| `intro` | `ReactNode` | The sentence under the title, which explains the step. |
| `actions` | `ReactNode` | The buttons on the right of the card's bottom. The main button comes last. |
| `step?` | `number` | The step's number, from 1. With `total`, it fills the progress bar. |
| `total?` | `number` | The number of steps in all. |
| `onSubmit?` | `() => void` | Called when the person presses Enter in one of the fields, to complete the step. |
| `onBack?` | `() => void` | Adds a "Back" button on the left, which calls this function. |
| `start?` | `ReactNode` | One more button on the left, such as "Later". |
| `children?` | `ReactNode` | The step's fields, under the explaining sentence. |

## TilesPage

A choice screen in round tiles, drawn the way the "Who's in?" screen draws profiles. Each tile has an icon, or the first letter of its text.

```tsx title="web/index.tsx" render="tilespage" kind="page" play="tilespage"
import { TilesPage } from 'hodi:sdk'

<TilesPage
  title="Which household?"
  intro="Pick the household to open."
  tiles={households.map(h => ({ key: h.id, label: h.name, onClick: () => open(h.id) }))}
  opening={opening}
  onBack={back}
/>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `title` | `string` | The screen's title, already translated. |
| `tiles` | `Tile[]` | The tiles, in order. A `Tile` has a `key`, a `label`, an `onClick` and, if needed, a Lucide `icon`. Without an icon, the tile shows the first letter of its `label`. |
| `intro?` | `ReactNode` | A centred sentence under the title. |
| `opening?` | `string \| null` | The key of the tile that is opening. That tile pulses, and the others can't be pressed while waiting. |
| `error?` | `string \| null` | An error message, shown under the tiles. |
| `onBack?` | `() => void` | Adds a "Back" button under the tiles, which calls this function. |
| `actions?` | `ReactNode` | Other buttons, next to "Back". |

## SetupActions

The buttons at the bottom of a step the plugin adds to Hodi's setup, with [`setupSteps`](/en/guide/slots/setup/). Hodi places "Back" on the left itself; the plugin's buttons go on the right.

```tsx title="web/index.tsx" render="setupactions" play="setupactions"
import { Button, SetupActions } from 'hodi:sdk'

<SetupActions start={<Button onClick={next}>Later</Button>}>
  <Button look="primary" type="submit">Continue</Button>
</SetupActions>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `children` | `ReactNode` | The buttons on the right. The main button comes last. |
| `start?` | `ReactNode` | One more button on the left, right after "Back". |
