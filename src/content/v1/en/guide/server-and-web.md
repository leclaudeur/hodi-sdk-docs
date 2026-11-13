---
title: "Server and web"
description: "The two parts of a Hodi plugin: where each one runs, what it can do and how they talk."
intro: "A plugin adds a feature to Hodi without touching its code. It has two parts: one runs on the server, the other in the browser."
order: 1
icon: "layers"
---

## In short

- **The server part** answers the plugin's routes. It runs on Hodi's server, isolated from Hodi itself, and keeps its data in its own SQLite database.
- **The web part** draws the plugin's screens. It runs in the browser, in Hodi's pages, with Hodi's components.
- **Between them**, the web part calls the server's routes and Hodi checks the session.

A plugin can have only one of them: a server part that only reads articles, or a web part with no route of its own.

## A plugin's folder

A plugin fits in a folder. The [plugin template](https://github.com/leclaudeur/hodi-plugin-template) gives one that works as is, with its build, its tests and its CI.

```text title="my-plugin/"
plugin.json        its name, who it's for, its settings, its permissions
server/index.ts    the server part
web/index.tsx      the web part, once signed in
web/public.tsx     its screens before signing in, if it has any
locales/fr.json    its texts, one file per language
locales/en.json
assets/            its images, copied as they are
test/              its tests
```

Only `plugin.json` is required. [The manifest](/en/guide/manifest/) covers it in detail.

## The build

`npx hodi-plugin build` turns this folder into a single `.hodi-plugin` file, the one Hodi installs:

- `server/index.ts` becomes `server.js`, one file with all the code it imports;
- `web/index.tsx` becomes `web.js` and `web.css`;
- `web/public.tsx` becomes `web-public.js` and `web-public.css`;
- `plugin.json`, `locales/` and `assets/` are copied as they are.

[Publish](/en/guide/publish/) explains how to test it, build it and get it signed.

## The server part

Hodi doesn't load this code into its own process. It runs it in a separate JavaScript engine, QuickJS, in a thread of its own. That engine only knows standard JavaScript: no `require`, no `fs`, no `fetch`, no `process`.

The file exports a `ServerPlugin` object, with its routes and hooks. Anything beyond standard JavaScript goes through the context Hodi gives it, `ctx`, which [the server context](/en/guide/server-context/) covers:

- **its database**: a SQLite file of its own, with tables named as it likes;
- **its settings**: as the admin chose them;
- **what its permissions open**, and nothing else: a website, AI, emails…

npm packages work if they're written in plain JavaScript, like `date-fns` or `zod`: the build copies them into `server.js`. A package that needs Node, for example to read a file or open a connection, doesn't work.

### Its limits

- **Memory**: 16 MB, up to 32 if `memoryMb` asks for it.
- **Time**: 10 seconds per call. Beyond that, Hodi stops the call.
- **Answer**: 1 MB at most per call.
- **Database**: 256 MB at most.
- **Queue**: at most 8 calls waiting behind the running one. Beyond that, Hodi answers `busy`.
- **Crashes**: after 3 in 10 minutes, the plugin waits for Hodi's next start.

The thread stops after a minute without a call, and starts again at the next one. A global variable doesn't survive between two calls: what must last goes in the database.

## The web part

It loads once the person is signed in, in the background: the app never waits for a plugin to show. It uses the React and the components of Hodi's page, imported from `hodi:sdk`. So the plugin looks like the rest of the app, in every theme and at every screen size.

- **Its slots**: `definePlugin()` says where it shows, see [slots](/en/guide/slots/).
- **Its components**: the app's own, listed in [components](/en/components/).
- **Its texts**: `usePluginTranslation()` reads the ones in its `locales/` folder.
- **Its styles**: a CSS file, classes prefixed with the plugin's id, Hodi's colours.

Hodi's page refuses inline styles (`style=`): styles always go through a class. Hodi's colour variables follow the theme, a hard-coded colour doesn't.

The web part runs in Hodi's page, with the person's session. So Hodi only shows it for a signed plugin, or for the plugin being written in developer mode.

## How they talk

The web part calls a route by its path. Hodi checks who's asking, then hands the request to the server part.

```tsx title="web/index.tsx"
const api = usePluginApi()
const answer = await api('/hello', { method: 'POST' })
const { text } = await answer.json()
```

1. `api('/hello')` requests `/api/plugins/hello-world/hello`.
2. Hodi checks the session, the profile and that the plugin is meant for it.
3. It calls the server part's `'POST /hello'` route, with `request.who` but no cookie at all.
4. What it answers goes back to the web part as is, in JSON.

## Texts

Every text goes in `locales/fr.json`, the reference, and in `locales/en.json`. A plugin's French texts say « tu » to the person, like the rest of Hodi. Each file also translates the plugin's name, description and settings:

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

## To begin

1. **Node.js 24** or later.
2. **A test Hodi**, with _Server › Plugins › Developer mode_ turned on.
3. **The SDK**: `npm install --save-dev @hodi-app/plugin-sdk` in the plugin's folder.

[Getting started](/en/getting-started/) goes through the four steps of a complete plugin, in an editor.
