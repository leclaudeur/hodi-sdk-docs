---
title: "Step pages"
description: "The pages of setup and of \"I have a code\": a step, tiles, the buttons."
intro: "For the [Sign-in](/en/guide/slots/sign-in/) and [Setup](/en/guide/slots/setup/) slots: these pages have the logo at the top, the licence at the bottom and the card in the middle, like Hodi's own."
order: 3
icon: "list-checks"
topic: "climate"
preview: "setupactions"
---

## StepPage

A full-page step, outside setup: a sign-up before signing in, for instance. Its progress bar, its title, its line, its fields, then its buttons.

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
| `title` | `string` | The step's title. |
| `intro` | `ReactNode` | The line under the title. |
| `actions` | `ReactNode` | The buttons on the right, the main one last. |
| `step?` | `number` | Its number, from 1, with `total`. |
| `total?` | `number` | The number of steps. |
| `onSubmit?` | `() => void` | Enter, from any field, completes the step. |
| `onBack?` | `() => void` | Adds "Back" on the left. |
| `start?` | `ReactNode` | One more button on the left: "Later". |
| `children?` | `ReactNode` | The step's fields. |

## TilesPage

A choice in round tiles, drawn the way "Who's in?" draws profiles.

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
| `title` | `string` | The title. |
| `tiles` | `Tile[]` | The tiles. `Tile`: `key`, `label`, `onClick`, and a Lucide `icon`, otherwise the label's first letter. |
| `intro?` | `ReactNode` | A line under the title, centred. |
| `opening?` | `string \| null` | The key of the tile that is opening: it pulses, the others wait. |
| `error?` | `string \| null` | An error message under the tiles. |
| `onBack?` | `() => void` | "Back" under the tiles. |
| `actions?` | `ReactNode` | Other buttons next to "Back". |

## SetupActions

The buttons at the bottom of a step your plugin adds to [setup](/en/guide/slots/setup/). Hodi puts "Back" on the left, your buttons go on the right.

```tsx title="web/index.tsx" render="setupactions" play="setupactions"
import { Button, SetupActions } from 'hodi:sdk'

<SetupActions start={<Button onClick={next}>Later</Button>}>
  <Button look="primary" type="submit">Continue</Button>
</SetupActions>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `children` | `ReactNode` | The buttons on the right, the main one last. |
| `start?` | `ReactNode` | One more button on the left, after "Back". |
