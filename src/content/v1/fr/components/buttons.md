---
title: "Boutons"
description: "Avec un libellé ou une icône, celui de l'IA et celui du lecteur."
intro: "Chaque bouton de Hodi vient de ces quatre composants : mêmes hauteurs, mêmes couleurs, mêmes survols, dans les trois thèmes."
order: 1
icon: "mouse-pointer-click"
topic: "tech"
preview: "button"
---

## Button

Le bouton avec un libellé, et, au besoin, une icône Lucide avant lui. Il fait 44 px de haut, 34 px en `compact`. Le bouton principal d'un écran est `primary`, ce qui efface est `danger`.

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
| `children` | `ReactNode` | Le libellé. |
| `look?` | `'neutral' \| 'primary' \| 'danger' \| 'ai'` | Sa couleur, `neutral` par défaut. |
| `icon?` | `ComponentType` | Une icône Lucide, à 16 px avant le libellé. |
| `busy?` | `boolean` | Attend le serveur : l'icône devient un rond qui tourne, et le bouton ne se presse plus. |
| `compact?` | `boolean` | 34 px de haut, pour une ligne ou un en-tête. |
| `wide?` | `boolean` | Toute la largeur de son parent. |
| `href?` | `string` | Un lien dessiné en bouton. Une adresse de Hodi vient de [usePluginLinks()](/fr/hooks/). |
| `external?` | `boolean` | Le lien s'ouvre dans un nouvel onglet. |
| `…` | `ButtonHTMLAttributes` | Ce qu'un `<button>` accepte : `onClick`… |

## RoundButton

Le bouton d'une seule icône. Son `label` est lu par les lecteurs d'écran et s'affiche au survol.

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
| `icon` | `LucideIcon` | L'icône, une icône Lucide. |
| `label` | `string` | Ce que fait le bouton, pour les lecteurs d'écran et au survol. |
| `size?` | `28 \| 34 \| 38 \| 44` | 28 dans une carte, 34 dans un en-tête, 38 dans une ligne de réglage sur téléphone, 44 sous le doigt. |
| `variant?` | `'default' \| 'on' \| 'danger' \| 'primary' \| 'ai' \| 'glass' \| 'image'` | Sa couleur. `on` : allumé, comme un filtre choisi. `glass` et `image` : posé sur une photo. |
| `filled?` | `boolean` | L'icône pleine, comme un article enregistré. |
| `busy?` | `boolean` | L'icône tourne : elle doit donc être une icône de chargement. |
| `href?` | `string` | Un lien dessiné en rond. |
| `external?` | `boolean` | Le lien s'ouvre dans un nouvel onglet. |

## AiButton

Le bouton violet, seule porte vers l'IA du foyer. Un clic lance l'action `aiActions` du même nom sur la partie serveur, une seule fois. Hodi le cache pour un ado, un enfant ou un foyer sans IA, et le grise quand la limite du jour est atteinte. Voir [le contexte serveur](/fr/guide/server-context/).

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
| `action` | `string` | Le nom de l'action dans `aiActions` de la partie serveur. |
| `input?` | `unknown` | Son `request.input`, 16 Ko de JSON au plus. |
| `onAnswer` | `(answer: unknown) => void` | Ce que l'action a répondu. |
| `onError?` | `(error: AiButtonError) => void` | Appelé à la place du toast de Hodi. `AiButtonError` : `unavailable`, `off`, `limited`, `refused` ou `failed`. |
| `children` | `ReactNode` | Le libellé, un verbe : « Résumer », « Traduire ». |
| `compact?` | `boolean` | 34 px de haut. |
| `wide?` | `boolean` | Toute la largeur. |
| `disabled?` | `boolean` | Ne se presse pas. |

## ReaderButton

Un bouton au bout d'un article, à côté de « Lire l'original ». C'est ce que dessine [le lecteur](/fr/guide/slots/reader/).

```tsx title="web/index.tsx" render="readerbutton" play="readerbutton"
import { ReaderButton } from 'hodi:sdk'
import { Flag } from 'lucide-react'

<ReaderButton icon={<Flag size={12} />} onClick={report}>Signaler</ReaderButton>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `children` | `ReactNode` | Le libellé. |
| `onClick` | `() => void` | Ce que fait le bouton. |
| `icon?` | `ReactNode` | Une icône Lucide à 12 px, avant le libellé. |
| `done?` | `boolean` | L'action est faite pour cet article : le bouton le montre. |
| `label?` | `string` | Un nom plus complet pour les lecteurs d'écran. |
