---
title: "Fonctions"
description: "Les fonctions de `hodi:sdk` qui s'appellent depuis le code : la question avant d'effacer et les toasts."
intro: "Ces fonctions s'appellent depuis le code du plugin, par exemple après un clic. Elles affichent une fenêtre ou un toast de Hodi : le plugin ne les dessine pas lui-même."
order: 3
icon: "square-function"
---

## askToConfirm()

La question de Hodi avant ce qui ne se défait pas. Le bouton est rouge par défaut. Avec `proof`, elle demande aussi le mot de passe de la personne : il passe à une route marquée `proof: true` avec `api(path, { proof })`, et Hodi le vérifie.

```tsx title="web/index.tsx" render="asktoconfirm" kind="modal" play="asktoconfirm"
import { askToConfirm, usePluginApi } from 'hodi:sdk'

const api = usePluginApi()
askToConfirm({
  title: 'Vider l’historique ?',
  message: 'Les 30 derniers bonjours de ce foyer seront effacés.',
  label: 'Vider',
  onConfirm: () => api('/history', { method: 'DELETE' })
})
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `title` | `string` | La question. |
| `message` | `ReactNode` | Ce qui se passe, en entier : quoi, pour qui, ce qui reste. |
| `label` | `string` | Le bouton qui le fait : « Vider », « Effacer ». |
| `onConfirm` | `(proof: Proof) => void \| Promise<void>` | Après le clic. Avec `proof`, reçoit le mot de passe et le code tapés ; une erreur garde la fenêtre ouverte. |
| `look?` | `'danger' \| 'primary'` | Rouge par défaut, `primary` pour ce qui ajoute. |
| `proof?` | `{}` | Demande le mot de passe de la personne, et le code de son appli avec la validation en deux étapes. |
| `onCancel?` | `() => void` | Échap, la croix, « Annuler » ou un clic à côté. |

## showDone()

Les toasts de Hodi disent ce qui s'est passé, rien de plus : jamais une question, jamais un formulaire. `showDone` pour une action faite, avec « Annuler » quand elle reçoit `undo`. `showSaved` pour un réglage enregistré. `showError` pour un échec, avec un bouton si besoin.

```tsx title="web/index.tsx" render="toasts" kind="toast" play="toasts"
import { showDone } from 'hodi:sdk'

showDone('Salutation enregistrée')
```

<!-- prettier-ignore -->
| Fonctions | Type | |
| --- | --- | --- |
| `showDone` | `(message: string, undo?: () => void) => void` | Une action faite. Avec undo, un bouton « Annuler ». |
| `showSaved` | `(message?: string) => void` | « Enregistré », un seul à la fois. |
| `showError` | `(message: string, action?, id?: string) => void` | Un échec : ce qu'il faut faire ensuite va dans le message ou le bouton. `id` n'en garde qu'un du même genre. |
