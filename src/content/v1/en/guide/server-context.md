---
title: "The server context"
description: "What a plugin's server part exports (routes, migrations, tasks, hooks) and everything `ctx` gives it."
intro: "A plugin's server part exports a `ServerPlugin` object: its routes, its database, its tasks and its hooks. Each of them receives `ctx`, the context Hodi gives it. Through `ctx`, and through it alone, the plugin reads its database, its settings, a site or the household's AI."
order: 4
icon: "braces"
---

## A whole example

This plugin counts each household's hellos. It creates a table, and its `POST /hello` route adds a row to it at each call, then answers the message and the household's number of hellos.

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

The rest of this page explains each piece: `migrations`, `routes`, `request`, `ctx` and the answer.

## What the plugin exports

`ServerPlugin` has these fields, all optional. A plugin only writes those it needs.

<!-- prettier-ignore -->
| Field | |
| --- | --- |
| `migrations` | The changes to its database, in order. |
| `routes` | The routes the web part calls, for the household's profiles. |
| `serverRoutes` | The routes of the Server space, for the server admin. |
| `publicRoutes` | The routes open to everyone, even signed out. |
| `aiActions` | What each AI button of the plugin does. |
| `tasks` | The work that comes back on its own, such as a clean-up. |
| `feeds` | The articles of its feeds. |
| `onArticle` | Called for each new article Hodi reads. |
| `checkSignIn` | Called at each sign-in, to accept or refuse it. |
| `onProfileDeleted` | Called when a profile is deleted, to erase what the plugin keeps about it. |
| `onAccountDeleted` | Called when an account is deleted, to erase what the plugin keeps about it. |
| `onHouseholdRemoved` | Called when a household is removed, to erase what the plugin keeps about it. |
| `exportData` | What the plugin keeps about a person, for their copy of their data. |

## Its database

### A database of its own

Each plugin has its own SQLite file, apart from Hodi's database. It creates the tables it wants there, with the names it wants: no other plugin sees them, and the plugin doesn't see Hodi's.

### Migrations

A migration is an SQL statement that changes the database's structure: creating a table, adding a column… `migrations` lists them in order:

```tsx title="server/index.ts"
migrations: [
  'CREATE TABLE said (household INTEGER NOT NULL, at TEXT NOT NULL)',
  'ALTER TABLE said ADD COLUMN profile INTEGER'
]
```

At each start, Hodi looks at how many migrations it has already applied for this plugin, and applies the next ones. Here, a new install applies both. An install that already had the first one only applies the second.

Hodi finds migrations by their place in the list. So once a version of the plugin is published, its migrations no longer change:

1. Never change a migration already published.
2. Never delete one, nor move one.
3. Always add the next one at the end of the list.

To fix a mistake in a published migration, a new one that fixes it must be added.

### Reading and writing

`ctx.db` has three functions. Each takes an SQL query and its parameters, written `?` in the query:

<!-- prettier-ignore -->
| Function | What it is for |
| --- | --- |
| `ctx.db.query(sql, params)` | For a `SELECT` that returns several rows. It returns all the rows, one object per row. |
| `ctx.db.get(sql, params)` | For a `SELECT` that returns a single row. It returns the first row, or `null`. |
| `ctx.db.run(sql, params)` | For an `INSERT`, an `UPDATE` or a `DELETE`. It returns `{ changes, lastInsertRowid }`. |

```tsx title="server/index.ts"
const rows = ctx.db.query('SELECT at FROM said WHERE household = ? ORDER BY at DESC', [household])
// rows = [{ at: '2026-11-13T09:12:00.000Z' }, { at: '2026-11-12T18:40:00.000Z' }]
```

Values always go through `?`, never pasted into the query's text. SQLite then receives them apart, and a value someone typed can't change the query.

### One database for every household

A single Hodi server can host several households, and the plugin has one database for all of them. It is up to the plugin to keep their data apart:

- each table that holds a household's data has a column for it, such as `household`;
- each query filters on that column, with `request.who.householdId`.

Without this filter, a household would see the others' data.

## Routes

### Declaring a route

A route is a function the web part can call. It has a key, `'METHOD /path'`, and a function that receives the request and `ctx`:

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

The method is `GET`, `POST`, `PUT`, `PATCH` or `DELETE`. A part of the path that starts with `:` varies: for `/notes/12`, `request.params.id` is `'12'`.

### Three kinds of routes

Hodi serves routes in three places, each for other people:

<!-- prettier-ignore -->
| Field | Who can call these routes |
| --- | --- |
| `routes` | The household's profiles in `audience`. The web part calls them with `usePluginApi()`. |
| `serverRoutes` | The server admin only. The web part calls them with `usePluginServerApi()`. |
| `publicRoutes` | Everyone, even signed out. The web part calls them with `usePluginPublicApi()`, and it needs the `publicRoutes` permission. |

A public route doesn't know who calls it: `request.who` is `null` there. Hodi limits each address to 30 requests a minute there, and refuses a request coming from another site.

### What the route receives

<!-- prettier-ignore -->
| `request` field | Type | |
| --- | --- | --- |
| `method` | `string` | The method, such as `'POST'`. |
| `path` | `string` | The path under the plugin's, such as `/notes/12`. |
| `params` | `Record<string, string>` | The parts of the path that vary. |
| `query` | `Record<string, string>` | The parameters after the address's `?`. |
| `body` | `unknown` | The JSON sent, or `null`. |
| `who` | `PluginCaller` | Who is asking, as Hodi checked it. |

### Who is asking

`request.who` describes the person calling. Hodi has already checked it: the route can trust it without checking anything itself.

<!-- prettier-ignore -->
| `who` field | Type | |
| --- | --- | --- |
| `profileId` | `number \| null` | The profile open on the device. |
| `householdId` | `number \| null` | The household the person asks for. |
| `kind` | `'adult' \| 'teen' \| 'child'` | Adult, teen or child. |
| `householdAdmin` | `boolean` | The person is the household's admin. |
| `serverAdmin` | `boolean` | The person is the server's admin. |
| `accountId` | `number \| null` | The account signed in on the device. |

No cookie and no header of the request reaches the plugin. So it can't reuse someone's session.

### What the route answers

A route answers an object with two fields, both optional:

- `status`: the HTTP code, 200 by default;
- `body`: any JSON value, which the web part reads with `answer.json()`.

```tsx title="server/index.ts"
return { status: 400, body: { error: 'too_long' } }
```

Hodi only lets 2xx and 4xx codes through. If the route crashes, or answers another code, the web part receives 500, and the error goes to Hodi's log.

Two other answers exist: a zip that Hodi builds and sends as a download, and a `raw` route that receives bytes, such as an image, up to 10 MB. [Types](/en/types/) describes them.

### A sensitive route

A route that deletes data or changes an account must ask for proof that it really is the person. With `proof: true`, Hodi only runs the route once the person has typed their password again:

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

On the web side, `askToConfirm()` opens Hodi's window that asks for the password. Without it, the route answers 403 without having run. The plugin never sees the password.

## What `ctx` gives

### To every plugin

<!-- prettier-ignore -->
| | |
| --- | --- |
| `ctx.db` | Its database, with `query`, `get` and `run`. |
| `ctx.settings()` | Its [settings](/en/guide/manifest/#the-plugins-settings-settings), with their current value. |
| `ctx.log(message)` | A line in Hodi's log, which `hodi-plugin dev` shows too. |
| `ctx.serverSettings()` | How many days Hodi keeps an article, a video and a backup copy. |

### With a permission

Each of these functions only works if the plugin has the [permission](/en/guide/manifest/#the-plugins-permissions-permissions) shown. Otherwise, Hodi refuses the call.

<!-- prettier-ignore -->
| Function | What it does |
| --- | --- |
| `ctx.fetchText(url)` | Reads a page of a listed site, and returns its text. It needs the `network` permission. |
| `ctx.http(url, options)` | Sends a request to a listed site, with a body, such as an OAuth exchange. It needs the `network` permission. |
| `ctx.articles` | Finds an article Hodi listed, and its page. It needs the `articles` permission. |
| `ctx.ai.ask(question)` | Asks the household's AI a question, once per click. It needs the `ai` permission. |
| `ctx.notify(notice)` | Sends a notification to a person, 10 a day at most. It needs the `notify` permission. |
| `ctx.mail.send(message)` | Sends an e-mail, 50 an hour at most. It needs the `mail` permission. |
| `ctx.accounts` | Finds, creates and checks accounts. It needs the `accounts` permission. |
| `ctx.households` | Lists and creates households. It needs the `households` permission. |

`ctx.fetchText()` and `ctx.http()` only reach the sites listed in `network`. They refuse a redirect to another site, and only send a body or an `Authorization` header over https.

```tsx title="server/index.ts"
const { text } = await ctx.fetchText('https://api.example.com/weather?city=Brussels')
const weather = JSON.parse(text)
```

## The AI, only on a click

A question to the AI costs the household money. So Hodi never asks it unless someone clicked. Here is how it works:

1. The web part shows an `AiButton`, with the name of an action, such as `summarize`.
2. The person clicks this button.
3. Hodi calls the `summarize` action of `aiActions`, on the server.
4. The action may call `ctx.ai.ask()` once.
5. What it answers goes back to the button.

```tsx title="server/index.ts"
aiActions: {
  summarize: async ({ input, who }, ctx) => {
    const text = await ctx.ai.ask({ prompt: `Summarise: ${input.text}`, maxTokens: 300 })
    return { text }
  }
}
```

`ctx.ai.ask()` only answers in an action of `aiActions`. Elsewhere, in a route or a task, it refuses.

A question is 8000 characters at most. It counts towards the household's daily cap, and a limit of 10 an hour for the plugin. The plugin never sees the AI's key, nor the provider, nor the model.

## What runs on its own

### Tasks

A task is work Hodi starts on its own, at a regular interval, such as deleting what has expired every night:

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

- `every`: the number of minutes between two runs, from 15 to a week (10,080).
- `run`: the work, which receives `ctx`.

Hodi remembers when each task started. So a restart doesn't run it again too early.

A task runs for no household and no person. So `ctx` refuses there what needs one, such as the AI or a notification.

### The other hooks

- **`onArticle`**: called for each new article Hodi reads on a site, with that article.
- **`feeds`**: provides the articles of the plugin's [feeds](/en/guide/slots/feeds/), read every few minutes.
- **`checkSignIn`**: called at each sign-in (see [`signInExtras`](/en/guide/slots/sign-in/)), it can refuse it.

## People's data

### Deleting

When someone leaves Hodi, the plugin must delete what it kept about that person. Hodi calls for that:

- `onProfileDeleted` when a profile is deleted;
- `onAccountDeleted` when an account is deleted;
- `onHouseholdRemoved` when a whole household goes away.

```tsx title="server/index.ts"
onHouseholdRemoved: async ({ householdId }, ctx) => {
  ctx.db.run('DELETE FROM said WHERE household = ?', [householdId])
}
```

If the hook fails, Hodi tries again every minute until it succeeds. So it may run twice for the same person: it must work even if the data is already deleted.

### Copying

In _Settings › Account and data_, each person can download a copy of their data. `exportData` adds what the plugin keeps about them, as JSON of 512 KB at most:

```tsx title="server/index.ts"
exportData: async ({ profileId }, ctx) => ({
  notes: ctx.db.query('SELECT text, at FROM notes WHERE profile = ?', [profileId])
})
```
