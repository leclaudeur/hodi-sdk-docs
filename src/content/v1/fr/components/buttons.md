---
title: "Boutons"
description: "Avec un libellé ou une icône, celui de l'IA et celui du lecteur."
intro: "Chaque bouton de Hodi vient de l'un de ces quatre composants. Un plugin qui les utilise a donc des boutons de la même hauteur, de la même couleur et avec le même survol que le reste de l'app, dans les trois thèmes."
order: 1
icon: "mouse-pointer-click"
topic: "tech"
preview: "button"
---

## Button

Le bouton avec un texte, et au besoin une icône Lucide avant ce texte. Il fait 44 px de haut, ou 34 px avec `compact`. Sur un écran, le bouton de l'action principale prend le look `primary`, et un bouton qui efface prend le look `danger`.

```tsx title="web/index.tsx" render="button" play="button"
import { Button } from 'hodi:sdk'
import { Check } from 'lucide-react'

<Button
  look="primary"
  icon={Check}
  onClick={save}
>
  Enregistrer
</Button>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `children` | `ReactNode` | Le texte du bouton. |
| `look?` | `'neutral' \| 'primary' \| 'danger' \| 'ai'` | La couleur du bouton : `neutral` par défaut, `primary` pour l'action principale, `danger` pour effacer, `ai` pour l'IA. |
| `icon?` | `ComponentType` | Une icône Lucide, affichée à 16 px avant le texte. |
| `busy?` | `boolean` | Le bouton attend le serveur : son icône devient un rond qui tourne, et il ne se presse plus. |
| `compact?` | `boolean` | Le bouton fait 34 px de haut, pour tenir dans une ligne ou un en-tête. |
| `wide?` | `boolean` | Le bouton prend toute la largeur de son parent. |
| `href?` | `string` | Fait du bouton un lien vers cette adresse. Une adresse de Hodi vient de [usePluginLinks()](/fr/hooks/#usepluginlinks). |
| `external?` | `boolean` | Avec `href` : le lien s'ouvre dans un nouvel onglet. |
| `…` | `ButtonHTMLAttributes` | Tout ce qu'un `<button>` accepte, comme `onClick` ou `disabled`. |

## RoundButton

Le bouton rond, avec une seule icône et sans texte. Son `label` dit ce que fait le bouton : les lecteurs d'écran le lisent, et il s'affiche au survol.

```tsx title="web/index.tsx" render="roundbutton" play="roundbutton"
import { RoundButton } from 'hodi:sdk'
import { Pencil } from 'lucide-react'

<RoundButton
  icon={Pencil}
  label="Modifier"
  size={44}
  onClick={edit}
/>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `icon` | `LucideIcon` | L'icône du bouton, une icône Lucide. |
| `label` | `string` | Ce que fait le bouton, pour les lecteurs d'écran et au survol. |
| `size?` | `28 \| 34 \| 38 \| 44` | Le diamètre du bouton, en px : 28 dans une carte, 34 dans un en-tête, 38 dans une ligne de réglage sur un téléphone, 44 pour un bouton qu'on touche du doigt. |
| `variant?` | `'default' \| 'on' \| 'danger' \| 'primary' \| 'ai' \| 'glass' \| 'image'` | La couleur du bouton. `on` le montre allumé, comme un filtre choisi. `glass` et `image` servent pour un bouton posé sur une photo. |
| `filled?` | `boolean` | Remplit l'icône, par exemple pour montrer qu'un article est enregistré. |
| `busy?` | `boolean` | Fait tourner l'icône, qui doit donc être une icône de chargement. |
| `href?` | `string` | Fait du bouton un lien vers cette adresse. |
| `external?` | `boolean` | Avec `href` : le lien s'ouvre dans un nouvel onglet. |

## AiButton

Le bouton violet. C'est le seul moyen pour un plugin de poser une question à l'IA du foyer. Chaque clic lance une fois l'action du même nom dans `aiActions`, côté serveur, et renvoie sa réponse à `onAnswer`.

Hodi cache ce bouton pour un ado, un enfant ou un foyer sans IA. Il le grise quand le foyer a atteint sa limite du jour. [Le contexte serveur](/fr/guide/server-context/#lia-seulement-sur-un-clic) explique le côté serveur.

```tsx title="web/index.tsx" render="aibutton" play="aibutton"
import { AiButton } from 'hodi:sdk'

<AiButton
  action="summary"
  input={{ id: article.id }}
  onAnswer={answer => setSummary(String(answer))}
>
  Résumer
</AiButton>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `action` | `string` | Le nom de l'action à lancer, tel qu'il est écrit dans `aiActions` de la partie serveur. |
| `input?` | `unknown` | La valeur que l'action reçoit dans `request.input`, 16 Ko de JSON au plus. |
| `onAnswer` | `(answer: unknown) => void` | Reçoit ce que l'action a répondu. |
| `onError?` | `(error: AiButtonError) => void` | Appelé quand la question échoue, à la place du toast d'erreur de Hodi. L'erreur vaut `unavailable`, `off`, `limited`, `refused` ou `failed`. |
| `children` | `ReactNode` | Le texte du bouton, un verbe comme _Résumer_ ou _Traduire_. |
| `compact?` | `boolean` | Le bouton fait 34 px de haut au lieu de 44. |
| `wide?` | `boolean` | Le bouton prend toute la largeur de son parent. |
| `disabled?` | `boolean` | Le bouton est grisé et ne se presse pas. |

## ReaderButton

Le petit bouton qui se place au bout d'un article, à côté de _Lire l'original_. C'est le bouton à utiliser dans l'emplacement [`readerAction`](/fr/guide/slots/reader/).

```tsx title="web/index.tsx" render="readerbutton" play="readerbutton"
import { ReaderButton } from 'hodi:sdk'
import { Flag } from 'lucide-react'

<ReaderButton icon={<Flag size={12} />} onClick={report}>Signaler</ReaderButton>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `children` | `ReactNode` | Le texte du bouton. |
| `onClick` | `() => void` | Ce que fait un clic sur le bouton. |
| `icon?` | `ReactNode` | Une icône Lucide à 12 px, affichée avant le texte. |
| `done?` | `boolean` | Montre que l'action est déjà faite pour cet article. |
| `label?` | `string` | Un nom plus complet que le texte, pour les lecteurs d'écran. |
