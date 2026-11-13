---
title: "Server and web"
description: "The two parts of a Hodi plugin: where each one runs, what it can do and how they talk."
intro: "A plugin adds a feature to Hodi without changing Hodi's code. It has two parts: a server part, which runs on Hodi's server, and a web part, which shows in the browser. This page explains the role of each and how they communicate."
order: 1
icon: "layers"
---

## In short

The simplest way is to start from an example: the "Hello world" plugin of [Getting started](/en/getting-started/). It adds a "Say hello" button. A click on this button asks the server for a message, and the button shows the answer.

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

A plugin is a folder. The simplest way to start is to copy the [plugin template](https://github.com/leclaudeur/hodi-plugin-template). It already has all these files, the SDK, tests and a CI, and it works as it is.

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

Only `plugin.json` is required. It gives the plugin's name, its version, its settings and its permissions. [The manifest](/en/guide/manifest/) describes it field by field.

## From the folder to an installable file

Hodi doesn't install a folder, but a single `.hodi-plugin` file. This command makes it, from the plugin's folder:

```sh title="Terminal"
npx hodi-plugin build
```

Here is what each file becomes:

<!-- prettier-ignore -->
| In the folder | In the `.hodi-plugin` file |
| --- | --- |
| `server/index.ts` | The file becomes `server.js`, with the code of the npm packages it imports. |
| `web/index.tsx` | The file becomes `web.js`, and its styles become `web.css`. |
| `web/public.tsx` | The file becomes `web-public.js`, and its styles become `web-public.css`. |
| `plugin.json` | The file is copied as it is. |
| `locales/` | The folder is copied as it is, with the texts of each language. |
| `assets/` | The folder is copied as it is, with the images and the other files. |

The file lands in `dist/`, for example `dist/hello-world-0.1.0.hodi-plugin`. [Publish](/en/guide/publish/) explains how to test it, install it and have it signed.

## The server part

### What it does

The server part is the plugin's code that runs on the server. It is for three things:

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

This code declares a single route, `POST /hello`. When the web part calls it, the route reads the `greeting` setting and answers `{ "text": "Hello" }`.

### The sandbox

A plugin's code can come from anyone. So Hodi doesn't run it with its own code, but in a **sandbox**: a separate JavaScript engine, QuickJS, isolated from the rest of Hodi.

In this sandbox, only standard JavaScript exists: `JSON`, `Math`, `Date`, promises, classes… Node.js's modules aren't there:

- no `fs`, so no reading files;
- no `fetch`, so no calling a site directly;
- no `process`, nor `require`.

For everything else, the server part goes through `ctx`, the context Hodi gives each route. A few examples:

<!-- prettier-ignore -->
| Need | With `ctx` |
| --- | --- |
| Read or write its data | `ctx.db` |
| Read its settings | `ctx.settings()` |
| Read a site's page | `ctx.fetchText()`, with the `network` permission |
| Ask the household's AI a question | `ctx.ai.ask()`, with the `ai` permission |
| Write a line in the log | `ctx.log()` |

Hodi checks each call: the plugin only gets what its [permissions](/en/guide/manifest/#permissions) open to it. [The server context](/en/guide/server-context/) describes everything `ctx` holds.

### npm packages

The server part can import npm packages. During the build, their code is copied into `server.js`. So the sandbox has nothing to download.

This only works for a package written in standard JavaScript. A package that needs Node.js crashes at its first call, because Node.js doesn't exist in the sandbox.

<!-- prettier-ignore -->
| Package | Works | Why |
| --- | --- | --- |
| `date-fns` | Yes | It computes dates in standard JavaScript. |
| `zod` | Yes | It checks data in standard JavaScript. |
| `sharp` | No | It resizes images with Node.js native code. |
| `pg` | No | It opens a network connection to PostgreSQL. |

When in doubt, `npm test` answers quickly: the tests run the plugin in the same sandbox as Hodi.

### Its limits

A plugin must not be able to slow Hodi down. So the sandbox has limits:

<!-- prettier-ignore -->
| Limit | Value | Beyond it |
| --- | --- | --- |
| Memory | 16 MB, or up to 32 MB with `memoryMb` | The call fails. |
| Length of a call | 10 seconds | Hodi stops the call. |
| Size of an answer | 1 MB | The call fails. |
| Size of the database | 256 MB | The write fails. |
| Calls waiting | 8, behind the one running | Hodi answers `busy` without waiting. |
| Crashes | 3 in 10 minutes | The plugin stops until Hodi's next start. |

The sandbox falls asleep after a minute without a call, and wakes up at the next one. When it falls asleep, it forgets everything that was in memory. So a global variable doesn't keep its value from one call to the next: what must last goes in the database, with `ctx.db`.

## The web part

### What it does

The web part is the plugin's code that runs in the browser. It draws what the person sees: a page in Settings, a card, a button under an article…

It loads once the person is signed in, in the background. The app never waits for a plugin to show: the plugin appears as soon as it is ready.

Here is Hello world's web part. It draws a "Say hello" button on the plugin's page, and shows the route's answer:

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

### Hodi's components

The web part imports everything from `hodi:sdk`: Hodi's components (`Button`, `SettingRow`…), its hooks (`usePluginApi`…) and `definePlugin`. They aren't copies: they are the components of Hodi's page itself. So the plugin looks like the rest of the app, in every theme and on every screen size.

- **Where it shows**: `definePlugin()` says so, see [Slots](/en/guide/slots/).
- **Its components**: the app's, listed in [Components](/en/components/).
- **Its texts**: `usePluginTranslation()` reads them in its `locales/` folder.
- **Its styles**: a CSS file, with classes that start with the plugin's id.

### Styles

Hodi's page refuses inline styles, such as `style={{ color: 'red' }}`. So every style goes through a class, in a CSS file imported by `web/index.tsx`, such as `web/plugin.css` in the template.

```css title="web/plugin.css"
.hello-world-answer {
  color: var(--text-2);
}
```

Colours come from Hodi's variables, such as `var(--text-2)`. These variables change with the theme (Light, Dark, Poudré). A hard-coded colour, such as `#333`, doesn't change and becomes unreadable in another theme.

### Who can show it

The web part runs in Hodi's page, with the session of the person signed in. For that reason, Hodi only shows it in two cases:

1. The plugin is **signed** by Hodi's maintainer, after its code was read.
2. The plugin is **in development**, sent by `hodi-plugin dev` to a test Hodi.

An unsigned plugin still installs, but without its web part. [Publish](/en/guide/publish/#getting-verified) explains how to have it signed.

## How they talk

The web part calls a server route by its path, with `usePluginApi()`. Hodi stands in the middle: it checks who is asking, then passes the request to the server part.

```tsx title="web/index.tsx"
const api = usePluginApi()
const answer = await api('/hello', { method: 'POST' })
const { text } = await answer.json()
```

Here is what happens during this call:

1. The browser asks for `/api/plugins/hello-world/hello`.
2. Hodi checks that the person is signed in.
3. Hodi checks that the plugin is meant for their profile.
4. Hodi calls the plugin's `'POST /hello'` route.
5. The route receives `request.who`: who is asking.
6. The route receives no cookie.
7. Its answer goes back to the web part, as JSON.

`request.who` says who is asking, as Hodi checked it: their profile, their household, whether they are an adult, a teen or a child, and whether they are an admin. So the route has nothing to check itself. It never receives a cookie or a token: the plugin can't pretend to be the person.

## Texts

Every text the person reads comes from the `locales/` files. `locales/fr.json` is the reference, and every key also exists in `locales/en.json`. A plugin's French texts say « tu » to the person, like the rest of Hodi.

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

This file has three kinds of keys:

- **`manifest`**: the plugin's name and description in this language.
- **`settings`**: each setting's label, and its help line.
- **The others**: the web part's texts, read with `usePluginTranslation()`.

The web part shows a text by its key:

```tsx title="web/index.tsx"
const { t } = usePluginTranslation()

<Button onClick={sayHello}>{t('say')}</Button>
```

## To start

1. Install **Node.js 24** or newer.
2. Copy the [plugin template](https://github.com/leclaudeur/hodi-plugin-template).
3. Run `npm install` in its folder.
4. Prepare **a test Hodi**, with _Server › Plugins › Developer mode_ on.

The template already has the SDK, `@hodi-app/plugin-sdk`: `npm install` installs it with the rest. Without the template, it is added with `npm install --save-dev @hodi-app/plugin-sdk`.

[Getting started](/en/getting-started/) shows these steps for real, in an editor: a very simple plugin, in about ten minutes. It is a guided example to discover the steps: it makes nothing useful day to day.
