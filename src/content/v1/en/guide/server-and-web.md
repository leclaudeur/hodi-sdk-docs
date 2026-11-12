---
title: "Server and web"
description: "A plugin adds a feature to Hodi without touching its code."
intro: "A plugin adds a feature to Hodi without touching its code. It has two parts: one runs on the server, the other shows in the app. This page explains how they work and talk to each other."
order: 1
icon: "layers"
---

## A plugin's folder

A plugin fits in a folder. The easiest way is to start from the [plugin template](https://github.com/leclaudeur/hodi-plugin-template): it works as is, with its build, its tests and its CI.

```text title="my-plugin/"
plugin.json        what it is: its name, who for, its settings, its permissions
server/index.ts    its server part
web/index.tsx      its web part, once signed in
web/public.tsx     its screens before sign-in, if it has any
locales/fr.json    its texts, one file per language
locales/en.json
assets/            its images, copied as they are
test/              its tests
```

Only `plugin.json` is required, and [the manifest](/en/guide/manifest/) goes through it. A plugin can have only a server part, or only a web part with no route of its own.

## The build

`npx hodi-plugin build` turns that folder into a single `.hodi-plugin` file, the one Hodi installs:

- `server/index.ts` becomes `server.js`, with its npm packages inside;
- `web/index.tsx` becomes `web.js` and `web.css`;
- `web/public.tsx` becomes `web-public.js` and `web-public.css`;
- `plugin.json`, `locales/` and `assets/` are copied as they are.

[Publish](/en/guide/publish/) explains how to test it, build it and get it signed.

## The server part

It runs in Hodi's sandbox, a separate thread with its own JavaScript engine, never inside Hodi itself. It exports a `ServerPlugin` object.

It imports no module from Node or from Hodi. npm packages are fine as long as they don't need any: the build puts them in `server.js`. Everything else comes in its context, `ctx`, which [the server context](/en/guide/server-context/) goes through:

- **its own database**, an SQLite file of its own, with its tables named as it likes;
- **its settings**, as the admin chose them;
- **what its permissions open for it**, and nothing else: a site, AI, e-mails…

## The sandbox's limits

- **Memory**: 16 MB, 32 at most if `memoryMb` asks for it.
- **Time**: 10 seconds per call; beyond that, Hodi stops it.
- **Answer**: 1 MB at most per call.
- **Database**: 256 MB at most.
- **Queue**: 8 calls at most behind the one running; beyond that, `busy`.
- **Crashes**: 3 in 10 minutes, and the plugin waits for Hodi's next start.

The thread goes to sleep after a minute without a call, and wakes up at the next one: keep nothing in memory between two calls, put it in your database.

## The web part

It loads once the person is signed in, in the background: the app never waits for a plugin to show. It gets React and Hodi's components from the page, which it imports from `hodi:sdk`. So the plugin looks like the rest of the app, in every theme and on every screen size.

- **Its slots**: `definePlugin()` says where it shows, see [slots](/en/guide/slots/).
- **Its components**: the app's own, listed in [components](/en/components/).
- **Its texts**: `usePluginTranslation()` reads the ones in its `locales/` folder.
- **Its styles**: a CSS file, its classes prefixed with its id, Hodi's colours.

Inline styles (`style=`) are refused by Hodi's page: always go through a class. Hodi's colour variables change with the theme, a hard-coded colour doesn't.

Hodi only shows the web part of a signed plugin, or of the one you are writing in developer mode: it runs in Hodi's page, with the person's session.

## How they talk

The web part calls its routes by their path, and Hodi does the rest: it checks who is asking, then passes the request to the server part.

```tsx title="web/index.tsx"
const api = usePluginApi()
const answer = await api('/hello', { method: 'POST' })
const { text } = await answer.json()
```

1. `api('/hello')` requests `/api/plugins/hello-world/hello`.
2. Hodi checks the session, the profile and that the plugin is meant for it.
3. It calls the route `'POST /hello'` with `request.who`, without any cookie.
4. Whatever it answers comes back to the web part as is, in JSON.

## Texts

Every text goes in `locales/fr.json`, the reference, and in `locales/en.json`. The French says « tu ». Each file also translates the plugin's name, description and settings:

```json title="locales/en.json"
{
  "manifest": {
    "name": "Hello world",
    "description": "One setting, one route and its own card."
  },
  "settings": {
    "greeting": "Message",
    "greetingHint": "What the plugin answers"
  },
  "say": "Say hello"
}
```

## Getting started

1. **Node.js 24** or newer.
2. **A test Hodi**, your own, with _Server › Plugins › Developer mode_ turned on.
3. **The SDK**: `npm install --save-dev @hodi-app/plugin-sdk` in its folder.

To see the four steps for real, follow [Getting started](/en/first-steps/): a complete plugin in 15 minutes.
