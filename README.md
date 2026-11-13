<div align="center">

# 📘 Hodi SDK docs

**The website that teaches how to build a plugin for [Hodi](https://github.com/leclaudeur/hodi).**<br>
A guide, the components and the types of `@hodi-app/plugin-sdk`, in French and English.

[![CI](https://github.com/leclaudeur/hodi-sdk-docs/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/leclaudeur/hodi-sdk-docs/actions/workflows/ci.yml)
[![Plugin SDK](https://img.shields.io/npm/v/@hodi-app/plugin-sdk?label=%40hodi-app%2Fplugin-sdk)](https://www.npmjs.com/package/@hodi-app/plugin-sdk)
[![License: AGPL-3.0](https://img.shields.io/badge/license-AGPL--3.0-blue)](LICENSE)
[![Patreon](https://img.shields.io/badge/Patreon-Le%20Claudeur-F96854?logo=patreon&logoColor=white)](https://www.patreon.com/cw/LeClaudeur)

[**Quick start**](#quick-start) · [**Writing a page**](#writing-a-page) · [**Deploying**](#deploying) · [**Rules**](#rules) · [**Sponsor**](#sponsor)

</div>

## Intro

This site explains a Hodi plugin from end to end: its two parts, its manifest, where it shows in Hodi and how to
publish it. It looks like Hodi itself, and the SDK's own code stays in Hodi's repository.

- ⚡ Fast - _static pages written by [Astro](https://astro.build), with almost no JavaScript_
- 🔎 Searchable - _[Pagefind](https://pagefind.app) indexes every page, and **⌘K** opens the search_
- 🧩 Real components - _each one is drawn by Hodi's own code, with a playground to try its props_
- 🎓 Premiers pas - _a first plugin in four steps, in a full-screen editor_

## Quick start

You need **Node.js 24** or later.

```bash
npm ci
npm run dev    # → http://localhost:4321/fr/guide/server-and-web/
```

Every save reloads the page. The search only works on a build: run `npm run build`, then `npm run preview`.

## Writing a page

Each page is one Markdown file, and its path is its address.\
French is the reference, and English holds the same files under `en/`.

```text
src/content/v1/fr/
  guide/              the guide, in the sidebar's order
  components/         the components
  types/              the types
  getting-started.md  Premiers pas
```

A page starts with its front matter, which gives its title, its search engine line and its place in the sidebar:

```yaml
---
title: 'Le manifeste'
description: 'Ce que plugin.json dit de ton plugin.'
intro: "`plugin.json` dit à Hodi qui est ton plugin, pour qui il est et ce qu'il a le droit de faire."
order: 2
icon: 'file-braces'
---
```

> [!TIP]
> A code block that names its file with `title="web/index.tsx"` becomes a window with a **Copier** button.

Components are drawn by Hodi's own code.\
After a change in Hodi, draw them again from a clone of Hodi with its dependencies installed:

```bash
HODI_DIR=../hodi sh demo/build.sh
```

## Deploying

There is no release: what is on `main` is online.\
Each merge builds the image `ghcr.io/leclaudeur/hodi-sdk-docs`, which Portainer runs on the server.

1. **Check the address**: the image is built for `https://sdk.get-hodi.com`. For another address, add the variable `SITE_URL` in _Settings › Secrets and variables › Actions_.
2. **Make the image public**: after the first build, in the package's _Package settings_.
3. **Add the stack**: paste [compose.yml](compose.yml) into Portainer, with your port in `SDK_DOCS_PORT`.
4. **Point the domain**: in the reverse proxy, send the `sdk.` address to that port, with HTTPS.

After each merge, open the stack and click **Pull and redeploy**.

> [!IMPORTANT]
> The canonical links and the sitemap are written with this address: set `SITE_URL` before the first merge if the site lives elsewhere.

## Rules

- **French first**: change a French page and its English twin in the same pull request.
- **One major per folder**: a new major copies `v1` to `v2`, and the old folder is never changed.
- **Terms stay as they are**: `ctx`, `definePlugin()` and _hooks_ are never translated.
- **One page, one subject**: link to the page that covers a subject instead of repeating it.

Every pull request runs `npm run typecheck`, `npm run lint`, `npm run format:check` and `npm run build`.

## Sponsor

Hodi is free and open source, with no ads and nothing to pay.\
If it is useful to you, you can support its work on Patreon.

[![Support Hodi on Patreon](https://img.shields.io/badge/Support%20Hodi-Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://www.patreon.com/cw/LeClaudeur)

## License

Copyright © 2026 Le Claudeur.

This website is free software under the [GNU Affero General Public License v3.0](LICENSE).
