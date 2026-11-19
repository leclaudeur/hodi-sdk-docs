---
title: "noHouseholdActions"
description: "Une autre façon de continuer pour un compte qui n'a plus de foyer, comme _Créer mon foyer_."
intro: "Un composant du plugin sur la carte d'un compte qui n'a plus de foyer. Il sert à proposer une suite, comme créer un nouveau foyer, à la place d'un code d'invitation."
order: 7
icon: "house-plus"
topic: "sport"
key: "noHouseholdActions"
---

## Où dans Hodi

Un compte appartient à un seul foyer. Quand la personne quitte son foyer, ou quand l'admin du foyer supprime son profil, son compte reste : à la connexion, Hodi montre alors une carte qui le dit, avec _Se déconnecter_ et _Mon compte_. Le composant `noHouseholdActions` s'affiche sous le texte de cette carte.

Comme pour la Connexion, Hodi ne charge à ce moment que les plugins qui ont la permission `publicRoutes`, et seulement leur fichier `web/public.tsx`. `noHouseholdActions` se déclare dans ce fichier.

## Exemple

Ce bouton appelle une route du plugin ouverte aux comptes sans foyer, qui crée le foyer. Quand la route a répondu, le bouton appelle `done()` : Hodi redémarre l'app, dans le nouveau foyer.

```tsx title="web/public.tsx"
import { Button, definePlugin, usePluginApi } from 'hodi:sdk'

const CreateHousehold = ({ done }) => {
  const api = usePluginApi()
  const create = async () => {
    const answer = await api('/my-household', {
      method: 'POST',
      body: JSON.stringify(form)
    })
    if (answer.ok) done()
  }
  return <Button onClick={create}>Créer mon foyer</Button>
}

definePlugin({ noHouseholdActions: CreateHousehold })
```

La route est déclarée dans `routes` avec `noHousehold: true` : [Les routes](/fr/guide/server-context/#une-route-pour-un-compte-sans-foyer) l'explique.

## Les props

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | La taille de l'écran. |
| `done` | `() => void` | Relance Hodi, une fois que le compte a de nouveau un foyer. |

## À savoir

- **Les routes appelées** : seulement celles de `routes` marquées `noHousehold: true`. Toutes les autres routes répondent 423 `no_household` à ce compte.
- **Qui voit le composant** : seulement un compte connecté qui n'a pas de foyer.
