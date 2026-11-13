---
title: "Publish"
description: "From your plugin's folder to the \"Install\" button of every Hodi: test, try it on your Hodi, build the file, then have it checked and signed by the plugin registry."
intro: "From your plugin's folder to the \"Install\" button of every Hodi: test, try it on your Hodi, build the file, then have it checked and signed by the plugin registry."
order: 5
icon: "package"
---

## Test

The SDK runs your server part the way Hodi does: it builds it, loads it into the same sandbox and calls its routes with the same checks. Around it, a small Hodi in memory, with a household and stand-ins for sites, e-mails, notifications and AI. So a test never sends anything to anyone: it runs the same way in CI and on your computer.

```tsx title="test/plugin.test.ts"
import { testPlugin } from '@hodi-app/plugin-sdk/testing'

const hodi = await testPlugin('.', { settings: { greeting: 'Hi' } })
const child = await hodi.addPerson({ name: 'Zoe', kind: 'child' })

const answer = await hodi.route('POST /hello', { as: child })
assert.deepEqual(answer.body, { text: 'Hi' })
```

In the plugin template, `npm test` runs these tests, and CI runs them again at every push. A plugin that passes them behaves the same in a real Hodi.

## Try it on your Hodi

1. In _Server › Plugins_, turn on **developer mode** and copy the code.
2. Run `hodi-plugin dev` from the plugin's folder, with your Hodi's address.
3. At every save, it rebuilds the plugin, sends it and shows its log.

```sh title="Terminal"
npx hodi-plugin dev --server http://localhost:3000 --code 482913
```

Hodi restarts by itself to load each version, in a few seconds. Your plugin shows up there as "In development": its pages show even without a signature, and it keeps its data from one version to the next. The code can also come from `HODI_DEV_CODE`, so it stays out of your terminal's history, where it could otherwise be found.

## Build

```sh title="Terminal"
npx hodi-plugin build
```

The file `dist/<id>-<version>.hodi-plugin` is then ready to install.

A Hodi's admin installs it in _Server › Plugins › Install from a file_, even on a server they only manage from their browser. Hodi first shows them its name, its version and its permissions, then waits for them to confirm.

## Being "Verified"

A signature tells Hodi who made a plugin. Hodi only trusts its maintainer's key. Any other plugin installs as "Unverified code", after one more confirmation. Its pages don't show, and it doesn't have the [permissions](/en/guide/manifest/) of signed plugins.

1. **Publish your plugin** in a public repository, with a release.
2. **Open a pull request** that adds it to the [plugin registry](https://github.com/leclaudeur/hodi-plugin-registry).
3. **The maintainer reads its code**, and signs that version if it follows Hodi's rules.

Once listed, it shows up in _Server › Plugins › Available_ on every Hodi, ready to install in one click. Each new version is read again before it is signed.

## Hodi's rules

- **No AI without a click**: only `AiButton` asks for it, once per click.
- **Every text in the locales**, in French and English; the French says « tu ».
- **Hodi's components** rather than your own, and its colours rather than hard-coded ones.
- **People's data**: say what you keep, delete it when they leave.
- **Migrations** are added at the end, and never changed once published.

The maintainer checks each one before signing. A private key never goes in a repository.
