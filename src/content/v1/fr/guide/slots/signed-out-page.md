---
title: "signedOutPage"
description: "Une page du plugin à la place de Connexion, sur un appareil qui n'est encore lié à aucun foyer."
intro: "Une page que le plugin dessine à la place de l'écran de Connexion de Hodi. Elle sert à accueillir une personne qui n'a pas encore de foyer : une page d'accueil, une présentation du service…"
order: 7
icon: "door-open"
topic: "sport"
key: "signedOutPage"
---

## Où s'affiche `signedOutPage`

Sur un appareil qui n'est encore lié à aucun foyer, Hodi ouvre d'habitude son écran de Connexion. Avec `signedOutPage`, Hodi ouvre la page du plugin à la place.

Hodi ne charge à ce moment que les plugins qui ont la permission `publicRoutes`, et seulement leur fichier `web/public.tsx`. Si plusieurs plugins donnent une `signedOutPage`, Hodi affiche celle du premier.

L'écran de Connexion de Hodi reste toujours joignable : le lien d'un code, le lien d'un nouveau mot de passe et l'adresse `#/sign-in` ouvrent toujours la Connexion de Hodi.

## Une page d'accueil

Cette page présente le service et propose deux boutons : « Se connecter », qui ouvre la Connexion de Hodi, et « Créer mon foyer », qui appelle une route publique du plugin.

```tsx title="web/public.tsx"
import { Button, definePlugin } from 'hodi:sdk'

const Welcome = ({ showSignIn }) => (
  <main className="village-welcome">
    <h1>Hodi, l'actu de toute la famille</h1>
    <Button onClick={showSignIn}>Se connecter</Button>
    <Button look="primary" onClick={() => (window.location.hash = '#/plugin/village/join')}>
      Créer mon foyer
    </Button>
  </main>
)

definePlugin({ signedOutPage: Welcome })
```

## Ce que Hodi donne au composant de `signedOutPage`

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | La taille de l'écran. |
| `showSignIn` | `() => void` | Ouvre l'écran de Connexion de Hodi. |
| `signedIn` | `() => void` | Redémarre l'app, connectée, après une route qui a répondu `signIn`. |

## À savoir sur `signedOutPage`

- **Si la page du plugin plante** : Hodi affiche sa propre Connexion, jamais un écran vide.
- **Connecter quelqu'un** : la route publique répond `signIn`, voir [`signInExtras`](/fr/guide/slots/sign-in/).
