---
title: "Pages d'étapes"
description: "Les pages de l'installation et de « J'ai un code » : une étape, des tuiles, les boutons."
intro: "Ces composants dessinent les écrans en pleine page, comme ceux des emplacements [`signedOutPage`](/fr/guide/slots/signed-out-page/), [`afterSignIn`](/fr/guide/slots/after-sign-in/) et [`setupSteps`](/fr/guide/slots/setup/). Comme sur les écrans de Hodi, le logo est en haut, la licence en bas et la carte au centre."
order: 3
icon: "list-checks"
topic: "climate"
preview: "setupactions"
---

## StepPage

Une étape en pleine page, en dehors de l'installation de Hodi, comme une inscription avant la connexion. Elle montre, de haut en bas : une barre de progression, un titre, une phrase d'explication, les champs de l'étape, puis ses boutons.

```tsx title="web/index.tsx" render="steppage" kind="page" play="steppage"
import { Button, StepPage, TextField } from 'hodi:sdk'
import { Hand } from 'lucide-react'

<StepPage
  step={2}
  total={3}
  title="Ton prénom"
  intro="Hodi le met dans chaque salutation."
  onSubmit={save}
  onBack={back}
  actions={<Button look="primary" type="submit">Continuer</Button>}
>
  <TextField
    icon={Hand}
    aria-label="Prénom"
    value={name}
    onChange={e => setName(e.target.value)}
  />
</StepPage>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `title` | `string` | Le titre de l'étape, déjà traduit. |
| `intro` | `ReactNode` | La phrase sous le titre, qui explique l'étape. |
| `actions` | `ReactNode` | Les boutons à droite du bas de la carte. Le bouton principal vient en dernier. |
| `step?` | `number` | Le numéro de l'étape, à partir de 1. Avec `total`, il remplit la barre de progression. |
| `total?` | `number` | Le nombre d'étapes en tout. |
| `onSubmit?` | `() => void` | Appelé quand la personne appuie sur Entrée dans un des champs, pour valider l'étape. |
| `onBack?` | `() => void` | Ajoute un bouton « Retour » à gauche, qui appelle cette fonction. |
| `start?` | `ReactNode` | Un bouton de plus à gauche, comme « Plus tard ». |
| `children?` | `ReactNode` | Les champs de l'étape, sous la phrase d'explication. |

## TilesPage

Un écran de choix en tuiles rondes, dessiné comme l'écran « Qui lit ? » dessine les profils. Chaque tuile a une icône, ou la première lettre de son texte.

```tsx title="web/index.tsx" render="tilespage" kind="page" play="tilespage"
import { TilesPage } from 'hodi:sdk'

<TilesPage
  title="Quel foyer ?"
  intro="Choisis le foyer à ouvrir."
  tiles={households.map(h => ({ key: h.id, label: h.name, onClick: () => open(h.id) }))}
  opening={opening}
  onBack={back}
/>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `title` | `string` | Le titre de l'écran, déjà traduit. |
| `tiles` | `Tile[]` | Les tuiles, dans l'ordre. Une `Tile` a une `key`, un `label`, un `onClick` et, au besoin, une icône Lucide `icon`. Sans icône, la tuile montre la première lettre de son `label`. |
| `intro?` | `ReactNode` | Une phrase centrée sous le titre. |
| `opening?` | `string \| null` | La clé de la tuile en train de s'ouvrir. Cette tuile pulse, et les autres ne se pressent plus en attendant. |
| `error?` | `string \| null` | Un message d'erreur, affiché sous les tuiles. |
| `onBack?` | `() => void` | Ajoute un bouton « Retour » sous les tuiles, qui appelle cette fonction. |
| `actions?` | `ReactNode` | D'autres boutons, à côté de « Retour ». |

## SetupActions

Les boutons au bas d'une étape que le plugin ajoute à l'installation de Hodi, avec [`setupSteps`](/fr/guide/slots/setup/). Hodi y place lui-même « Retour » à gauche ; les boutons du plugin vont à droite.

```tsx title="web/index.tsx" render="setupactions" play="setupactions"
import { Button, SetupActions } from 'hodi:sdk'

<SetupActions start={<Button onClick={next}>Plus tard</Button>}>
  <Button look="primary" type="submit">Continuer</Button>
</SetupActions>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `children` | `ReactNode` | Les boutons de droite. Le bouton principal vient en dernier. |
| `start?` | `ReactNode` | Un bouton de plus à gauche, juste après « Retour ». |
