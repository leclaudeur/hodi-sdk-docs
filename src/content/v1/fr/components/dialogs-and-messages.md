---
title: "Dialogues et messages"
description: "Les fenêtres, les messages dans la page et les listes vides."
intro: "Ces composants ouvrent une fenêtre, affichent un message dans la page ou montrent une liste vide. La question avant d'effacer et les toasts ne sont pas des composants : ce sont des fonctions, décrites dans [Fonctions](/fr/functions/)."
order: 5
icon: "message-square"
topic: "travel"
preview: "notice"
---

## Dialog

La fenêtre de Hodi, centrée sur l'écran, avec un en-tête teinté et une croix pour la fermer. La touche Échap, un clic à côté de la fenêtre ou la croix appellent `onClose`. Les boutons de la fenêtre se placent dans `DialogActions`.

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
| `open` | `boolean` | `true` quand la fenêtre est ouverte. |
| `onClose` | `() => void` | Appelé quand la personne ferme la fenêtre : avec Échap, la croix ou un clic à côté. |
| `title?` | `ReactNode` | Le titre de la fenêtre. Sans titre, `labelledBy` doit nommer la fenêtre. |
| `intro?` | `ReactNode` | Une ou deux phrases sous le titre, qui disent à quoi sert la fenêtre. |
| `size?` | `'compact' \| 'wide'` | La largeur de la fenêtre : `compact` pour une question ou un court formulaire, `wide` quand il y a plus à lire. |
| `onBack?` | `() => void` | Ajoute une flèche de retour avant le titre, qui appelle cette fonction. |
| `labelledBy?` | `string` | L'id de l'élément qui nomme la fenêtre, pour les lecteurs d'écran. |
| `describedBy?` | `string` | L'id de l'élément qui décrit la fenêtre, pour les lecteurs d'écran. |
| `children` | `ReactNode` | Le contenu de la fenêtre, puis ses `DialogActions`. |

## DialogActions

La rangée de boutons au bas d'une fenêtre, sous un trait. Le bouton secondaire, comme « Annuler », va à gauche ; le bouton de l'action va à droite.

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `children` | `ReactNode` | Les boutons de la rangée. Le bouton principal vient en dernier. |
| `className?` | `string` | Une classe CSS de plus, préfixée par l'id du plugin. |

## StatusLine

Une ligne de message sous un champ : en bleu pour dire ce qui se passe, en rouge pour dire qu'une chose a échoué.

```tsx title="web/index.tsx" render="statusline" play="statusline"
import { StatusLine } from 'hodi:sdk'

<StatusLine tone="info">Enregistré il y a 2 min.</StatusLine>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `tone` | `'info' \| 'error'` | La couleur de la ligne : `info` en bleu, `error` en rouge. |
| `children` | `string` | Le message, déjà traduit. |

## Notice

Un encadré avec une icône et un titre, pour une information qui doit rester visible dans la page, comme un avertissement.

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
| `title` | `string` | Le titre de l'encadré. |
| `icon` | `LucideIcon` | L'icône de l'encadré, une icône Lucide. |
| `children` | `ReactNode` | Le texte sous le titre. |
| `tone?` | `'info' \| 'warning' \| 'error'` | La couleur de l'encadré : `info` en bleu par défaut, `warning` en jaune, `error` en rouge. |
| `action?` | `NoticeAction` | Un bouton au bout de l'encadré. Il a un `label`, une `icon`, et un `onClick` ou un `href`. |
| `side?` | `ReactNode` | Des boutons ronds au bout de l'encadré, à la place de `action`. |
| `href?` | `string` | Fait de tout l'encadré un lien vers cette adresse, ouvert dans un nouvel onglet. |

## EmptyState

Ce qu'affiche une liste vide, ou une liste qui n'a pas pu se charger : une icône, un titre et une ligne de texte au plus.

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
| `icon` | `ReactNode` | L'icône, affichée à 28 px dans un carré. |
| `title` | `string` | Le titre, qui dit ce qui manque, comme « Aucun bonjour ». |
| `children?` | `ReactNode` | Une ligne de texte sous le titre, pas plus. |
| `actions?` | `ReactNode` | Des boutons sous le texte, comme « Réessayer ». |
| `tone?` | `'default' \| 'danger'` | `danger` met l'icône en rouge, quand la liste n'a pas pu se charger. |
| `compact?` | `boolean` | Une version plus petite, pour un état vide posé au-dessus d'un autre contenu. |
