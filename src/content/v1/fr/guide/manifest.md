---
title: "Le manifeste"
description: "`plugin.json`, la carte d'identité d'un plugin : son nom, pour qui il est, ses réglages et ses permissions, champ par champ."
intro: "`plugin.json` est la carte d'identité du plugin. Il dit à Hodi comment le plugin s'appelle, pour qui il est, quels réglages il propose et ce qu'il a le droit de faire. C'est le seul fichier obligatoire d'un plugin."
order: 2
icon: "file-braces"
---

## Un exemple

Voici le `plugin.json` du plugin Hello world. Il a un nom, une version et un seul réglage : le message que le plugin répond.

```json title="plugin.json"
{
  "id": "hello-world",
  "name": "Hello world",
  "version": "0.1.0",
  "description": "Un réglage, une route et sa propre carte.",
  "api": 2,
  "audience": "all",
  "settings": [
    {
      "key": "greeting",
      "type": "text",
      "default": "Bonjour",
      "maxLength": 40
    }
  ]
}
```

Hodi lit ce fichier à l'installation du plugin, et vérifie chaque champ. Si un champ obligatoire manque, ou si une valeur ne respecte pas les règles de cette page, Hodi refuse d'installer le plugin. L'admin voit alors l'erreur, par exemple : `version must be like 1.2.3`.

## Tous les champs

Un `?` marque un champ facultatif. Chaque champ a sa section plus bas.

<!-- prettier-ignore -->
| Champ | Type | |
| --- | --- | --- |
| `id` | `string` | Le nom technique du plugin, qui ne change jamais. |
| `name` | `string` | Le nom que les gens voient, 60 caractères au plus. |
| `version` | `string` | Le numéro de version, comme `1.2.0`. |
| `description` | `string` | Une phrase qui dit ce que fait le plugin, 280 caractères au plus. |
| `api` | `2` | La version de l'API des plugins pour laquelle il est écrit. |
| `audience?` | `'admin' \| 'all'` | Qui voit le plugin dans un foyer. `all` par défaut. |
| `settings?` | `Setting[]` | Ses réglages, que l'admin du serveur change. |
| `permissions?` | `Permissions` | Ce qu'il a le droit de faire en plus de garder ses données. |
| `menu?` | `{ group, after? }` | Où placer sa page dans Réglages. |
| `feeds?` | `Feed[]` | Les flux d'articles qu'il propose, 5 au plus. |
| `memoryMb?` | `number` | La mémoire de sa partie serveur, en Mo. 16 par défaut. |
| `publicPages?` | `PublicPages` | Les adresses de ses pages publiques que les moteurs de recherche peuvent lire. |

## L'identité du plugin

### `id`

L'id est le nom technique du plugin. Hodi s'en sert partout :

- pour le dossier du plugin sur le serveur ;
- pour l'adresse de ses routes, comme `/api/plugins/hello-world/hello` ;
- pour le fichier de sa base de données ;
- pour reconnaître le plugin quand une nouvelle version arrive.

Un id respecte ces règles :

- il commence par une lettre minuscule ;
- il ne contient que des lettres minuscules, des chiffres et des tirets ;
- il fait de 2 à 32 caractères ;
- il n'est ni `packages` ni `dev-mode`, que Hodi garde pour lui.

Une fois le plugin publié, son id ne change plus. Pour Hodi, un autre id veut dire un autre plugin : il installerait le nouveau à côté de l'ancien, avec une base vide, et les données de l'ancien ne suivraient pas.

### `name` et `description`

Le nom (60 caractères au plus) et la description (280 au plus) sont ce que l'admin lit dans _Serveur › Plugins_, et ce que le registre montre avant l'installation.

Ces deux textes existent aussi dans chaque langue, dans les fichiers `locales/` du plugin, sous la clé `manifest` :

```json title="locales/en.json"
{
  "manifest": {
    "name": "Hello world",
    "description": "One setting, one route and its own card."
  }
}
```

Hodi affiche toujours le nom et la description dans la langue de la personne. Ceux de `plugin.json` ne servent que de secours, quand le fichier d'une langue ne les donne pas.

### `version`

Le numéro de version suit la forme `majeure.mineure.correctif`, comme `1.2.0`. Une préversion ajoute un tiret et un nom, comme `1.2.0-beta.1`.

Hodi compare ce numéro avec celui du registre : quand le registre a un numéro plus haut, l'admin voit qu'une mise à jour est disponible.

### `api`

Ce champ dit pour quelle version de l'API des plugins le plugin est écrit. Aujourd'hui, c'est `2`.

Hodi ne charge pas un plugin écrit pour une autre version : son code attendrait des fonctions que Hodi n'a plus, ou pas encore. Un plugin écrit pour l'API 1 reste listé dans _Serveur › Plugins_, avec un message qui demande de le mettre à jour.

## Pour qui

`audience` dit qui voit le plugin dans un foyer : sa page dans Réglages, ses cartes et ses boutons. Hodi applique la même règle à ses [routes](/fr/guide/server-context/#les-routes) : une personne qui ne voit pas le plugin ne peut pas non plus l'appeler.

<!-- prettier-ignore -->
| Valeur | Qui voit le plugin |
| --- | --- |
| `"all"` | Chaque profil du foyer : adultes, ados et enfants. C'est la valeur par défaut. |
| `"admin"` | L'admin du foyer seulement. |

Avec `"all"`, une route peut quand même adapter sa réponse : `request.who.kind` vaut `"adult"`, `"teen"` ou `"child"`.

## Les réglages

### À quoi ils servent

Un réglage est une valeur que l'admin du serveur peut changer sans toucher au code. Dans Hello world, le réglage `greeting` est le message que le plugin répond.

Le plugin déclare ses réglages dans `plugin.json`. Hodi dessine lui-même leurs lignes, avec ses propres composants, sur la page du plugin dans _Serveur › Plugins_, sous le titre « Options ». Le plugin n'a aucun écran à écrire pour ça.

Voici ce que Hodi dessine pour quatre réglages, un de chaque type :

```json title="plugin.json" render="pluginoptions"
"settings": [
  {
    "key": "greeting",
    "type": "text",
    "default": "Bonjour",
    "maxLength": 40
  },
  {
    "key": "loud",
    "type": "boolean",
    "default": false
  },
  {
    "key": "times",
    "type": "number",
    "default": 1,
    "min": 1,
    "max": 5
  },
  {
    "key": "moment",
    "type": "choice",
    "default": "morning",
    "options": [
      "morning",
      "evening"
    ]
  }
]
```

> **Un plugin a 32 réglages au plus.**

### Les champs d'un réglage

<!-- prettier-ignore -->
| Champ | Type | |
| --- | --- | --- |
| `key` | `string` | Son nom technique, unique dans le plugin : une lettre, puis des lettres et des chiffres, 32 au plus. |
| `type` | `'text' \| 'boolean' \| 'number' \| 'choice'` | Ce qu'il contient, et donc ce que Hodi dessine. |
| `default` | Selon le type | Sa valeur tant que l'admin ne l'a pas changée. |
| `maxLength?` | `number` | Pour `text` : la longueur maximale. 2000 par défaut, et au plus. |
| `min?` et `max?` | `number` | Pour `number` : les bornes. La valeur par défaut doit être entre les deux. |
| `options` | `string[]` | Pour `choice` : les valeurs possibles. Chacune suit les mêmes règles que `key`. |

### Les types de réglage

<!-- prettier-ignore -->
| `type` | Ce que Hodi dessine | `default` |
| --- | --- | --- |
| `"text"` | Un champ de texte | Un texte, comme `"Bonjour"` |
| `"boolean"` | Un interrupteur | `true` ou `false` |
| `"number"` | Un champ de nombre | Un nombre, comme `1` |
| `"choice"` | Des boutons côte à côte, un par option | L'une des `options`, comme `"morning"` |

### Leurs textes

Dans `plugin.json`, un réglage n'a qu'un nom technique, comme `greeting`. Le texte que l'admin lit vient des fichiers `locales/` du plugin, sous la clé `settings` :

```json title="locales/fr.json"
{
  "settings": {
    "greeting": "Message",
    "greetingHint": "Ce que le plugin répond",
    "loud": "En majuscules",
    "times": "Nombre de bonjours",
    "moment": "Moment",
    "momentOptions": {
      "morning": "Matin",
      "evening": "Soir"
    }
  }
}
```

Pour un réglage dont la clé est `greeting` :

- `settings.greeting` est son libellé, en gras sur sa ligne : « Message » ;
- `settings.greetingHint` est sa ligne d'aide, en gris dessous : « Ce que le plugin répond » ;
- pour un `choice`, `settings.momentOptions.morning` est le texte du bouton de l'option `morning`.

La ligne d'aide est facultative. Sans libellé, Hodi affiche la clé elle-même, `greeting`.

### Les lire dans la partie serveur

La partie serveur lit les réglages avec `ctx.settings()`. Cette fonction renvoie un objet avec chaque clé, et sa valeur actuelle : celle que l'admin a choisie, ou la valeur par défaut s'il n'a rien changé.

```tsx title="server/index.ts"
'POST /hello': async (request, ctx) => {
  const { greeting, loud, times } = ctx.settings()
  // greeting = 'Bonjour', loud = false, times = 1 tant que l'admin n'a rien changé
  const text = (loud ? greeting.toUpperCase() : greeting).repeat(times)
  return { body: { text } }
}
```

`ctx.settings()` donne toujours la valeur du moment : quand l'admin change un réglage, l'appel suivant voit déjà la nouvelle valeur.

## Les permissions

### Le principe

Par défaut, un plugin ne peut faire que trois choses : garder ses données dans sa base, lire ses réglages et écrire dans le journal de Hodi.

Pour tout le reste, il demande une **permission** dans `plugin.json`. Lire un site, poser une question à l'IA ou envoyer un e-mail sont des permissions. Un plugin qui n'a pas demandé une permission ne peut pas faire ce qu'elle ouvre : Hodi refuse l'appel, quoi que dise son code.

```json title="plugin.json"
"permissions": {
  "network": [
    "api.example.com"
  ],
  "articles": true,
  "notify": true,
  "ai": true
}
```

Avant d'installer le plugin, l'admin voit la liste de ce qu'il demande, en clair. Voici ce que Hodi affiche pour les permissions ci-dessus :

```json title="Ce que l'admin voit" render="pluginpermissions"
"permissions": {
  "network": [
    "api.example.com"
  ],
  "articles": true,
  "notify": true,
  "ai": true
}
```

L'admin installe le plugin s'il accepte. Le plugin ne peut pas ajouter une permission plus tard sans une nouvelle version, que l'admin installe à nouveau en voyant la nouvelle liste.

### Pour tous les plugins

Ces permissions marchent pour n'importe quel plugin, signé ou non.

<!-- prettier-ignore -->
| Permission | Type | Ce qu'elle ouvre |
| --- | --- | --- |
| `network` | `string[]` | Lire ces sites avec `ctx.fetchText()` et `ctx.http()`. Chaque site est un nom exact, comme `api.example.com`, 20 au plus. Un sous-domaine qui n'est pas listé reste fermé. |
| `articles` | `boolean` | Lire les articles que Hodi a déjà listés, et leur page, avec `ctx.articles`. Le plugin reçoit un id d'article, jamais une adresse à ouvrir. |
| `publicRoutes` | `boolean` | Ouvrir des routes à tout le monde, même sans être connecté, et dessiner des [écrans avant la connexion](/fr/guide/slots/sign-in/). |

### Pour un plugin signé seulement

Ces permissions touchent aux comptes des gens, ou coûtent de l'argent au foyer. Seul un plugin signé, relu par le mainteneur de Hodi, peut les avoir.

<!-- prettier-ignore -->
| Permission | Type | Ce qu'elle ouvre |
| --- | --- | --- |
| `ai` | `boolean` | Poser une question à l'IA du foyer, une seule par clic sur le bouton IA du plugin, avec `ctx.ai.ask()`. |
| `notify` | `boolean` | Envoyer une notification sur les appareils d'une personne, 10 par jour au plus, avec `ctx.notify()`. |
| `mail` | `boolean` | Envoyer un e-mail par le serveur d'e-mail de Hodi, 50 par heure au plus, avec `ctx.mail`. |
| `accounts` | `boolean` | Créer des comptes, les retrouver et vérifier un mot de passe, avec `ctx.accounts`. |
| `households` | `boolean` | Lister et créer des foyers, et suspendre ou supprimer ceux qu'il a créés, avec `ctx.households`. |
| `signIn` | `boolean` | Connecter quelqu'un depuis une route publique, et refuser une connexion avec `checkSignIn`. |

Un plugin non signé qui demande `notify`, `mail`, `accounts`, `households` ou `signIn` est refusé à l'installation. Pour `ai`, il s'installe quand même, mais sans l'IA : son bouton IA ne répond pas.

En développement, avec `hodi-plugin dev`, le plugin garde toutes ses permissions, même sans signature. Elles peuvent donc être testées avant de demander la signature.

## Les autres champs

### `menu`

Ce champ dit où placer la page du plugin dans Réglages. Il ne sert qu'au plugin qui a une page à lui, déclarée par `page` dans la partie web.

```json title="plugin.json"
"menu": {
  "group": "you",
  "after": "stats"
}
```

- `group` : le groupe de Réglages, comme `you` pour « Toi ».
- `after` : l'entrée après laquelle la page se place, comme `stats`.

Sans `menu`, ou avec un groupe inconnu, la page va à la fin du groupe Foyer. [Réglages](/fr/guide/slots/settings/) liste les groupes.

### `feeds`

Ce champ déclare les flux d'articles que le plugin propose, 5 au plus. Un foyer les suit comme n'importe quelle autre source. [Flux](/fr/guide/slots/feeds/) montre un exemple complet.

### `memoryMb`

Ce champ donne la mémoire de la partie serveur, en Mo. Elle vaut 16 par défaut, et 32 au plus. Un plugin ne l'augmente que s'il en a vraiment besoin : tous les plugins se partagent la mémoire du serveur.

### `publicPages`

Ce champ liste les adresses des pages publiques du plugin que les moteurs de recherche peuvent lire, 20 au plus. Il demande la permission `publicRoutes`. Chaque adresse a sa langue, et peut avoir son titre, sa description et son image de partage.

```json title="plugin.json"
"publicPages": {
  "defaults": {
    "title": "Hodi, l'actu de toute la famille",
    "image": "assets/share.png"
  },
  "routes": [
    {
      "path": "/",
      "lang": "fr"
    },
    {
      "path": "/en",
      "lang": "en"
    }
  ]
}
```

- `defaults` : le titre, la description et l'image par défaut.
- `routes` : chaque adresse, avec sa langue en deux lettres.

Une page sans titre, description ou image à elle prend ceux de `defaults`. Le titre a 70 caractères au plus, la description 200. L'image est un fichier `.png`, `.jpg` ou `.webp` du dossier `assets/`, en 1200 × 630.
