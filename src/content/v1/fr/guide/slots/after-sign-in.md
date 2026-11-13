---
title: "afterSignIn"
description: "Une étape du plugin juste après la connexion, avant d'entrer dans l'app, comme _Quel foyer ?_."
intro: "Une étape que le plugin dessine juste après la connexion, avant _Qui lit ?_ et avant l'app. Elle sert à demander une chose avant d'entrer : choisir un foyer, accepter de nouvelles conditions…"
order: 8
icon: "house"
topic: "sport"
key: "afterSignIn"
---

## Où dans Hodi

Juste après la connexion d'une personne, avant l'écran _Qui lit ?_ et avant l'app. La personne ne voit cette étape qu'une fois par connexion.

Si plusieurs plugins donnent un `afterSignIn`, Hodi affiche celui du premier. L'admin du serveur qui n'a pas de foyer ne voit jamais cette étape : il arrive directement dans l'espace Serveur.

## Exemple

Cette étape liste les foyers de la personne. Un clic sur un foyer appelle une route du plugin, puis `done()` laisse la personne entrer dans l'app.

```tsx title="web/public.tsx"
import { Button, StepPage, definePlugin, usePluginPublicApi } from 'hodi:sdk'

const WhichHousehold = ({ done }) => {
  const publicApi = usePluginPublicApi()
  const pick = async (id) => {
    await publicApi('/household', { method: 'POST', body: JSON.stringify({ id }) })
    done()
  }
  return (
    <StepPage title="Quel foyer ?">
      <Button onClick={() => pick('dupont')}>Famille Dupont</Button>
    </StepPage>
  )
}

definePlugin({ afterSignIn: WhichHousehold })
```

## Les props

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | La taille de l'écran. |
| `done` | `() => void` | Termine l'étape : la personne entre dans l'app. |

## À savoir

- **Si l'étape du plugin plante** : Hodi propose d'entrer quand même, la personne n'est jamais bloquée.
- **Un rechargement de la page** : la personne revient sur l'étape, tant que `done()` n'a pas été appelé.
