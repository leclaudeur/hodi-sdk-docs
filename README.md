<div align="center">

# 📘 Hodi SDK docs

**The website of [Hodi](https://github.com/leclaudeur/hodi)'s plugin SDK, `@hodi-app/plugin-sdk`.**<br>
A guide, the components and the types, in French and English. _Static pages, served by nginx from one Docker image._

[![CI](https://github.com/leclaudeur/hodi-sdk-docs/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/leclaudeur/hodi-sdk-docs/actions/workflows/ci.yml)
[![Plugin SDK](https://img.shields.io/npm/v/@hodi-app/plugin-sdk?label=%40hodi-app%2Fplugin-sdk)](https://www.npmjs.com/package/@hodi-app/plugin-sdk)
[![Node.js 24 or later](https://img.shields.io/badge/node-%E2%89%A524-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License: AGPL-3.0](https://img.shields.io/badge/license-AGPL--3.0-blue)](LICENSE)

[**Quick start**](#quick-start) · [**Writing a page**](#writing-a-page) · [**Versions**](#versions) · [**Deploying**](#deploying) · [**Checks**](#checks)

</div>

## What it is

The site explains how to build a Hodi plugin: its two parts, its manifest, where it shows in Hodi and how to publish
it. It looks like Hodi itself, with the same tokens, fonts, themes and components.

- ⚡ **Fast and plain**: [Astro](https://astro.build) writes every page as HTML, with almost no JavaScript.
- 🔎 **Made to be found**: real addresses, a sitemap, canonical links and one language per address.
- ⌨️ **Searchable**: [Pagefind](https://pagefind.app) indexes the pages after the build, and ⌘K opens the search.
- 🎨 **Hodi's look**: the app's colours, its _Sombre_, _Clair_ and _Poudré_ themes, its menus and its sidebar.

The SDK's own code lives in Hodi's repository. This one only holds the website.

## Before you start

- **Node.js 24** or later.

## Quick start

```bash
npm ci
npm run dev       # → http://localhost:4321/fr/guide/server-and-web/
```

Every save reloads the page. `npm run build` writes the whole site into `dist/` with its search index, and
`npm run preview` serves it. The search only finds something there: `npm run dev` has no index.

## Writing a page

### 📁 Where pages live

One Markdown file per page. The file's path is its address:
`src/content/v1/fr/guide/manifest.md` → _/fr/guide/manifest/_.

```text
src/content/v1/
  fr/                     the reference, in French
    guide/                the guide, in the sidebar's order
      slots/              « Les emplacements »
    components/           the components
    types/                the types
    getting-started.md    Premiers pas
  en/                     the same files, in English
```

### 🏷️ The front matter

Every page starts with it:

```yaml
---
title: 'Le manifeste'
description: 'Ce que plugin.json dit de ton plugin.'
intro: "`plugin.json` dit à Hodi qui est ton plugin, pour qui il est et ce qu'il a le droit de faire."
order: 2
icon: 'file-braces'
---
```

| Field         | What it does                                      |
| ------------- | ------------------------------------------------- |
| `title`       | The page's title, in the sidebar too.             |
| `description` | What search engines and link cards show.          |
| `intro`       | The paragraph under the title.                    |
| `order`       | Its place in the sidebar, among its neighbours.   |
| `icon`        | A [Lucide](https://lucide.dev/icons) icon's name. |

### ✍️ In the text

| To get…                   | Write                                                    |
| ------------------------- | -------------------------------------------------------- |
| A code window with Copier | `title="web/index.tsx"` after the code block's language. |
| A link to another page    | Its address, such as `/fr/guide/publish/`.               |
| A list of fields or props | A table whose second column is `Type`.                   |

> [!TIP]
> Put `<!-- prettier-ignore -->` above a fields table: Prettier then keeps one row per line.

> [!NOTE]
> French spaces before `:` `;` `!` `?` and `»` are added at build time. Write plain spaces.

### 🎓 Premiers pas

This page has no text of its own. Its front matter holds the four `steps` (the file, the line they change, what Hodi
shows) and the `finish` dialog. The site makes one full-screen page per step, then _/fr/getting-started/done/_.

Only the first step is listed for search engines.

## Components

A component's page shows it drawn by Hodi's own code, above the code that gives it. Name it after the code block's
language:

````text
```tsx title="web/index.tsx" render="button" kind="page" play="button"
````

- **`render`** is the component's key in `src/demo/renders.json`. Its DOM is copied there in French and in English, at a computer's and a
  phone's width, and the page shows it in a shadow root with Hodi's CSS, without a script.
- **`kind`** sizes the frame: `rows`, `page`, `modal` or `toast`.
- **`play`** adds « Personnaliser » to the props under it: each control draws the real component again. Its controls
  are in `src/scripts/play.ts`.

`src/demo/` is written by `demo/build.sh` from Hodi's components, never by hand. Run it when a component changes, with
a clone of Hodi whose dependencies are installed:

```bash
HODI_DIR=../hodi sh demo/build.sh
```

## Versions

The site documents one folder per major version of the SDK, such as `v1`. Minor and patch versions change the pages
of their major, and say what they bring with « Depuis 1.2 ». The newest major lives at the site's root, so its
addresses never change.

When a new major comes out, copy its folder (`v1` to `v2`) and change the copy. The old one stays as it was, under
_/v1/fr/…_, with a line that points to the newest version.

## Deploying

There is no release: **what is on `main` is online.**

Each push to `main` builds the image `ghcr.io/leclaudeur/hodi-sdk-docs` for amd64 and arm64. It is tagged `latest`
and with its commit.

### 🚀 The first time

1. **Set the address.** In _Settings › Secrets and variables › Actions › Variables_, add `SITE_URL`, such as
   `https://sdk.example.org`. The build uses it for canonical links and the sitemap.
2. **Make the image public.** After the first build, open the package's _Package settings_ and set its visibility to
   **Public**. Portainer then pulls it without a token.
3. **Add the stack.** In Portainer, paste [compose.yml](compose.yml) as a new stack. nginx answers on port 8080, or on
   the port set in `SDK_DOCS_PORT`.
4. **Point the domain.** In the reverse proxy, send the `sdk.` address to that port, with HTTPS.

### 🔄 After each merge

Open the stack and click **Pull and redeploy**. Nothing else changes.

> [!NOTE]
> Without the pull, Portainer keeps the image it already has.

## Rules

- **French first.** The French pages are the reference, and say « tu ». Each one has its English twin at the same
  path under `en/`: change both in the same pull request.
- **Technical terms stay as they are**: `ctx`, `definePlugin()`, _hooks_, never translated.
- **One page, one subject.** Link to the page that covers a subject instead of repeating it.
- **Code blocks unrolled.** An object or an array with more than one entry puts one entry per line.

## Checks

These run on every pull request:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

## License

Copyright © 2026 Le Claudeur.

This website is free software under the [GNU Affero General Public License v3.0](LICENSE).
