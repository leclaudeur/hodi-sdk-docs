---
title: "Le contexte serveur"
description: "Ce que la partie serveur d'un plugin exporte (routes, migrations, tâches, hooks) et tout ce que `ctx` lui donne."
intro: "La partie serveur d'un plugin exporte un objet `ServerPlugin` : ses routes, sa base, ses tâches et ses hooks. Chacun reçoit `ctx`, le contexte que Hodi lui donne. C'est par `ctx`, et par lui seul, que le plugin lit sa base, ses réglages, un site ou l'IA du foyer."
order: 4
icon: "braces"
---

## Un exemple complet

Ce plugin compte les bonjours de chaque foyer. Il crée une table, et sa route `POST /hello` y ajoute une ligne à chaque appel, puis répond le message et le nombre de bonjours du foyer.

```tsx title="server/index.ts"
import type { ServerPlugin } from '@hodi-app/plugin-sdk/server'

const plugin: ServerPlugin = {
  migrations: [
    'CREATE TABLE said (household INTEGER NOT NULL, at TEXT NOT NULL)'
  ],
  routes: {
    'POST /hello': async (request, ctx) => {
      const { greeting } = ctx.settings()
      const household = request.who.householdId
      ctx.db.run('INSERT INTO said VALUES (?, ?)', [household, new Date().toISOString()])
      const row = ctx.db.get('SELECT COUNT(*) AS count FROM said WHERE household = ?', [household])
      return { body: { text: greeting, count: row?.count } }
    }
  }
}

export default plugin
```

Le reste de cette page explique chaque morceau : `migrations`, `routes`, `request`, `ctx` et sa réponse.

## Ce que le plugin exporte

`ServerPlugin` a ces champs, tous facultatifs. Un plugin n'écrit que ceux dont il a besoin.

<!-- prettier-ignore -->
| Champ | |
| --- | --- |
| `migrations` | Les changements de sa base, dans l'ordre. |
| `routes` | Les routes appelées par la partie web, pour les profils du foyer. |
| `serverRoutes` | Les routes de l'espace Serveur, pour l'admin du serveur. |
| `publicRoutes` | Les routes ouvertes à tous, même sans être connecté. |
| `aiActions` | Ce que fait chaque bouton IA du plugin. |
| `tasks` | Les travaux qui reviennent tout seuls, comme un ménage. |
| `feeds` | Les articles de ses flux. |
| `onArticle` | Appelé pour chaque nouvel article que Hodi lit. |
| `checkSignIn` | Appelé à chaque connexion, pour l'accepter ou la refuser. |
| `onProfileDeleted` | Appelé quand un profil est supprimé, pour effacer ce que le plugin garde de lui. |
| `onAccountDeleted` | Appelé quand un compte est supprimé, pour effacer ce que le plugin garde de lui. |
| `onHouseholdRemoved` | Appelé quand un foyer est supprimé, pour effacer ce que le plugin garde de lui. |
| `exportData` | Ce que le plugin garde d'une personne, pour sa copie de données. |

## Sa base de données

### Une base rien qu'à lui

Chaque plugin a son propre fichier SQLite, à part de la base de Hodi. Il y crée les tables qu'il veut, avec les noms qu'il veut : aucun autre plugin ne les voit, et le plugin ne voit pas celles de Hodi.

### Les migrations

Une migration est une instruction SQL qui change la structure de la base : créer une table, ajouter une colonne… `migrations` les liste dans l'ordre :

```tsx title="server/index.ts"
migrations: [
  'CREATE TABLE said (household INTEGER NOT NULL, at TEXT NOT NULL)',
  'ALTER TABLE said ADD COLUMN profile INTEGER'
]
```

À chaque démarrage, Hodi regarde combien de migrations il a déjà appliquées pour ce plugin, et applique les suivantes. Ici, une installation neuve applique les deux. Une installation qui avait déjà la première n'applique que la seconde.

Hodi repère les migrations par leur place dans la liste. Une fois une version du plugin publiée, ses migrations ne changent donc plus :

1. Ne jamais modifier une migration déjà publiée.
2. Ne jamais en supprimer, ni en déplacer.
3. Ajouter toujours la suivante au bout de la liste.

Pour corriger une erreur dans une migration publiée, il faut en ajouter une nouvelle qui la corrige.

### Lire et écrire

`ctx.db` a trois fonctions. Chacune prend une requête SQL et ses paramètres, écrits `?` dans la requête :

<!-- prettier-ignore -->
| Fonction | Renvoie | Pour |
| --- | --- | --- |
| `ctx.db.query(sql, params)` | Toutes les lignes, un objet par ligne | Un `SELECT` qui renvoie plusieurs lignes |
| `ctx.db.get(sql, params)` | La première ligne, ou `null` | Un `SELECT` qui renvoie une seule ligne |
| `ctx.db.run(sql, params)` | `{ changes, lastInsertRowid }` | Un `INSERT`, un `UPDATE` ou un `DELETE` |

```tsx title="server/index.ts"
const rows = ctx.db.query('SELECT at FROM said WHERE household = ? ORDER BY at DESC', [household])
// rows = [{ at: '2026-11-13T09:12:00.000Z' }, { at: '2026-11-12T18:40:00.000Z' }]
```

Les valeurs passent toujours par des `?`, jamais collées dans le texte de la requête. SQLite les reçoit alors à part, et une valeur tapée par quelqu'un ne peut pas changer la requête.

### Une base pour tous les foyers

Un même serveur Hodi peut accueillir plusieurs foyers, et le plugin n'a qu'une base pour tous. C'est au plugin de séparer leurs données :

- chaque table qui contient des données d'un foyer a une colonne pour lui, comme `household` ;
- chaque requête filtre sur cette colonne, avec `request.who.householdId`.

Sans ce filtre, un foyer verrait les données des autres.

## Les routes

### Déclarer une route

Une route est une fonction que la partie web peut appeler. Elle a une clé, `'MÉTHODE /chemin'`, et une fonction qui reçoit la requête et `ctx` :

```tsx title="server/index.ts"
routes: {
  'GET /notes': async (request, ctx) => {
    const notes = ctx.db.query('SELECT id, text FROM notes WHERE household = ?', [request.who.householdId])
    return { body: notes }
  },
  'DELETE /notes/:id': async (request, ctx) => {
    ctx.db.run('DELETE FROM notes WHERE id = ? AND household = ?', [request.params.id, request.who.householdId])
    return { status: 204 }
  }
}
```

La méthode est `GET`, `POST`, `PUT`, `PATCH` ou `DELETE`. Une partie du chemin qui commence par `:` est variable : pour `/notes/12`, `request.params.id` vaut `'12'`.

### Trois sortes de routes

Hodi sert les routes à trois endroits, chacun pour d'autres personnes :

<!-- prettier-ignore -->
| Champ | Qui peut l'appeler | Appelée avec |
| --- | --- | --- |
| `routes` | Les profils du foyer prévus par `audience` | `usePluginApi()` |
| `serverRoutes` | L'admin du serveur seulement | `usePluginServerApi()` |
| `publicRoutes` | Tout le monde, même sans être connecté | `usePluginPublicApi()`, avec la permission `publicRoutes` |

Une route publique ne sait pas qui l'appelle : `request.who` y vaut `null`. Hodi y limite chaque adresse à 30 requêtes par minute, et refuse une requête venue d'un autre site.

### Ce que la route reçoit

<!-- prettier-ignore -->
| Champ de `request` | Type | |
| --- | --- | --- |
| `method` | `string` | La méthode, comme `'POST'`. |
| `path` | `string` | Le chemin sous celui du plugin, comme `/notes/12`. |
| `params` | `Record<string, string>` | Les parties variables du chemin. |
| `query` | `Record<string, string>` | Les paramètres après le `?` de l'adresse. |
| `body` | `unknown` | Le JSON envoyé, ou `null`. |
| `who` | `PluginCaller` | Qui demande, tel que Hodi l'a vérifié. |

### Qui demande

`request.who` décrit la personne qui appelle. Hodi l'a déjà vérifié : la route peut s'y fier sans rien contrôler elle-même.

<!-- prettier-ignore -->
| Champ de `who` | Type | |
| --- | --- | --- |
| `profileId` | `number \| null` | Le profil ouvert sur l'appareil. |
| `householdId` | `number \| null` | Le foyer pour lequel la personne demande. |
| `kind` | `'adult' \| 'teen' \| 'child'` | Adulte, ado ou enfant. |
| `householdAdmin` | `boolean` | La personne est l'admin du foyer. |
| `serverAdmin` | `boolean` | La personne est l'admin du serveur. |
| `accountId` | `number \| null` | Le compte connecté sur l'appareil. |

Aucun cookie et aucun en-tête de la requête n'arrive jusqu'au plugin. Il ne peut donc pas réutiliser la session de quelqu'un.

### Ce que la route répond

Une route répond un objet avec deux champs, tous deux facultatifs :

- `status` : le code HTTP, 200 par défaut ;
- `body` : n'importe quelle valeur JSON, que la partie web lit avec `answer.json()`.

```tsx title="server/index.ts"
return { status: 400, body: { error: 'too_long' } }
```

Hodi ne laisse passer que les codes 2xx et 4xx. Si la route plante, ou répond un autre code, la partie web reçoit 500, et l'erreur va dans le journal de Hodi.

Deux autres réponses existent : un zip que Hodi construit et envoie en téléchargement, et une route `raw` qui reçoit des octets, comme une image, jusqu'à 10 Mo. [Types](/fr/types/) les décrit.

### Une route sensible

Une route qui efface des données ou change un compte doit demander une preuve que c'est bien la personne. Avec `proof: true`, Hodi ne lance la route qu'après que la personne a retapé son mot de passe :

```tsx title="server/index.ts"
routes: {
  'DELETE /history': {
    proof: true,
    handler: async (request, ctx) => {
      ctx.db.run('DELETE FROM said WHERE household = ?', [request.who.householdId])
      return { status: 204 }
    }
  }
}
```

Côté web, `askToConfirm()` ouvre la fenêtre de Hodi qui demande le mot de passe. Sans lui, la route répond 403 sans avoir tourné. Le plugin ne voit jamais le mot de passe.

## Ce que `ctx` donne

### À chaque plugin

<!-- prettier-ignore -->
| | |
| --- | --- |
| `ctx.db` | Sa base, avec `query`, `get` et `run`. |
| `ctx.settings()` | Ses [réglages](/fr/guide/manifest/#les-réglages), avec leur valeur actuelle. |
| `ctx.log(message)` | Une ligne dans le journal de Hodi, que `hodi-plugin dev` affiche aussi. |
| `ctx.serverSettings()` | Combien de jours Hodi garde un article, une vidéo et une copie de sauvegarde. |

### Avec une permission

Chacune de ces fonctions ne marche que si le plugin a la [permission](/fr/guide/manifest/#les-permissions) indiquée. Sinon, Hodi refuse l'appel.

<!-- prettier-ignore -->
| | Permission | |
| --- | --- | --- |
| `ctx.fetchText(url)` | `network` | Lit une page d'un site listé, et renvoie son texte. |
| `ctx.http(url, options)` | `network` | Envoie une requête à un site listé, avec un corps, comme un échange OAuth. |
| `ctx.articles` | `articles` | Retrouve un article listé par Hodi, et sa page. |
| `ctx.ai.ask(question)` | `ai` | Pose une question à l'IA du foyer, une fois par clic. |
| `ctx.notify(notice)` | `notify` | Envoie une notification à une personne, 10 par jour au plus. |
| `ctx.mail.send(message)` | `mail` | Envoie un e-mail, 50 par heure au plus. |
| `ctx.accounts` | `accounts` | Retrouve, crée et vérifie des comptes. |
| `ctx.households` | `households` | Liste et crée des foyers. |

`ctx.fetchText()` et `ctx.http()` ne joignent que les sites listés dans `network`. Ils refusent une redirection vers un autre site, et n'envoient un corps ou un en-tête `Authorization` qu'en https.

```tsx title="server/index.ts"
const { text } = await ctx.fetchText('https://api.example.com/weather?city=Brussels')
const weather = JSON.parse(text)
```

## L'IA, seulement sur un clic

Une question à l'IA coûte de l'argent au foyer. Hodi ne la pose donc jamais sans que quelqu'un ait cliqué. Voici comment ça marche :

1. La partie web affiche un `AiButton`, avec le nom d'une action, comme `summarize`.
2. La personne clique sur ce bouton.
3. Hodi appelle l'action `summarize` de `aiActions`, côté serveur.
4. L'action peut appeler `ctx.ai.ask()` une seule fois.
5. Ce qu'elle répond revient au bouton.

```tsx title="server/index.ts"
aiActions: {
  summarize: async ({ input, who }, ctx) => {
    const text = await ctx.ai.ask({ prompt: `Résume : ${input.text}`, maxTokens: 300 })
    return { text }
  }
}
```

`ctx.ai.ask()` ne répond que dans une action de `aiActions`. Ailleurs, dans une route ou une tâche, il refuse.

Une question fait 8000 caractères au plus. Elle compte dans le plafond quotidien du foyer, et dans une limite de 10 par heure pour le plugin. Le plugin ne voit jamais la clé de l'IA, ni le fournisseur, ni le modèle.

## Ce qui tourne tout seul

### Les tâches

Une tâche est un travail que Hodi lance tout seul, à intervalle régulier, comme effacer chaque nuit ce qui a expiré :

```tsx title="server/index.ts"
tasks: {
  'clean-up': {
    every: 24 * 60,
    run: async ctx => {
      ctx.db.run("DELETE FROM said WHERE at < datetime('now', '-30 days')")
    }
  }
}
```

- `every` : le nombre de minutes entre deux lancements, de 15 à une semaine (10 080).
- `run` : le travail, qui reçoit `ctx`.

Hodi retient quand chaque tâche a démarré. Un redémarrage ne la relance donc pas trop tôt.

Une tâche ne tourne pour aucun foyer ni aucune personne. `ctx` y refuse donc ce qui en demande un, comme l'IA ou une notification.

### Les autres hooks

- **`onArticle`** : appelé pour chaque nouvel article que Hodi lit sur un site, avec cet article.
- **`feeds`** : fournit les articles des [flux](/fr/guide/slots/feeds/) du plugin, lus toutes les quelques minutes.
- **`checkSignIn`** : appelé à chaque [connexion](/fr/guide/slots/sign-in/), il peut la refuser.

## Les données des gens

### Effacer

Quand quelqu'un quitte Hodi, le plugin doit effacer ce qu'il gardait de cette personne. Hodi appelle pour ça :

- `onProfileDeleted` quand un profil est supprimé ;
- `onAccountDeleted` quand un compte est supprimé ;
- `onHouseholdRemoved` quand un foyer entier disparaît.

```tsx title="server/index.ts"
onHouseholdRemoved: async ({ householdId }, ctx) => {
  ctx.db.run('DELETE FROM said WHERE household = ?', [householdId])
}
```

Si le hook échoue, Hodi réessaie chaque minute jusqu'à ce qu'il réussisse. Il peut donc tourner deux fois pour la même personne : il doit marcher même si les données sont déjà effacées.

### Copier

Dans _Réglages › Compte et données_, chaque personne peut télécharger une copie de ses données. `exportData` y ajoute ce que le plugin garde d'elle, en JSON de 512 Ko au plus :

```tsx title="server/index.ts"
exportData: async ({ profileId }, ctx) => ({
  notes: ctx.db.query('SELECT text, at FROM notes WHERE profile = ?', [profileId])
})
```
