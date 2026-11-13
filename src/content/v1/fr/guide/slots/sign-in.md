---
title: "Connexion"
description: "Une autre façon d'entrer, une inscription, une page à la place de Connexion ou une étape juste après elle."
intro: "Les écrans autour de la connexion : une autre façon d'entrer, une inscription, une page à la place de Connexion ou une étape juste après."
order: 6
icon: "log-in"
topic: "sport"
key: "signInExtras"
---

Avant qu'un profil soit ouvert, Hodi ne charge que les plugins qui ont la permission `publicRoutes`. Eux seuls peuvent dessiner ces écrans, et leurs routes publiques y répondent.

## Les emplacements

- **`signInExtras`** : sous le formulaire de Connexion, comme « Créer mon foyer ».
- **`signedOutPage`** : une page à la place de Connexion, sur un appareil sans foyer.
- **`afterSignIn`** : une étape une fois connecté, avant l'app, comme « Quel foyer ? ».
- **`whoIsReadingFooter`** : des boutons à côté de « Gérer les profils », sous « Qui lit ? ».
- **`ageConsent`** : une ligne après « J'ai au moins 13 ans », avec ses liens.

## Exemple

```tsx title="web/index.tsx"
const SignUp = ({ signedIn }) => {
  const publicApi = usePluginPublicApi()
  const join = async () => {
    const answer = await publicApi('/signup', { method: 'POST', body: … })
    if (answer.ok) signedIn()
  }
  return <Button onClick={join}>Créer mon foyer</Button>
}

definePlugin({ signInExtras: SignUp })
```

## À savoir

- **Connecter quelqu’un** : une route publique répond avec `signIn` et l'id d'un compte qu'elle vient de créer ou de vérifier. Hodi pose la session lui-même, avec la permission `signIn`.
- **Refuser une connexion** : `checkSignIn`, appelé à chaque connexion, peut la refuser.
- **Les limites** : pas de requête d'un autre site, 30 par minute au plus.
