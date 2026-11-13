---
title: "Le contexte serveur"
description: "La partie serveur exporte un `ServerPlugin` : ses migrations, ses routes, ses tâches et ses hooks."
intro: "La partie serveur exporte un `ServerPlugin` : ses migrations, ses routes, ses tâches et ses hooks. Chacun reçoit `ctx`, le contexte que Hodi lui donne : c'est par lui seul qu'elle touche au reste du monde, à sa base comme aux sites et aux comptes."
order: 4
icon: "braces"
---

```tsx title="server/index.ts"
import type { ServerPlugin } from '@hodi-app/plugin-sdk/server'

const plugin: ServerPlugin = {
  migrations: [
    'CREATE TABLE said (household INTEGER NOT NULL, at TEXT NOT NULL)'
  ],
  routes: {
    'POST /hello': async (request, ctx) => {
      const { greeting } = ctx.settings()
      ctx.db.run('INSERT INTO said VALUES (?, ?)', [request.who.householdId, new Date().toISOString()])
      return { body: { text: greeting } }
    }
  }
}

export default plugin
```

## Ses migrations

`migrations` liste les changements de sa base, dans l'ordre. Hodi applique ceux qui manquent à chaque démarrage. Une fois publiée, une migration ne se modifie plus et ne change plus de place : la suivante s'ajoute au bout de la liste, même pour corriger une erreur.

## Ses routes

Une route s'écrit `'MÉTHODE /chemin'`, avec `:nom` pour une partie variable : `'GET /notes/:id'` donne `request.params.id`. Hodi sert les routes à trois endroits :

- `routes` : aux profils de son `audience`, avec `usePluginApi()`.
- `serverRoutes` : à l'admin du serveur seulement, avec `usePluginServerApi()`.
- `publicRoutes` : à tout le monde, avec `usePluginPublicApi()` et sa permission.

Une route reçoit `request` : sa méthode, son chemin, ses `params`, sa `query` et son `body` en JSON. Elle répond un objet, avec un `status` (200 par défaut) et un `body`. Hodi ne laisse passer que les statuts 2xx et 4xx ; une route qui plante répond 500, et son erreur va dans le journal.

Une route peut aussi répondre un zip, que Hodi construit et envoie en téléchargement. Une route `raw` reçoit des octets, comme une image, jusqu'à 10 Mo. Toutes deux sont dans [types](/fr/types/).

## Qui demande

`request.who` dit qui demande, tel que Hodi l'a vérifié : son profil, son foyer, son type, et s'il est admin du foyer ou du serveur. Aucun cookie, aucun en-tête de la requête n'arrive jusqu'au plugin.

Une seule base sert tous les foyers du serveur : leurs données restent séparées avec `who.householdId`, dans chaque table et chaque requête.

Une route qui efface des données ou change un compte prend `proof: true`. Hodi la lance seulement après que la personne a tapé son mot de passe dans sa fenêtre, `askToConfirm()` côté web. Sans lui, la route répond 403 sans avoir tourné.

## Pour chaque plugin

- `ctx.db` : sa base, avec `query`, `get` et `run`, et des paramètres `?`.
- `ctx.settings()` : ses réglages tels qu'ils sont maintenant.
- `ctx.log()` : une ligne dans le journal de Hodi, que `hodi-plugin dev` affiche.
- `ctx.serverSettings()` : combien de jours Hodi garde un article, une vidéo, une copie.

## Avec une permission

- `ctx.fetchText()` : une page d'un site de `network`, en texte.
- `ctx.http()` : une requête vers ces sites, avec un corps, comme un échange OAuth.
- `ctx.articles` : un article listé par Hodi, et sa page telle que le site la sert.
- `ctx.ai.ask()` : une question à l'IA du foyer, une fois par clic ; voir plus bas.
- `ctx.notify()` : une notification sur les appareils d'une personne, 10 par jour au plus.
- `ctx.mail` : un e-mail par _Serveur › E-mail_, 50 par heure au plus.
- `ctx.accounts` et `ctx.households` : retrouver, créer et vérifier comptes et foyers.

`ctx.fetchText()` et `ctx.http()` ne passent que par les sites listés, et refusent une redirection vers un autre. Un corps ou un en-tête `Authorization` ne part qu'en https.

## L'IA, seulement sur un clic

Hodi ne demande jamais l'IA sans que quelqu'un ait cliqué. Côté web, `AiButton` donne le nom d'une action ; côté serveur, cette action est le seul endroit où `ctx.ai.ask()` répond.

```tsx title="server/index.ts"
aiActions: {
  summarize: async ({ input, who }, ctx) => {
    const text = await ctx.ai.ask({ prompt: `Résume : ${input.text}`, maxTokens: 300 })
    return { text }
  }
}
```

Une question par clic, 8000 caractères au plus, comptée dans le plafond du foyer et dans 10 par heure pour le plugin. Le plugin ne voit jamais la clé, le fournisseur ni le modèle.

## Ce qui tourne tout seul

- `tasks` : un travail toutes les 15 minutes à une semaine, comme effacer ce qui a expiré.
- `onArticle` : prévenu de chaque nouvel article que Hodi lit sur un site.
- `feeds` : les articles de ses [flux](/fr/guide/slots/feeds/), lus toutes les quelques minutes.
- `checkSignIn` : appelé à chaque [connexion](/fr/guide/slots/sign-in/), il peut la refuser.

Une tâche tourne pour aucun foyer : `ctx` y refuse ce qui demande un foyer ou une personne, comme l'IA. Hodi retient quand elle a démarré, donc un redémarrage ne la relance pas trop tôt.

## Les données des gens

Quand un profil, un compte ou un foyer disparaît, Hodi appelle `onProfileDeleted`, `onAccountDeleted` ou `onHouseholdRemoved`. Le plugin efface ce qu'il gardait de lui. Hodi réessaie chaque minute tant que ça échoue : l'effacement doit donc marcher deux fois de suite.

`exportData` ajoute ce que le plugin garde d'une personne à la copie qu'elle télécharge dans _Réglages › Compte et données_, en JSON de 512 Ko au plus.
