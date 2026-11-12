<div align="center">

# 📘 Hodi SDK docs

**The website of [Hodi](https://github.com/leclaudeur/hodi)'s plugin SDK, `@hodi-app/plugin-sdk`.**<br>
A guide, the components and the types, in French first. _Static pages, served by nginx from one Docker image._

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
- 🎨 **Hodi's look**: the app's colours, its _Sombre_, _Clair_ and _Poudré_ themes, its menus and its sidebar.

The SDK's own code lives in Hodi's repository. This one only holds the website.

## Before you start

- **Node.js 24** or later.

## Quick start

```bash
npm ci
npm run dev       # → http://localhost:4321/fr/guide/server-and-web/
```

Every save reloads the page. `npm run build` writes the whole site into `dist/`, and `npm run preview` serves it.

## Writing a page

Each page is a Markdown file, in one folder per major version of the SDK, then one per language. The file's path is
its address: `src/content/v1/fr/guide/manifest.md` is _/fr/guide/manifest/_.

```text
src/content/v1/fr/
  guide/            the guide, its pages in the sidebar's order
    slots/          the pages under « Les emplacements »
  components/       the components
  types/            the types
  getting-started.md  Premiers pas, the editor in four steps
```

A page starts with its front matter. The intro is the paragraph under the title, and the description is what search
engines and link cards show:

```yaml
---
title: 'Le manifeste'
description: 'Ce que plugin.json dit de ton plugin.'
intro: "`plugin.json` dit à Hodi qui est ton plugin, pour qui il est et ce qu'il a le droit de faire."
order: 2
icon: 'file-braces'
---
```

- **`order`** places the page in the sidebar, among its neighbours.
- **`icon`** is a [Lucide](https://lucide.dev/icons) icon, by its name.
- **A code block** becomes a window with **Copier**: name its file with `title="web/index.tsx"` after the language.
- **A link** to another page uses its address, such as `/fr/guide/publish/`.

French spaces before `:`, `;`, `!`, `?` and `»` are added when the site is built: write plain spaces.

**Premiers pas** has no text of its own: its front matter holds the four `steps` (the file, the line they change, what
Hodi shows) and the `finish` dialog. The site makes one full-screen page per step, then _/fr/getting-started/done/_. Only
the first step is listed for search engines.

## Versions

The site documents one folder per major version of the SDK, such as `v1`. Minor and patch versions change the pages
of their major, and say what they bring with « Depuis 1.2 ». The newest major lives at the site's root, so its
addresses never change.

When a new major comes out, copy its folder (`v1` to `v2`) and change the copy. The old one stays as it was, under
_/v1/fr/…_, with a line that points to the newest version.

## Deploying

There is no release: what is on `main` is online. Each push to `main` builds the image
`ghcr.io/leclaudeur/hodi-sdk-docs`, tagged `latest` and with its commit, for amd64 and arm64.

**1.** In the repository's _Settings › Secrets and variables › Actions_, add the variable `SITE_URL` with the site's
address, such as `https://sdk.example.org`.

**2.** In Portainer, add a stack from [compose.yml](compose.yml). nginx answers on port 8080.

**3.** Point the reverse proxy's `sdk.` address at that port.

After a merge, the stack's **Pull and redeploy** takes the new image.

> [!NOTE]
> GitHub's registry creates the image as private. Once, in the package's _Package settings_, set its visibility to
> **Public**: Portainer then pulls it without a token.

## Rules

- **French first.** The French pages are the reference, and say « tu ».
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
