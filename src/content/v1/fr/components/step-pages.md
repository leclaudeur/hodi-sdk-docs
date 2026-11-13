---
title: "Pages d'étapes"
description: "Les pages de l'installation et de « J'ai un code » : une étape, des tuiles, les boutons."
intro: "Pour les emplacements [Connexion](/fr/guide/slots/sign-in/) et [Installation](/fr/guide/slots/setup/) : ces pages ont le logo en haut, la licence en bas et la carte au centre, comme celles de Hodi."
order: 3
icon: "list-checks"
topic: "climate"
preview: "setupactions"
---

## StepPage

Une étape en pleine page, hors de l'installation : une inscription avant la connexion, par exemple. Sa barre de progression, son titre, sa ligne, ses champs, puis ses boutons.

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
  <TextField icon={Hand} aria-label="Prénom" value={name} onChange={e => setName(e.target.value)} />
</StepPage>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `title` | `string` | Le titre de l'étape. |
| `intro` | `ReactNode` | La ligne sous le titre. |
| `actions` | `ReactNode` | Les boutons de droite, le principal en dernier. |
| `step?` | `number` | Son numéro, à partir de 1, avec `total`. |
| `total?` | `number` | Le nombre d'étapes. |
| `onSubmit?` | `() => void` | Entrée, depuis n'importe quel champ, valide l'étape. |
| `onBack?` | `() => void` | Ajoute « Retour » à gauche. |
| `start?` | `ReactNode` | Un bouton de plus à gauche : « Plus tard ». |
| `children?` | `ReactNode` | Les champs de l'étape. |

## TilesPage

Un choix en tuiles rondes, dessiné comme « Qui lit ? » dessine les profils.

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
| `title` | `string` | Le titre. |
| `tiles` | `Tile[]` | Les tuiles. `Tile` : `key`, `label`, `onClick`, et une icône Lucide `icon`, sinon la première lettre du libellé. |
| `intro?` | `ReactNode` | Une ligne sous le titre, centrée. |
| `opening?` | `string \| null` | La clé de la tuile qui s'ouvre : elle pulse, les autres attendent. |
| `error?` | `string \| null` | Un message d'erreur sous les tuiles. |
| `onBack?` | `() => void` | « Retour » sous les tuiles. |
| `actions?` | `ReactNode` | D'autres boutons à côté de « Retour ». |

## SetupActions

Les boutons au bas d'une étape qu'un plugin ajoute à [l’installation](/fr/guide/slots/setup/). Hodi y met « Retour » à gauche, ceux du plugin vont à droite.

```tsx title="web/index.tsx" render="setupactions" play="setupactions"
import { Button, SetupActions } from 'hodi:sdk'

<SetupActions start={<Button onClick={next}>Plus tard</Button>}>
  <Button look="primary" type="submit">Continuer</Button>
</SetupActions>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `children` | `ReactNode` | Les boutons de droite, le principal en dernier. |
| `start?` | `ReactNode` | Un bouton de plus à gauche, après « Retour ». |
