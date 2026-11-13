---
title: "Server and web"
description: "The two parts of a Hodi plugin: where each one runs, what it can do and how they talk."
intro: "A plugin adds a feature to Hodi without changing Hodi's code. It has two parts: a server part, which runs on Hodi's server, and a web part, which shows in the browser. This page explains the role of each and how they communicate."
order: 1
icon: "layers"
---

## The two parts of a plugin

The simplest way is to start from an example: the "Hello world" plugin of [Getting started](/en/getting-started/). This plugin adds a "Say hello" button in _Server › Plugins_. A click on this button asks the server for a message, then the button shows the server's answer.

Here is who does what in this plugin:

- **The web part** draws the button. It is the `web/index.tsx` file.
- **The server part** makes the message. It is the `server/index.ts` file.
- **Hodi links them**: it passes the click on to the server, then the answer back to the button.

<!-- prettier-ignore -->
| _The two parts_ | Server | Web |
| --- | --- | --- |
| Its file | `server/index.ts` | `web/index.tsx` |
| Where it runs | On Hodi's server, in a sandbox | In the browser, in Hodi's pages |
| Its role | Answer routes, keep data, run tasks | Draw screens, cards and buttons |
| What it uses | `ctx`, the context Hodi gives it | `hodi:sdk`, Hodi's components and hooks |
| Required | No | No |

> **A plugin may have only one of the two parts.** A plugin that only adds a feed of articles needs no screen. A plugin that only adds an entry to the avatar's menu needs no server.

## A plugin's files

A plugin is a folder. The simplest way to start is to copy the [plugin template](https://github.com/leclaudeur/hodi-plugin-template). This template already has all the files below, the SDK, tests and a CI, and this template works as it is.

```text title="hello-world/"
plugin.json        the plugin's identity card
server/index.ts    the server part
web/index.tsx      the web part, once the person is signed in
web/public.tsx     the screens before signing in, if it has any
locales/fr.json    the texts in French
locales/en.json    the texts in English
assets/            the images, copied as they are
test/              the tests
```

Only `plugin.json` is required. This file gives the plugin's name, its version, its settings and its permissions. [The manifest](/en/guide/manifest/) describes `plugin.json` field by field.

## From the folder to an installable file

Hodi doesn't install a folder, but a single `.hodi-plugin` file. This command makes the `.hodi-plugin` file, from the plugin's folder:

```sh title="Terminal"
npx hodi-plugin build
```

Here is what each file of the folder becomes in the `.hodi-plugin` file:

<!-- prettier-ignore -->
| In the folder | In the `.hodi-plugin` file |
| --- | --- |
| `server/index.ts` | The file becomes `server.js`, with the code of the npm packages it imports. |
| `web/index.tsx` | The file becomes `web.js`, and its styles become `web.css`. |
| `web/public.tsx` | The file becomes `web-public.js`, and its styles become `web-public.css`. |
| `plugin.json` | The file is copied as it is. |
| `locales/` | The folder is copied as it is, with the texts of each language. |
| `assets/` | The folder is copied as it is, with the images and the other files. |

The file lands in `dist/`, for example `dist/hello-world-0.1.0.hodi-plugin`. [Publish](/en/guide/publish/) explains how to test this file, install it and have it signed.

## The server part

### What the server part does

The server part is the plugin's code that runs on Hodi's server, never in the browser. The server part is for three things:

- **answering the web part**, with routes;
- **keeping data**, in an SQLite database of its own;
- **working on its own**, with tasks that come back, such as a clean-up every night.

The `server/index.ts` file exports a `ServerPlugin` object. Here is Hello world's whole server part:

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

This code declares a single route, `POST /hello`. When the web part calls this route, the route reads the `greeting` setting and answers `{ "text": "Hello" }`.

### The server part's sandbox

A plugin's code can come from anyone. So Hodi doesn't run a plugin's code with its own code, but in a **sandbox**: a separate JavaScript engine, QuickJS, isolated from the rest of Hodi.

In this sandbox, only standard JavaScript exists: `JSON`, `Math`, `Date`, promises, classes… Node.js's modules aren't there:

- no `fs`, so no reading files;
- no `fetch`, so no calling a site directly;
- no `process`, nor `require`.

For everything else, the server part goes through `ctx`, the context Hodi gives each route. Here is, for five common needs, the function of `ctx` to use:

<!-- prettier-ignore -->
| What the plugin wants to do | How to do it with `ctx` |
| --- | --- |
| Read or write its data | With `ctx.db`, which gives access to its database. |
| Read its settings | With `ctx.settings()`, which returns the value chosen for each setting. |
| Read a site's page | With `ctx.fetchText()`. It needs the `network` permission. |
| Ask the household's AI a question | With `ctx.ai.ask()`. It needs the `ai` permission. |
| Write a line in the log | With `ctx.log()`, to follow what the plugin does. |

Hodi checks each call: the plugin only gets what its [permissions](/en/guide/manifest/#the-plugins-permissions-permissions) open to it. [The server context](/en/guide/server-context/) describes everything `ctx` holds.

### npm packages in the server part

The server part can import npm packages. During the plugin's build, the code of these packages is copied into `server.js`. So the sandbox has nothing to download.

An npm package only works in the sandbox if it is written in standard JavaScript. A package that needs Node.js crashes at its first call, because Node.js doesn't exist in the sandbox. Here are four known packages, and why each one works or not:

<!-- prettier-ignore -->
| Package | Does it work? |
| --- | --- |
| `date-fns` | Yes. It computes dates in standard JavaScript. |
| `zod` | Yes. It checks data in standard JavaScript. |
| `sharp` | No. It resizes images with Node.js native code. |
| `pg` | No. It opens a network connection to PostgreSQL. |

When in doubt about a package, `npm test` answers quickly: the tests run the plugin in the same sandbox as Hodi.

### The sandbox's limits

A plugin must never slow Hodi down. So the sandbox sets limits on the server part. Here is each limit, and what happens when the server part goes beyond it:

<!-- prettier-ignore -->
| Limit | What happens |
| --- | --- |
| Memory | The server part has 16 MB, or up to 32 MB with `memoryMb`. Beyond that, the call fails. |
| Length of a call | A call lasts 10 seconds at most. Beyond that, Hodi stops it. |
| Size of an answer | An answer is 1 MB at most. Beyond that, the call fails. |
| Size of the database | The database is 256 MB at most. Beyond that, the write fails. |
| Calls waiting | 8 calls can wait behind the one running. Beyond that, Hodi answers `busy` without waiting. |
| Crashes | After 3 crashes in 10 minutes, the plugin stops until Hodi's next start. |

The sandbox falls asleep after a minute without a call, and wakes up at the next call. When it falls asleep, the sandbox forgets everything that was in memory. So a global variable doesn't keep its value from one call to the next: what must last goes in the database, with `ctx.db`.

## The web part

### What the web part does

The web part is the plugin's code that runs in the browser, in Hodi's pages. The web part draws what the person sees: a page in Settings, a card, a button under an article…

The web part loads in the background, once the person is signed in. The app never waits for a plugin to show: the plugin appears as soon as it is ready.

Here is Hello world's web part. This web part draws a card with a "Say hello" button, on the plugin's page in _Server › Plugins_. A click on the button calls the `/hello` route, then the card shows the route's answer:

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
    <SettingRow label="Say hello" hint={text}>
      <Button onClick={sayHello}>Say hello</Button>
    </SettingRow>
  )
}

definePlugin({ settingsPage: HelloCard })
```

### What the web part imports from `hodi:sdk`

The web part imports everything from `hodi:sdk`: Hodi's components (`Button`, `SettingRow`…), Hodi's hooks (`usePluginApi`…) and `definePlugin`. These components aren't copies: they are the components of Hodi's page itself. So the plugin looks like the rest of the app, in every theme and on every screen size.

Here is where to find each topic of the web part:

- **Where the plugin shows**: `definePlugin()` says so, see [Slots](/en/guide/slots/).
- **The components**: the app's, listed in [Components](/en/components/).
- **The texts**: `usePluginTranslation()` reads them in the `locales/` folder.
- **The styles**: a CSS file, with classes prefixed by the plugin's id and Hodi's [tokens](/en/tokens/).

### The web part's styles

Hodi's page refuses inline styles, such as `style={{ color: 'red' }}`. So every style goes through a class, in a CSS file imported by `web/index.tsx`, such as `web/plugin.css` in the template.

```css title="web/plugin.css"
.hello-world-answer {
  color: var(--text-2);
}
```

Colours come from Hodi's variables, such as `var(--text-2)`. These variables change with the theme (Light, Dark, Poudré). A hard-coded colour, such as `#333`, doesn't change and becomes unreadable in another theme. [Tokens](/en/tokens/) lists all these variables: colours, fonts, corners and motion.

### When Hodi shows the web part

The web part runs in Hodi's page, with the session of the person signed in. For that reason, Hodi only shows a plugin's web part in two cases:

1. The plugin is **signed** by Hodi's maintainer, after its code was read.
2. The plugin is **in development**, sent by `hodi-plugin dev` to a test Hodi.

An unsigned plugin still installs, but without its web part. [Publish](/en/guide/publish/#getting-verified) explains how to have a plugin signed.

## How the web part calls the server part

The web part calls a route of the server part by that route's path, with `usePluginApi()`. Hodi stands in the middle: Hodi checks who is asking, then passes the request to the server part.

```tsx title="web/index.tsx"
const api = usePluginApi()
const answer = await api('/hello', { method: 'POST' })
const { text } = await answer.json()
```

Here is what happens, in order, during this call:

1. The browser asks for `/api/plugins/hello-world/hello`.
2. Hodi checks that the person is signed in.
3. Hodi checks that the plugin is meant for their profile.
4. Hodi calls the plugin's `'POST /hello'` route.
5. The route receives `request.who`: who is asking.
6. The route receives no cookie.
7. Its answer goes back to the web part, as JSON.

`request.who` says who is asking, as Hodi checked it: the person's profile, their household, whether the person is an adult, a teen or a child, and whether they are an admin. So the route has nothing to check itself. The route never receives a cookie or a token: the plugin can't pretend to be the person.

## The plugin's texts

Every text the person reads in a plugin comes from the plugin's `locales/` files. `locales/fr.json` is the reference, and every key also exists in `locales/en.json`. A plugin's French texts say « tu » to the person, like the rest of Hodi.

```json title="locales/en.json"
{
  "manifest": {
    "name": "Hello world",
    "description": "A setting, a route and its own card."
  },
  "settings": {
    "greeting": "Message",
    "greetingHint": "What the plugin answers"
  },
  "say": "Say hello"
}
```

The `locales/en.json` file has three kinds of keys:

- **`manifest`**: the plugin's name and description in this language.
- **`settings`**: each setting's label, and its help line.
- **The others**: the web part's texts, read with `usePluginTranslation()`.

The web part shows a text by that text's key:

```tsx title="web/index.tsx"
const { t } = usePluginTranslation()

<Button onClick={sayHello}>{t('say')}</Button>
```

## What it takes to write a plugin

Before writing a plugin, four things need preparing:

1. Install **Node.js 24** or newer.
2. Copy the [plugin template](https://github.com/leclaudeur/hodi-plugin-template).
3. Run `npm install` in its folder.
4. Prepare **a test Hodi**, with _Server › Plugins › Developer mode_ on.

The template already has the SDK, `@hodi-app/plugin-sdk`: `npm install` installs it with the rest. Without the template, it is added with `npm install --save-dev @hodi-app/plugin-sdk`.

[Getting started](/en/getting-started/) shows these steps for real, in an editor: a very simple plugin, in about ten minutes. This plugin is a guided example to discover the steps: it is of no use day to day.
