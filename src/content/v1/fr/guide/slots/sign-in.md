---
title: "signInExtras"
description: "Un bouton ou un lien du plugin sous le formulaire de Connexion, comme « Créer mon foyer »."
intro: "Un composant du plugin sous le formulaire de Connexion de Hodi. Il sert à proposer une autre façon d'entrer : un lien « Créer mon foyer », un bouton « Continuer avec Google »…"
order: 6
icon: "log-in"
topic: "sport"
key: "signInExtras"
---

## Où s'affiche `signInExtras`

Sur l'écran de Connexion de Hodi, sous le formulaire, avant que la personne ait ouvert son profil.

À ce moment, Hodi ne connaît pas encore le foyer de la personne. Hodi ne charge donc que les plugins qui ont la permission `publicRoutes`, et seulement le fichier `web/public.tsx` de ces plugins. Les cinq emplacements de connexion se déclarent dans ce fichier : `signInExtras`, `signedOutPage`, `afterSignIn`, `whoIsReadingFooter` et `ageConsent`.

## Un bouton « Créer mon foyer »

Ce bouton appelle une route publique du plugin, qui crée un compte. Quand la route a répondu, le bouton appelle `signedIn()` : Hodi redémarre l'app, avec la personne connectée.

```tsx title="web/public.tsx"
import { Button, definePlugin, usePluginPublicApi } from 'hodi:sdk'

const SignUp = ({ signedIn }) => {
  const publicApi = usePluginPublicApi()
  const join = async () => {
    const answer = await publicApi('/signup', { method: 'POST', body: JSON.stringify(form) })
    if (answer.ok) signedIn()
  }
  return <Button onClick={join}>Créer mon foyer</Button>
}

definePlugin({ signInExtras: SignUp })
```

## Ce que Hodi donne au composant de `signInExtras`

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | La taille de l'écran. |
| `signedIn` | `() => void` | Redémarre l'app, connectée, après une route qui a répondu `signIn`. |

## Connecter quelqu'un depuis une route publique

Le plugin ne pose jamais la session lui-même. Avec la permission `signIn`, la route publique du plugin répond `signIn` avec l'id d'un compte, et Hodi connecte l'appareil à ce compte :

```tsx title="server/index.ts"
publicRoutes: {
  'POST /signup': async (request, ctx) => {
    const account = await ctx.accounts.create({ email: request.body.email, password: request.body.password })
    if (!account) return { status: 409 }
    return { status: 201, signIn: account.id }
  }
}
```

Hodi n'accepte que l'id d'un compte que cet appel vient de créer, ou dont cet appel vient de vérifier le mot de passe. Jamais l'id de l'admin du serveur.

## À savoir sur `signInExtras`

- **Refuser une connexion** : `checkSignIn`, dans la partie serveur, à chaque connexion.
- **Les limites** : 30 requêtes par minute par adresse, aucune venue d'un autre site.

`checkSignIn` répond `null` pour laisser entrer la personne, ou une clé des `locales` du plugin pour refuser la connexion avec ce message.
