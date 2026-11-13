---
title: "Fonctions"
description: "Les fonctions de `hodi:sdk` qui s'appellent depuis le code : la question avant d'effacer et les toasts."
intro: "Ces fonctions s'appellent depuis le code du plugin, par exemple après un clic. Elles affichent une fenêtre ou un toast de Hodi : le plugin ne les dessine pas lui-même, et ils ont donc la même allure que partout dans l'app."
order: 3
icon: "square-function"
---

## askToConfirm()

Cette fonction ouvre la fenêtre de Hodi qui pose une question avant une action qui ne se défait pas, comme effacer un historique. La personne confirme avec un bouton rouge, ou annule.

Avec `proof`, la fenêtre demande aussi le mot de passe de la personne. `onConfirm` reçoit alors une preuve, que la partie web passe à une route marquée `proof: true` avec `api(path, { proof })`. Hodi vérifie le mot de passe avant de lancer la route.

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
| `title` | `string` | La question posée, comme _Vider l'historique ?_. |
| `message` | `ReactNode` | Ce qui va se passer, en entier : ce qui sera effacé, pour qui, et ce qui restera. |
| `label` | `string` | Le texte du bouton qui confirme, un verbe comme _Vider_ ou _Effacer_. |
| `onConfirm` | `(proof: Proof) => void \| Promise<void>` | Ce que fait le clic sur ce bouton. Avec `proof`, il reçoit le mot de passe et le code tapés. Si la promesse échoue, la fenêtre reste ouverte. |
| `look?` | `'danger' \| 'primary'` | La couleur du bouton : rouge par défaut, `primary` pour une action qui ajoute au lieu d'effacer. |
| `proof?` | `{}` | Demande le mot de passe de la personne, et le code de son appli quand elle a la validation en deux étapes. |
| `onCancel?` | `() => void` | Ce qui se passe quand la personne ferme la fenêtre sans confirmer : avec Échap, la croix, _Annuler_ ou un clic à côté. |

## showDone()

Ces fonctions affichent un toast de Hodi : un message court qui dit ce qui vient de se passer. Un toast ne pose jamais de question et ne contient jamais de formulaire. Il en existe trois :

- `showDone` dit qu'une action est faite. Avec `undo`, il ajoute un bouton _Annuler_.
- `showSaved` dit qu'un réglage est enregistré.
- `showError` dit qu'une chose a échoué, avec un bouton pour réessayer si besoin.

```tsx title="web/index.tsx" render="toasts" kind="toast" play="toasts"
import { showDone } from 'hodi:sdk'

showDone('Salutation enregistrée')
```

<!-- prettier-ignore -->
| Fonctions | Type | |
| --- | --- | --- |
| `showDone` | `(message: string, undo?: () => void) => void` | Affiche le message d'une action faite. Avec `undo`, un bouton _Annuler_ appelle cette fonction. |
| `showSaved` | `(message?: string) => void` | Affiche _Enregistré_, ou le message donné. Un seul de ces toasts reste à l'écran à la fois. |
| `showError` | `(message: string, action?, id?: string) => void` | Affiche un échec. Le message, ou le bouton `action`, dit quoi faire ensuite. Avec `id`, un nouveau toast remplace celui qui a le même `id`. |
