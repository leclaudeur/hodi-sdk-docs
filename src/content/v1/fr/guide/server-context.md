---
title: "Le contexte serveur"
description: "Ce que la partie serveur d'un plugin exporte (routes, migrations, tâches, hooks) et tout ce que `ctx` lui donne."
intro: "La partie serveur d'un plugin exporte un objet `ServerPlugin` : ses routes, sa base, ses tâches et ses hooks. Chacun reçoit `ctx`, le contexte que Hodi lui donne. C'est par `ctx`, et par lui seul, que le plugin lit sa base, ses réglages, un site ou l'IA de la personne qui clique."
order: 4
icon: "braces"
---

## Un exemple complet

Ce plugin compte les bonjours de chaque personne. Il crée une table, et sa route `POST /hello` y ajoute une ligne à chaque appel, puis répond le message et le nombre de bonjours de cette personne.

```tsx title="server/index.ts"
import type { ServerPlugin } from '@hodi-app/plugin-sdk/server'

const plugin: ServerPlugin = {
  migrations: [
    'CREATE TABLE said (profile INTEGER NOT NULL, at TEXT NOT NULL)'
  ],
  routes: {
    'POST /hello': async (request, ctx) => {
      const { greeting } = ctx.settings()
      const profile = request.who.profileId
      ctx.db.run('INSERT INTO said VALUES (?, ?)', [profile, new Date().toISOString()])
      const row = ctx.db.get('SELECT COUNT(*) AS count FROM said WHERE profile = ?', [profile])
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
| `routes` | Les routes appelées par la partie web, pour les personnes connectées. |
| `serverRoutes` | Les routes de l'espace Serveur, pour l'admin du serveur. |
| `publicRoutes` | Les routes ouvertes à tous, même sans être connecté. |
| `aiActions` | Ce que fait chaque bouton IA du plugin. |
| `tasks` | Les travaux qui reviennent tout seuls, comme un ménage. |
| `feeds` | Les articles de ses flux. |
| `onArticle` | Appelé pour chaque nouvel article que Hodi lit. |
| `checkSignIn` | Appelé à chaque connexion, pour l'accepter ou la refuser. |
| `onProfileDeleted` | Appelé quand un profil est supprimé, pour effacer ce que le plugin garde de lui. |
| `onAccountDeleted` | Appelé quand un compte est supprimé, pour effacer ce que le plugin garde de lui. |
| `exportData` | Ce que le plugin garde d'une personne, pour sa copie de données. |

## Sa base de données

### Une base rien qu'à lui

Chaque plugin a son propre fichier SQLite, à part de la base de Hodi. Il y crée les tables qu'il veut, avec les noms qu'il veut : aucun autre plugin ne les voit, et le plugin ne voit pas celles de Hodi.

### Les migrations

Une migration est une instruction SQL qui change la structure de la base : créer une table, ajouter une colonne… `migrations` les liste dans l'ordre :

```tsx title="server/index.ts"
migrations: [
  'CREATE TABLE said (profile INTEGER NOT NULL, at TEXT NOT NULL)',
  'ALTER TABLE said ADD COLUMN greeting TEXT'
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
| Fonction | À quoi elle sert |
| --- | --- |
| `ctx.db.query(sql, params)` | Pour un `SELECT` qui renvoie plusieurs lignes. Elle renvoie toutes les lignes, un objet par ligne. |
| `ctx.db.get(sql, params)` | Pour un `SELECT` qui renvoie une seule ligne. Elle renvoie la première ligne, ou `null`. |
| `ctx.db.run(sql, params)` | Pour un `INSERT`, un `UPDATE` ou un `DELETE`. Elle renvoie `{ changes, lastInsertRowid }`. |

```tsx title="server/index.ts"
const rows = ctx.db.query('SELECT at FROM said WHERE profile = ? ORDER BY at DESC', [profile])
// rows = [{ at: '2026-11-13T09:12:00.000Z' }, { at: '2026-11-12T18:40:00.000Z' }]
```

Les valeurs passent toujours par des `?`, jamais collées dans le texte de la requête. SQLite les reçoit alors à part, et une valeur tapée par quelqu'un ne peut pas changer la requête.

### Une base pour tout le serveur

Un même serveur Hodi accueille plusieurs personnes et plusieurs familles, et le plugin n'a qu'une base pour tous. C'est au plugin de séparer leurs données :

- chaque table qui contient des données d'une personne a une colonne pour elle, comme `profile` ou `account` ;
- chaque requête filtre sur cette colonne, avec `request.who.profileId` ou `request.who.accountId`.

Sans ce filtre, une personne verrait les données des autres.

## Les routes

### Déclarer une route

Une route est une fonction que la partie web peut appeler. Elle a une clé, `'MÉTHODE /chemin'`, et une fonction qui reçoit la requête et `ctx` :

```tsx title="server/index.ts"
routes: {
  'GET /notes': async (request, ctx) => {
    const notes = ctx.db.query('SELECT id, text FROM notes WHERE profile = ?', [request.who.profileId])
    return { body: notes }
  },
  'DELETE /notes/:id': async (request, ctx) => {
    ctx.db.run('DELETE FROM notes WHERE id = ? AND profile = ?', [request.params.id, request.who.profileId])
    return { status: 204 }
  }
}
```

La méthode est `GET`, `POST`, `PUT`, `PATCH` ou `DELETE`. Une partie du chemin qui commence par `:` est variable : pour `/notes/12`, `request.params.id` vaut `'12'`.

### Trois sortes de routes

Hodi sert les routes à trois endroits, chacun pour d'autres personnes :

<!-- prettier-ignore -->
| Champ | Qui peut appeler ces routes |
| --- | --- |
| `routes` | Les personnes connectées prévues par `audience`. La partie web les appelle avec `usePluginApi()`. |
| `serverRoutes` | L'admin du serveur seulement. La partie web les appelle avec `usePluginServerApi()`. |
| `publicRoutes` | Tout le monde, même sans être connecté. La partie web les appelle avec `usePluginPublicApi()`, et il faut la permission `publicRoutes`. |

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
| `kind` | `'adult' \| 'teen' \| 'child'` | Adulte, ado ou enfant. |
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
      ctx.db.run('DELETE FROM said WHERE profile = ?', [request.who.profileId])
      return { status: 204 }
    }
  }
}
```

Côté web, `askToConfirm()` ouvre la fenêtre de Hodi qui demande le mot de passe. Sans lui, la route répond 403 sans avoir tourné. Le plugin ne voit jamais le mot de passe.

## Ce que le contexte donne

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
| Fonction | Ce qu'elle fait |
| --- | --- |
| `ctx.fetchText(url)` | Lit une page d'un site listé, et renvoie son texte. Il faut la permission `network`. |
| `ctx.http(url, options)` | Envoie une requête à un site listé, avec un corps, comme un échange OAuth. Il faut la permission `network`. |
| `ctx.articles` | Retrouve un article listé par Hodi, et sa page. Il faut la permission `articles`. |
| `ctx.ai.ask(question)` | Pose une question à l'IA de la personne qui clique, une fois par clic. Il faut la permission `ai`. |
| `ctx.notify(notice)` | Envoie une notification à une personne, 10 par jour et 3 par heure au plus. Il faut la permission `notify`. |
| `ctx.notifyServerAdmin(type, notice)` | Prévient l'admin du serveur d'un événement d'une des sortes de [`serverNotifications`](/fr/guide/manifest/#servernotifications), 50 par jour au plus. Il faut la permission `notify`. |
| `ctx.serverNoticeHandled(key)` | Sort de _À traiter_ la demande de cette clé. Il faut la permission `notify`. |
| `ctx.mail.send(message)` | Envoie un e-mail, 50 par heure au plus. Il faut la permission `mail`. |
| `ctx.accounts` | Retrouve, crée et vérifie des comptes, et gère ceux que le plugin a créés. Il faut la permission `accounts`. |

`ctx.articles` ne répond que pour une personne qui lit : dans une route de l'app, une action de `aiActions`, `exportData` et `onArticle`. Ailleurs, il refuse avec `no_reader`.

`ctx.notify()` joint le profil avec lequel un compte lit. Dans la route d'une personne ou sur son clic, il ne joint qu'elle et les gens avec qui elle a un lien : sa famille, ou quelqu'un avec qui elle a échangé un partage. Une tâche, un hook, une route publique ou l'espace Serveur joignent n'importe qui.

`ctx.fetchText()` et `ctx.http()` ne joignent que les sites listés dans `network`. Ils refusent une redirection vers un autre site, et n'envoient un corps ou un en-tête `Authorization` qu'en https.

```tsx title="server/index.ts"
const { text } = await ctx.fetchText('https://api.example.com/weather?city=Brussels')
const weather = JSON.parse(text)
```

### Les comptes créés par le plugin

`ctx.accounts.list()` renvoie les comptes que le plugin a créés avec `ctx.accounts.create()`, du plus récent au plus ancien. `create()` accepte aussi `name`, le prénom de la personne tel que _Mon compte_ l'affiche. Le plugin peut suspendre, reprendre ou supprimer chacun d'eux, et aucun autre : pour tout autre compte, celui d'un ado ou d'un enfant, et toujours pour l'admin du serveur, Hodi refuse avec `not_allowed`.

```tsx title="server/index.ts"
serverRoutes: {
  'POST /accounts/:id/suspend': async (request, ctx) => {
    await ctx.accounts.suspend(Number(request.params.id))
    return { status: 204 }
  }
}
```

Un compte suspendu est déconnecté de tous ses appareils : Hodi refuse chacune de ses requêtes et chacune de ses connexions jusqu'à `resume()`. La page de connexion affiche alors le texte de la clé `signIn.suspended` des `locales` du plugin. `remove()` supprime le compte comme _Serveur › Comptes_, et le `onAccountDeleted` de chaque plugin en est prévenu.

### Prévenir l'admin du serveur

`ctx.notifyServerAdmin()` arrive dans _Serveur › À traiter_, puis par e-mail ou par push, selon ce que l'admin a choisi pour cette sorte dans _Serveur › Alertes_. Le titre fait 80 caractères au plus, le texte 240, en texte brut, en une langue ou une par langue. `path` ouvre une section du plugin dans l'espace Serveur.

Une demande que quelqu'un attend porte une clé `important`, propre au plugin (lettres, chiffres et `. _ : -`, 100 caractères au plus). Elle reste en haut, sous _À traiter_, et la même clé n'est pas envoyée deux fois tant qu'elle attend. Le plugin la sort de là une fois la demande traitée :

```tsx title="server/index.ts"
await ctx.notifyServerAdmin('waitlist', {
  title: {
    fr: 'Nouvelle inscription',
    en: 'New sign-up'
  },
  text: {
    fr: 'Anna attend une invitation.',
    en: 'Anna waits for an invitation.'
  },
  path: 'waitlist',
  important: `waitlist:${id}`
})

// Plus tard, une fois Anna invitée :
await ctx.serverNoticeHandled(`waitlist:${id}`)
```

## L'IA, seulement sur un clic

Une question à l'IA coûte de l'argent à la personne qui clique : elle paie avec sa propre clé. Hodi ne la pose donc jamais sans que quelqu'un ait cliqué. Voici comment ça marche :

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

Une question fait 8000 caractères au plus. Elle compte dans les appels du compte qui clique, et dans une limite de 10 par heure pour ce plugin et ce profil. Le plugin ne voit jamais la clé de l'IA, ni le fournisseur, ni le modèle.

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

Une tâche ne tourne pour aucune personne. `ctx` y refuse donc ce qui en demande une, comme l'IA ou les articles d'un lecteur (`no_reader`).

### Les autres hooks

- **`onArticle`** : appelé pour chaque nouvel article que Hodi lit sur un site, avec cet article.
- **`feeds`** : fournit les articles des [flux](/fr/guide/slots/feeds/) du plugin, lus toutes les quelques minutes.
- **`checkSignIn`** : appelé à chaque connexion (voir [`signInExtras`](/fr/guide/slots/sign-in/)), il peut la refuser.

## Les données des gens

### Effacer

Quand quelqu'un quitte Hodi, le plugin doit effacer ce qu'il gardait de cette personne. Hodi appelle pour ça :

- `onProfileDeleted` quand un profil est supprimé ;
- `onAccountDeleted` quand un compte est supprimé.

Quand le dernier adulte supprime son compte, tout le serveur est effacé : Hodi appelle alors `onProfileDeleted` pour chaque profil et `onAccountDeleted` pour chaque compte.

```tsx title="server/index.ts"
onProfileDeleted: async ({ profileId }, ctx) => {
  ctx.db.run('DELETE FROM said WHERE profile = ?', [profileId])
}
```

Si le hook échoue, Hodi réessaie chaque minute jusqu'à ce qu'il réussisse. Il peut donc tourner deux fois pour la même personne : il doit marcher même si les données sont déjà effacées.

### Copier

Dans _Réglages › Mon compte_, chaque personne peut télécharger une copie de ses données. `exportData` y ajoute ce que le plugin garde d'elle, en JSON de 512 Ko au plus :

```tsx title="server/index.ts"
exportData: async ({ profileId }, ctx) => ({
  notes: ctx.db.query('SELECT text, at FROM notes WHERE profile = ?', [profileId])
})
```
