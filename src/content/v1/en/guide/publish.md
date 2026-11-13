---
title: "Publish"
description: "From a plugin's folder to the \"Install\" button of every Hodi: test, try on a test Hodi, build the file, then have it checked and signed through the plugin registry."
intro: "From a plugin's folder to the \"Install\" button of every Hodi: test, try on a test Hodi, build the file, then have it checked and signed through the plugin registry."
order: 5
icon: "package"
---

## In short

A plugin goes through four stages before it reaches people. The first three are done alone, on one's own machine. The last one goes through Hodi's maintainer.

<!-- prettier-ignore -->
| Stage | What this stage does |
| --- | --- |
| Test | This stage checks the plugin's server part, without needing a Hodi. The command to run is `npm test`. |
| Try | This stage installs the plugin on a test Hodi, every time a file is saved. The command to run is `npx hodi-plugin dev`. |
| Build | This stage makes the `.hodi-plugin` file, the file Hodi installs. The command to run is `npm run build`. |
| Get verified | During this stage, Hodi's maintainer reads the plugin's code and signs the `.hodi-plugin` file. This stage goes through a pull request. |

The [plugin template](https://github.com/leclaudeur/hodi-plugin-template) already has everything: the SDK, the scripts and the CI. There is nothing more to install.

## Test

### What a test does

A test runs the plugin's server part **the way Hodi runs it**:

1. The SDK builds the plugin.
2. It loads it in the same sandbox as Hodi.
3. It calls its routes with the same checks as Hodi.

Around it is a small Hodi in memory: a household, its admin, and stand-ins for sites, e-mails, notifications and the AI. So a test never sends anything to anyone. It runs the same way on one's machine and in the CI.

### An example

The plugin template already has this file. It asks for the `POST /hello` route and looks at the answer:

```ts title="test/plugin.test.ts"
import assert from 'node:assert/strict'
import { after, describe, it } from 'node:test'
import { testPlugin } from '@hodi-app/plugin-sdk/testing'

describe('my-plugin', async () => {
  const hodi = await testPlugin('.', {
    settings: {
      greeting: 'Hi'
    }
  })
  after(() => hodi.stop())

  it('answers a child too', async () => {
    const child = await hodi.addPerson({
      name: 'Zoe',
      kind: 'child'
    })
    const answer = await hodi.route('POST /hello', {
      as: child
    })
    assert.equal(answer.status, 200)
  })
})
```

To run the tests:

```sh title="Terminal"
npm test
```

The template's CI runs them again at every push. A plugin that passes its tests behaves the same once installed in a real Hodi.

### testPlugin's options

`testPlugin('.')` takes the plugin's folder. The second argument, optional, prepares the small Hodi:

<!-- prettier-ignore -->
| Option | Type | What it prepares |
| --- | --- | --- |
| `settings` | `object` | The settings, as the admin would have chosen them. The others keep their default. |
| `sites` | `object` | The answer of each site in `permissions.network`, by address. Any other address fails, like a closed site. |
| `articles` | `object` | The articles Hodi knows, by id, for `ctx.articles`. |
| `ai` | `(question) => string` | The AI's answer to each question. Without this option, the household has no AI. |
| `mail` | `boolean` | E-mail is set up on the server (`true` by default). |
| `household` | `object` | The household's name (`name`) and language (`language`). |
| `unsigned` | `boolean` | The plugin is built unsigned. Hodi then refuses what it would refuse for real. |

### What the small Hodi offers

<!-- prettier-ignore -->
| Name | What it does |
| --- | --- |
| `route('POST /hello', { as, body, query })` | Calls a route of the plugin. Without `as`, the household's admin calls. |
| `addPerson({ name, kind })` | Adds someone to the household: `adult`, `teen` or `child`. |
| `click(action, input)` | Plays a click on the plugin's `AiButton`. |
| `runTask(name)` | Runs a task, as Hodi would at its time. |
| `readFeed(key)` | Reads a feed of the plugin, like a household that follows it. |
| `exportData(person)` | Asks for a person's copy of their data. |
| `mails` | The e-mails the plugin sent, in order. |
| `notifications` | The notifications the plugin sent, in order. |
| `questions` | The questions the plugin asked the AI, in order. |
| `log` | The plugin's log lines, and Hodi's lines about it (a refused permission, for example). |
| `stop()` | Stops the small Hodi at the end of the tests. |

## Try on a test Hodi

A test checks the server part. To see the web part too, a real Hodi is needed: **Developer mode** installs the plugin on it, then updates it at every save.

### What is needed

- A Hodi of one's own, on one's machine for example (`http://localhost:3000`).
- Being its server's admin.

A test Hodi keeps the trials apart from one's household's data.

### The steps

1. Open _Server › Plugins_ on the test Hodi.
2. Turn on **Developer mode**: Hodi shows a code, only once.
3. Copy this code.
4. In the plugin's folder, run the command below, replacing `THE_CODE`.
5. Leave the command running while working.

```sh title="Terminal"
npx hodi-plugin dev --server http://localhost:3000 --code THE_CODE
```

<!-- prettier-ignore -->
| Option | What it gives |
| --- | --- |
| `--server` | The test Hodi's address. |
| `--code` | Developer mode's code. It can also come from the `HODI_DEV_CODE` variable, so it doesn't stay in the terminal's history. |
| a folder | The plugin's folder, if the command isn't run from that folder. |

### What happens next

At every save of a file, the command:

1. builds the plugin again;
2. sends it to the test Hodi;
3. waits for Hodi to restart with the new version (a few seconds);
4. shows the plugin's log in the terminal.

In Hodi, the plugin wears the _In development_ badge. Its pages show even unsigned, and it keeps its data from one version to the next. `Ctrl+C` stops the command.

## Build

### The plugin's file

```sh title="Terminal"
npm run build
```

The command writes a single file, `dist/<id>-<version>.hodi-plugin`. For example `dist/hello-world-0.1.0.hodi-plugin`. This is the file people install.

### Installing it by hand

Any admin can install this file, even on a server they only manage from their browser:

1. Open _Server › Plugins_.
2. Click **Add a plugin** and choose the file.
3. Read what Hodi shows: the name, the version and the permissions.
4. Confirm the install.

### What the admin sees before installing

Hodi looks at whether the file is signed, and tells the admin:

<!-- prettier-ignore -->
| Hodi shows | When | What happens |
| --- | --- | --- |
| _Verified_ | The file is signed by the key of Hodi's maintainer. | The plugin installs with everything it asks for. |
| _Unverified code_ | The file isn't signed, or is signed by another key. | The plugin installs after one more confirmation. Its pages don't show. |
| _Can’t be installed unsigned_ | The file isn't signed and asks for a permission kept for signed plugins. | Hodi refuses to install it. |

The permissions kept for signed plugins are listed in [The manifest](/en/guide/manifest/#the-plugins-permissions-permissions).

## Getting verified

### Why a signature

A signature tells Hodi **who made a plugin**. Hodi trusts only one key: its maintainer's.

A plugin's pages run in Hodi's page, with the session of the person signed in. That is why only a signed plugin, or the one in development, can show its pages.

### The steps

1. Put the plugin in a **public** GitHub repository.
2. Publish a release `v<version>` (for example `v0.1.0`) with its `.hodi-plugin` file.
3. Add the plugin to the [plugin registry](https://github.com/leclaudeur/hodi-plugin-registry) with a pull request.
4. The maintainer reads the plugin's code.
5. If it follows [Hodi's rules](#hodis-rules), they sign this version and accept the pull request.

In the plugin template, pushing a `v0.1.0` tag is enough for step 2: the CI builds the file and creates the release on its own.

### The registry entry

The registry is a plain list, the `plugins.json` file. An entry needs two fields, and the registry's `npm run index` command fills the rest from the release:

```json title="plugins.json"
{
  "repo": "https://github.com/me/hodi-plugin-hello-world",
  "version": "0.1.0"
}
```

The [registry's README](https://github.com/leclaudeur/hodi-plugin-registry#add-or-update-a-plugin) details the commands to run before the pull request.

### Then

- The plugin shows in _Server › Plugins › Available_ of every Hodi.
- It installs from there in one click.
- Each new version goes through a new pull request.

That new version is read, then signed in turn.

## Hodi's rules

The maintainer checks each of these rules before signing a plugin.

<!-- prettier-ignore -->
| Rule | Why |
| --- | --- |
| **No AI without a click.** Only `AiButton` asks the AI, once per click. | The AI costs the household money: nothing may start it behind its back. |
| **Every text in the locales**, in French and in English. The plugin's French texts say « tu ». | Hodi is bilingual, and speaks to everyone the same way. |
| **Hodi's components and colours**, not home-made buttons or colours. | The plugin looks like the rest of Hodi, in all three themes. |
| **People's data**: the plugin says what it keeps, and deletes it when they leave. | Everyone can get or delete what Hodi knows about them. |
| **Migrations are added at the end**, and never change once published. | A Hodi that already installed a version must be able to move to the next one. |
| **No private key** in the repository or in the plugin's folder. | A published key would let anyone sign in its author's place. |
