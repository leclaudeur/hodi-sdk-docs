---
title: "The server context"
description: "The server part exports a `ServerPlugin`: its migrations, its routes, its tasks and its hooks."
intro: "The server part exports a `ServerPlugin`: its migrations, its routes, its tasks and its hooks. Each of them gets `ctx`, the context Hodi gives it: it is the only way it touches the rest of the world, its database as well as sites and accounts."
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

## Its migrations

`migrations` lists the changes to its database, in order. Hodi applies the missing ones at every start. Once published, a migration is never changed nor moved: add the next one at the end of the list, even to fix a mistake.

## Its routes

A route is written `'METHOD /path'`, with `:name` for a variable part: `'GET /notes/:id'` gives `request.params.id`. Hodi serves routes in three places:

- `routes`: to the profiles in its `audience`, with `usePluginApi()`.
- `serverRoutes`: to the server admin only, with `usePluginServerApi()`.
- `publicRoutes`: to everyone, with `usePluginPublicApi()` and its permission.

A route gets `request`: its method, its path, its `params`, its `query` and its `body` in JSON. It answers with an object, with a `status` (200 by default) and a `body`. Hodi only lets 2xx and 4xx statuses through; a route that crashes answers 500, and its error goes to the log.

A route can also answer with a zip, which Hodi builds and sends as a download. A `raw` route gets bytes, such as an image, up to 10 MB. Both are in [types](/en/types/).

## Who is asking

`request.who` says who is asking, as Hodi checked it: their profile, their household, their kind, and whether they are the household's or the server's admin. No cookie, no header of the request ever reaches the plugin.

A single database serves every household on the server: keep their data apart with `who.householdId`, in every table and every query.

A route that deletes data or changes an account takes `proof: true`. Hodi only runs it after the person has typed their password in its window, `askToConfirm()` on the web side. Without it, the route answers 403 without having run.

## For every plugin

- `ctx.db`: its database, with `query`, `get` and `run`, and `?` parameters.
- `ctx.settings()`: its settings as they are now.
- `ctx.log()`: a line in Hodi's log, which `hodi-plugin dev` shows.
- `ctx.serverSettings()`: how many days Hodi keeps an article, a video, a backup.

## With a permission

- `ctx.fetchText()`: a page from a site in `network`, as text.
- `ctx.http()`: a request to those sites, with a body, such as an OAuth exchange.
- `ctx.articles`: an article Hodi has listed, and its page as the site serves it.
- `ctx.ai.ask()`: a question to the household's AI, once per click; see below.
- `ctx.notify()`: a notification on a person's devices, 10 per day at most.
- `ctx.mail`: an e-mail through _Server › E-mail_, 50 per hour at most.
- `ctx.accounts` and `ctx.households`: find, create and check accounts and households.

`ctx.fetchText()` and `ctx.http()` only go through the listed sites, and refuse a redirect to another one. A body or an `Authorization` header only goes out over https.

## AI, only on a click

Hodi never asks the AI unless someone clicked. On the web side, `AiButton` gives the name of an action; on the server side, that action is the only place where `ctx.ai.ask()` answers.

```tsx title="server/index.ts"
aiActions: {
  summarize: async ({ input, who }, ctx) => {
    const text = await ctx.ai.ask({ prompt: `Summarise: ${input.text}`, maxTokens: 300 })
    return { text }
  }
}
```

One question per click, 8000 characters at most, counted against the household's cap and within 10 per hour for the plugin. The plugin never sees the key, the provider or the model.

## What runs by itself

- `tasks`: a job every 15 minutes up to every week, such as deleting what has expired.
- `onArticle`: told about each new article Hodi reads from a site.
- `feeds`: the articles of its [feeds](/en/guide/slots/feeds/), read every few minutes.
- `checkSignIn`: called at every [sign-in](/en/guide/slots/sign-in/), it can refuse it.

A task runs for no household: there, `ctx` refuses whatever needs a household or a person, such as AI. Hodi remembers when it started, so a restart doesn't run it again too early.

## People's data

When a profile, an account or a household goes away, Hodi calls `onProfileDeleted`, `onAccountDeleted` or `onHouseholdRemoved`. Delete what you kept about them: Hodi tries again every minute as long as it fails, so make sure it works twice in a row.

`exportData` adds what the plugin keeps about a person to the copy they download in _Settings › Account and data_, as JSON of 512 KB at most.
