---
title: "Dialogues et messages"
description: "Les fenêtres, les messages dans la page et les listes vides."
intro: "Une fenêtre pour un formulaire, un message dans la page pour dire ce qui se passe, une liste vide quand il n'y a rien. La question avant d'effacer et les toasts sont dans [Fonctions](/fr/functions/)."
order: 5
icon: "message-square"
topic: "travel"
preview: "notice"
---

## Dialog

La fenêtre de Hodi, centrée, avec son en-tête teinté et sa croix. Échap, un clic à côté ou la croix appellent `onClose`. Ses boutons vont dans `DialogActions`.

```tsx title="web/index.tsx" render="dialog" kind="modal" play="dialog"
import { Button, Dialog, DialogActions, TextField } from 'hodi:sdk'
import { Hand } from 'lucide-react'

<Dialog
  open={open}
  onClose={close}
  size="compact"
  title="Nouvelle salutation"
  intro="Elle remplace « Salut »."
>
  <TextField
    icon={Hand}
    aria-label="Salutation"
    placeholder="Coucou"
  />
  <DialogActions>
    <Button onClick={close}>Annuler</Button>
    <Button look="primary" onClick={save}>Enregistrer</Button>
  </DialogActions>
</Dialog>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `open` | `boolean` | Ouverte ou non. |
| `onClose` | `() => void` | Échap, la croix ou un clic à côté. |
| `title?` | `ReactNode` | Le titre. Sans lui, `labelledBy` le remplace. |
| `intro?` | `ReactNode` | Ce que fait la fenêtre, en une ou deux phrases. |
| `size?` | `'compact' \| 'wide'` | `compact` pour une question ou un court formulaire, `wide` pour plus à lire. |
| `onBack?` | `() => void` | Une flèche de retour avant le titre. |
| `labelledBy?` | `string` | L'id de l'élément qui la nomme. |
| `describedBy?` | `string` | L'id de l'élément qui la décrit. |
| `children` | `ReactNode` | Son contenu, puis ses `DialogActions`. |

## DialogActions

La rangée des boutons d'une fenêtre, sous un trait. « Annuler » à gauche, l'action à droite.

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `children` | `ReactNode` | Les boutons, le principal en dernier. |
| `className?` | `string` | Une classe de plus. |

## StatusLine

Une ligne sous un champ : bleue pour ce qui se passe, rouge pour un échec.

```tsx title="web/index.tsx" render="statusline" play="statusline"
import { StatusLine } from 'hodi:sdk'

<StatusLine tone="info">Enregistré il y a 2 min.</StatusLine>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `tone` | `'info' \| 'error'` | Bleue ou rouge. |
| `children` | `string` | Le message. |

## Notice

Un encadré avec une icône, pour une information qui reste dans la page.

```tsx title="web/index.tsx" render="notice" play="notice"
import { Notice } from 'hodi:sdk'
import { ExternalLink, Info } from 'lucide-react'

<Notice
  title="Nouvelle version"
  icon={Info}
  action={{
    label: 'Voir',
    icon: ExternalLink,
    href: links.plugins
  }}
>
  Hello world 0.2 dit bonjour en néerlandais.
</Notice>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `title` | `string` | Son titre. |
| `icon` | `LucideIcon` | Son icône. |
| `children` | `ReactNode` | Son texte. |
| `tone?` | `'info' \| 'warning' \| 'error'` | Sa couleur. Par défaut `info`. |
| `action?` | `NoticeAction` | Un bouton au bout : `label`, `icon`, `onClick` ou `href`. |
| `side?` | `ReactNode` | Des ronds au bout, à la place du bouton. |
| `href?` | `string` | Tout l'encadré ouvre cette page, dans un nouvel onglet. |

## EmptyState

Une liste vide, ou qui n'a pas pu se charger : un titre et une ligne, pas plus.

```tsx title="web/index.tsx" render="emptystate" play="emptystate"
import { EmptyState } from 'hodi:sdk'
import { Inbox } from 'lucide-react'

<EmptyState
  icon={<Inbox size={28} />}
  title="Aucun bonjour"
  compact
>
  Les salutations du foyer arrivent ici.
</EmptyState>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `icon` | `ReactNode` | Son icône, à 28 px. |
| `title` | `string` | Ce qui manque. |
| `children?` | `ReactNode` | Une ligne, au plus. |
| `actions?` | `ReactNode` | Des boutons sous le texte. |
| `tone?` | `'default' \| 'danger'` | `danger` pour un échec. |
| `compact?` | `boolean` | Au-dessus d'un autre contenu. |
