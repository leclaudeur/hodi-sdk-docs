---
title: "Connexion"
description: "Les écrans autour de la connexion : une autre façon d'entrer, une inscription, une étape juste après."
intro: "Les écrans autour de la connexion : une autre façon d'entrer, une inscription, une page à la place de Connexion, ou une étape juste après. Ce sont les seuls emplacements qu'une personne voit avant d'avoir ouvert son profil."
order: 6
icon: "log-in"
topic: "sport"
key: "signInExtras"
---

## Avant la connexion

Avant qu'une personne ait ouvert son profil, Hodi ne connaît pas encore son foyer. Il ne charge donc que les plugins qui ont la permission `publicRoutes`, et seulement leur fichier `web/public.tsx`. Ce fichier remplit les emplacements de cette page, et appelle les routes publiques du plugin.

## Les emplacements

<!-- prettier-ignore -->
| Clé de `definePlugin` | Où l'écran apparaît |
| --- | --- |
| `signInExtras` | Sous le formulaire de Connexion. Par exemple, un lien « Créer mon foyer ». |
| `signedOutPage` | À la place de Connexion, sur un appareil qui n'a pas encore de foyer. Par exemple, une page d'accueil. |
| `afterSignIn` | Une étape juste après la connexion, avant d'entrer dans l'app. Par exemple, « Quel foyer ? ». |
| `whoIsReadingFooter` | À côté de « Gérer les profils », sous « Qui lit ? ». Par exemple, « Changer de foyer ». |
| `ageConsent` | Après la case « J'ai au moins 13 ans ». Par exemple, « et j'accepte les conditions ». |

## Exemple

Ce bouton, sous Connexion, crée un compte avec une route publique, puis connecte la personne :

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

## Ce qu'ils reçoivent

<!-- prettier-ignore -->
| Emplacement | Props | |
| --- | --- | --- |
| `signInExtras` | `layout`, `signedIn()` | `signedIn()` relance l'app, connectée, après une route qui a répondu `signIn`. |
| `signedOutPage` | `layout`, `showSignIn()`, `signedIn()` | `showSignIn()` ouvre Connexion. |
| `afterSignIn` | `layout`, `done()` | `done()` laisse la personne entrer dans l'app. |
| `whoIsReadingFooter` | `layout` | |

## Connecter quelqu'un

Le plugin ne pose jamais la session lui-même. Avec la permission `signIn`, sa route publique répond `signIn` avec l'id d'un compte, et Hodi connecte l'appareil :

```tsx title="server/index.ts"
publicRoutes: {
  'POST /signup': async (request, ctx) => {
    const account = await ctx.accounts.create({ email: request.body.email, password: request.body.password })
    if (!account) return { status: 409 }
    return { status: 201, signIn: account.id }
  }
}
```

Hodi n'accepte que l'id d'un compte que cet appel vient de créer, ou dont il vient de vérifier le mot de passe. Jamais celui de l'admin du serveur.

## À savoir

- **Refuser une connexion** : `checkSignIn`, côté serveur, à chaque connexion.
- **Les limites** : 30 requêtes par minute par adresse, aucune venue d'un autre site.

`checkSignIn` répond `null` pour laisser entrer, ou une clé de ses `locales` pour refuser avec ce message.
