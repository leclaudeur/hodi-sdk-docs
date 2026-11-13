---
title: "Serveur et web"
description: "Les deux parties d'un plugin Hodi : où chacune tourne, ce qu'elle peut faire et comment elles se parlent."
intro: "Un plugin ajoute une fonction à Hodi sans modifier le code de Hodi. Il a deux parties : une partie serveur, qui tourne sur le serveur de Hodi, et une partie web, qui s'affiche dans le navigateur. Cette page explique le rôle de chacune et comment elles communiquent."
order: 1
icon: "layers"
---

## Les deux parties d'un plugin

Le plus simple est de partir d'un exemple : le plugin « Hello world » des [premiers pas](/fr/getting-started/). Ce plugin ajoute un bouton « Dire bonjour » dans _Serveur › Plugins_. Un clic sur ce bouton demande un message au serveur, puis le bouton affiche la réponse du serveur.

Voici qui fait quoi dans ce plugin :

- **La partie web** dessine le bouton. C'est le fichier `web/index.tsx`.
- **La partie serveur** fabrique le message. C'est le fichier `server/index.ts`.
- **Hodi fait le lien** : il transmet le clic au serveur, puis la réponse au bouton.

<!-- prettier-ignore -->
| _Les deux parties_ | Serveur | Web |
| --- | --- | --- |
| Son fichier | `server/index.ts` | `web/index.tsx` |
| Où elle tourne | Sur le serveur de Hodi, dans un bac à sable | Dans le navigateur, dans les pages de Hodi |
| Son rôle | Répondre aux routes, garder des données, lancer des tâches | Dessiner des écrans, des cartes et des boutons |
| Ce qu'elle utilise | `ctx`, le contexte que Hodi lui donne | `hodi:sdk`, les composants et les hooks de Hodi |
| Obligatoire | Non | Non |

> **Un plugin peut n'avoir qu'une des deux parties.** Un plugin qui ajoute seulement un flux d'articles n'a pas besoin d'écran. Un plugin qui ajoute seulement une entrée au menu de l'avatar n'a pas besoin de serveur.

## Les fichiers d'un plugin

Un plugin est un dossier. Le plus simple pour démarrer est de copier le [modèle de plugin](https://github.com/leclaudeur/hodi-plugin-template). Ce modèle contient déjà tous les fichiers ci-dessous, le SDK, des tests et une CI, et ce modèle fonctionne tel quel.

```text title="hello-world/"
plugin.json        la carte d'identité du plugin
server/index.ts    la partie serveur
web/index.tsx      la partie web, une fois la personne connectée
web/public.tsx     les écrans avant la connexion, s'il en a
locales/fr.json    les textes en français
locales/en.json    les textes en anglais
assets/            les images, copiées telles quelles
test/              les tests
```

Seul `plugin.json` est obligatoire. Ce fichier donne le nom du plugin, sa version, ses réglages et ses permissions. [Le manifeste](/fr/guide/manifest/) décrit `plugin.json` champ par champ.

## Du dossier au fichier installable

Hodi n'installe pas un dossier, mais un seul fichier `.hodi-plugin`. Cette commande fabrique le fichier `.hodi-plugin`, depuis le dossier du plugin :

```sh title="Terminal"
npx hodi-plugin build
```

Voici ce que devient chaque fichier du dossier dans le fichier `.hodi-plugin` :

<!-- prettier-ignore -->
| Dans le dossier | Dans le fichier `.hodi-plugin` |
| --- | --- |
| `server/index.ts` | Le fichier devient `server.js`, avec le code des paquets npm qu'il importe. |
| `web/index.tsx` | Le fichier devient `web.js`, et ses styles deviennent `web.css`. |
| `web/public.tsx` | Le fichier devient `web-public.js`, et ses styles deviennent `web-public.css`. |
| `plugin.json` | Le fichier est copié tel quel. |
| `locales/` | Le dossier est copié tel quel, avec les textes de chaque langue. |
| `assets/` | Le dossier est copié tel quel, avec les images et les autres fichiers. |

Le fichier arrive dans `dist/`, par exemple `dist/hello-world-0.1.0.hodi-plugin`. [Publier](/fr/guide/publish/) explique comment tester ce fichier, l'installer et le faire signer.

## La partie serveur

### Ce que fait la partie serveur

La partie serveur est le code du plugin qui tourne sur le serveur de Hodi, jamais dans le navigateur. La partie serveur sert à trois choses :

- **répondre à la partie web**, avec des routes ;
- **garder des données**, dans une base SQLite rien qu'à elle ;
- **travailler toute seule**, avec des tâches qui reviennent, comme un ménage chaque nuit.

Le fichier `server/index.ts` exporte un objet `ServerPlugin`. Voici la partie serveur complète de Hello world :

```tsx title="server/index.ts"
import type { ServerPlugin } from '@hodi-app/plugin-sdk/server'

const plugin: ServerPlugin = {
  routes: {
    'POST /hello': async (request, ctx) => {
      const { greeting } = ctx.settings()
      return { body: { text: greeting } }
    }
  }
}

export default plugin
```

Ce code déclare une seule route, `POST /hello`. Quand la partie web appelle cette route, la route lit le réglage `greeting` et répond `{ "text": "Bonjour" }`.

### Le bac à sable de la partie serveur

Le code d'un plugin peut venir de n'importe qui. Hodi ne lance donc pas le code d'un plugin avec son propre code, mais dans un **bac à sable** : un moteur JavaScript séparé, QuickJS, isolé du reste de Hodi.

Dans ce bac à sable, seul le JavaScript standard existe : `JSON`, `Math`, `Date`, les promesses, les classes… Les modules de Node.js n'y sont pas :

- pas de `fs`, donc pas de lecture de fichier ;
- pas de `fetch`, donc pas d'appel direct à un site ;
- pas de `process`, ni de `require`.

Pour tout le reste, la partie serveur passe par `ctx`, le contexte que Hodi donne à chaque route. Voici, pour cinq besoins courants, la fonction de `ctx` à utiliser :

<!-- prettier-ignore -->
| Ce que le plugin veut faire | Comment le faire avec `ctx` |
| --- | --- |
| Lire ou écrire ses données | Avec `ctx.db`, qui donne accès à sa base de données. |
| Lire ses réglages | Avec `ctx.settings()`, qui renvoie la valeur choisie pour chaque réglage. |
| Lire la page d'un site | Avec `ctx.fetchText()`. Il faut la permission `network`. |
| Poser une question à l'IA du foyer | Avec `ctx.ai.ask()`. Il faut la permission `ai`. |
| Écrire une ligne dans le journal | Avec `ctx.log()`, pour suivre ce que fait le plugin. |

Hodi vérifie chaque appel : le plugin n'obtient que ce que ses [permissions](/fr/guide/manifest/#les-permissions-du-plugin--permissions) lui ouvrent. [Le contexte serveur](/fr/guide/server-context/) décrit tout ce que `ctx` contient.

### Les paquets npm dans la partie serveur

La partie serveur peut importer des paquets npm. Pendant la construction du plugin, le code de ces paquets est copié dans `server.js`. Le bac à sable n'a donc rien à télécharger.

Un paquet npm ne marche dans le bac à sable que s'il est écrit en JavaScript standard. Un paquet qui a besoin de Node.js plante au premier appel, car Node.js n'existe pas dans le bac à sable. Voici quatre paquets connus, et la raison pour laquelle chacun marche ou non :

<!-- prettier-ignore -->
| Paquet | Marche-t-il ? |
| --- | --- |
| `date-fns` | Oui. Il calcule des dates en JavaScript standard. |
| `zod` | Oui. Il vérifie des données en JavaScript standard. |
| `sharp` | Non. Il redimensionne des images avec du code natif de Node.js. |
| `pg` | Non. Il ouvre une connexion réseau vers PostgreSQL. |

En cas de doute sur un paquet, `npm test` répond vite : les tests lancent le plugin dans le même bac à sable que Hodi.

### Les limites du bac à sable

Un plugin ne doit jamais ralentir Hodi. Le bac à sable fixe donc des limites à la partie serveur. Voici chaque limite, et ce qui se passe quand la partie serveur la dépasse :

<!-- prettier-ignore -->
| Limite | Ce qui se passe |
| --- | --- |
| Mémoire | La partie serveur a 16 Mo, ou jusqu'à 32 Mo avec `memoryMb`. Au-delà, l'appel échoue. |
| Durée d'un appel | Un appel dure 10 secondes au plus. Au-delà, Hodi l'arrête. |
| Taille d'une réponse | Une réponse fait 1 Mo au plus. Au-delà, l'appel échoue. |
| Taille de la base | La base fait 256 Mo au plus. Au-delà, l'écriture échoue. |
| Appels en attente | 8 appels peuvent attendre derrière celui qui tourne. Au-delà, Hodi répond `busy` sans attendre. |
| Plantages | Après 3 plantages en 10 minutes, le plugin s'arrête jusqu'au prochain démarrage de Hodi. |

Le bac à sable s'endort après une minute sans appel, et se réveille à l'appel suivant. En s'endormant, le bac à sable oublie tout ce qui était en mémoire. Une variable globale ne garde donc pas sa valeur d'un appel à l'autre : ce qui doit durer va dans la base, avec `ctx.db`.

## La partie web

### Ce que fait la partie web

La partie web est le code du plugin qui tourne dans le navigateur, dans les pages de Hodi. La partie web dessine ce que la personne voit : une page dans Réglages, une carte, un bouton sous un article…

La partie web se charge en arrière-plan, une fois la personne connectée. L'app n'attend jamais un plugin pour s'afficher : le plugin apparaît dès qu'il est prêt.

Voici la partie web de Hello world. Cette partie web dessine une carte avec un bouton « Dire bonjour », sur la page du plugin dans _Serveur › Plugins_. Un clic sur le bouton appelle la route `/hello`, puis la carte affiche la réponse de la route :

```tsx title="web/index.tsx"
import { Button, SettingRow, definePlugin, usePluginApi } from 'hodi:sdk'
import { useState } from 'react'

const HelloCard = () => {
  const api = usePluginApi()
  const [text, setText] = useState('')
  const sayHello = async () => {
    const answer = await api('/hello', { method: 'POST' })
    setText((await answer.json()).text)
  }
  return (
    <SettingRow label="Dire bonjour" hint={text}>
      <Button onClick={sayHello}>Dire bonjour</Button>
    </SettingRow>
  )
}

definePlugin({ settingsPage: HelloCard })
```

### Ce que la partie web importe de `hodi:sdk`

La partie web importe tout de `hodi:sdk` : les composants de Hodi (`Button`, `SettingRow`…), les hooks de Hodi (`usePluginApi`…) et `definePlugin`. Ces composants ne sont pas des copies : ce sont les composants de la page de Hodi elle-même. Le plugin a donc l'air du reste de l'app, dans chaque thème et sur chaque taille d'écran.

Voici où trouver chaque sujet de la partie web :

- **Où le plugin s'affiche** : `definePlugin()` le dit, voir [les emplacements](/fr/guide/slots/).
- **Les composants** : ceux de l'app, listés dans [Composants](/fr/components/).
- **Les textes** : `usePluginTranslation()` les lit dans le dossier `locales/`.
- **Les styles** : un fichier CSS, avec des classes préfixées par l'id du plugin.

### Les styles de la partie web

La page de Hodi refuse les styles en ligne, comme `style={{ color: 'red' }}`. Chaque style passe donc par une classe, dans un fichier CSS importé par `web/index.tsx`, comme `web/plugin.css` dans le modèle.

```css title="web/plugin.css"
.hello-world-answer {
  color: var(--text-2);
}
```

Les couleurs viennent des variables de Hodi, comme `var(--text-2)`. Ces variables changent avec le thème (Clair, Sombre, Poudré). Une couleur écrite en dur, comme `#333`, ne change pas et devient illisible dans un autre thème.

### Quand Hodi affiche la partie web

La partie web tourne dans la page de Hodi, avec la session de la personne connectée. Pour cette raison, Hodi n'affiche la partie web d'un plugin que dans deux cas :

1. Le plugin est **signé** par le mainteneur de Hodi, après relecture de son code.
2. Le plugin est **en développement**, envoyé par `hodi-plugin dev` sur un Hodi de test.

Un plugin non signé s'installe quand même, mais sans sa partie web. [Publier](/fr/guide/publish/#être-vérifié) explique comment faire signer un plugin.

## Comment la partie web appelle la partie serveur

La partie web appelle une route de la partie serveur par le chemin de cette route, avec `usePluginApi()`. Hodi se place au milieu : Hodi vérifie qui demande, puis passe la requête à la partie serveur.

```tsx title="web/index.tsx"
const api = usePluginApi()
const answer = await api('/hello', { method: 'POST' })
const { text } = await answer.json()
```

Voici ce qui se passe, dans l'ordre, pendant cet appel :

1. Le navigateur demande `/api/plugins/hello-world/hello`.
2. Hodi vérifie que la personne est connectée.
3. Hodi vérifie que le plugin est prévu pour son profil.
4. Hodi appelle la route `'POST /hello'` du plugin.
5. La route reçoit `request.who` : qui demande.
6. La route ne reçoit aucun cookie.
7. Sa réponse revient à la partie web, en JSON.

`request.who` dit qui demande, tel que Hodi l'a vérifié : le profil de la personne, son foyer, si la personne est adulte, ado ou enfant, et si elle est admin. La route n'a donc rien à vérifier elle-même. La route ne reçoit jamais de cookie ni de jeton : le plugin ne peut pas se faire passer pour la personne.

## Les textes du plugin

Chaque texte que la personne lit dans un plugin vient des fichiers `locales/` du plugin. `locales/fr.json` est la référence, et chaque clé existe aussi dans `locales/en.json`. Les textes français d'un plugin tutoient la personne, comme le reste de Hodi.

```json title="locales/fr.json"
{
  "manifest": {
    "name": "Hello world",
    "description": "Un réglage, une route et sa propre carte."
  },
  "settings": {
    "greeting": "Message",
    "greetingHint": "Ce que le plugin répond"
  },
  "say": "Dire bonjour"
}
```

Le fichier `locales/fr.json` a trois sortes de clés :

- **`manifest`** : le nom et la description du plugin dans cette langue.
- **`settings`** : le libellé de chaque réglage, et sa ligne d'aide.
- **Les autres** : les textes de la partie web, lus avec `usePluginTranslation()`.

La partie web affiche un texte avec la clé de ce texte :

```tsx title="web/index.tsx"
const { t } = usePluginTranslation()

<Button onClick={sayHello}>{t('say')}</Button>
```

## Ce qu'il faut pour écrire un plugin

Avant d'écrire un plugin, quatre choses sont à préparer :

1. Installer **Node.js 24** ou plus récent.
2. Copier le [modèle de plugin](https://github.com/leclaudeur/hodi-plugin-template).
3. Lancer `npm install` dans son dossier.
4. Préparer **un Hodi de test**, avec _Serveur › Plugins › Mode développeur_ activé.

Le modèle contient déjà le SDK, `@hodi-app/plugin-sdk` : `npm install` l'installe avec le reste. Sans le modèle, il s'ajoute avec `npm install --save-dev @hodi-app/plugin-sdk`.

Les [premiers pas](/fr/getting-started/) montrent ces étapes en vrai, dans un éditeur : un plugin très simple, en une dizaine de minutes. Ce plugin est un exemple guidé pour découvrir les étapes : il ne sert à rien au quotidien.
