---
title: "Hooks"
description: "The plugin's texts, its routes, its links and the server's settings."
intro: "The hooks of `hodi:sdk` give a plugin's component its texts, its routes, its links and the server's settings. Each hook knows which plugin calls it: it only works in that plugin's components."
order: 2
icon: "anchor"
topic: "science"
---

## usePluginTranslation()

This hook gives the plugin's texts, in the person's language. It reads them in the plugin's `locales/` files, never in Hodi's.

```tsx title="web/index.tsx"
import { usePluginTranslation } from 'hodi:sdk'

const { t, language } = usePluginTranslation()
t('greeting', { name: 'Anna' })
```

<!-- prettier-ignore -->
| Returns | Type | |
| --- | --- | --- |
| `t` | `(key: string, options?) => string` | Returns a key's text. `options` fills its variables, such as `{{name}}`. |
| `language` | `'fr' \| 'en'` | The person's language. |

## usePluginApi()

This hook returns a function that calls the plugin's `routes`. `api('/hello')` requests `/api/plugins/<id>/hello`: the plugin never writes the whole address. Two other hooks do the same for the two other kinds of routes, which [the server context](/en/guide/server-context/#three-kinds-of-routes) explains.

```tsx title="web/index.tsx"
import { usePluginApi, usePluginPublicApi, usePluginServerApi } from 'hodi:sdk'

const api = usePluginApi()
const answer = await api('/hello', { method: 'POST' })
const { greeting } = await answer.json()
```

<!-- prettier-ignore -->
| Hooks | Type | |
| --- | --- | --- |
| `usePluginApi()` | `(path, init?) => Promise<Response>` | Calls the plugin's `routes`, for the household's profiles. |
| `usePluginServerApi()` | `(path, init?) => Promise<Response>` | Calls the plugin's `serverRoutes`. Only the server's admin can call them. |
| `usePluginPublicApi()` | `(path, init?) => Promise<Response>` | Calls the plugin's `publicRoutes`, even before any sign-in. |

The returned function takes the same options as `fetch`, plus one: `proof`, the proof `askToConfirm()` received when the person typed their password again. A route marked `proof: true` only runs with it.

## usePluginLinks()

This hook gives the addresses of Hodi's and the plugin's screens. A plugin never writes them by hand: they stay right even when Hodi changes its addresses.

```tsx title="web/index.tsx"
import { Button, navigate, usePluginLinks } from 'hodi:sdk'

const links = usePluginLinks()
<Button href={links.page('week/3')}>This week</Button>
<Button onClick={() => navigate(links.frontPage)}>Home</Button>
```

<!-- prettier-ignore -->
| Returns | Type | |
| --- | --- | --- |
| `frontPage` | `string` | The front page's address. |
| `article` | `(id: string) => string` | The address of an article in the reader, by its id. |
| `settings` | `string` | The address of Settings. |
| `plugins` | `string` | The address of the plugin's page in _Server › Plugins_. Only the server's admin can open it. |
| `page` | `(path?: string) => string` | The address of the plugin's page in Settings, or of one of its screens with `path`. |
| `serverPage` | `(section: string, path?: string) => string` | The address of one of the plugin's sections in the Server space, or of one of its screens with `path`. |

To go to one of these addresses from code, after an action for example, `navigate(href)` does the same as a click on a link.

## usePluginPath()

This hook says which screen the plugin's page should show. It returns what follows the page's address: `''` at its root, `'week/3'` for the address `links.page('week/3')` gives.

```tsx title="web/index.tsx"
import { usePluginPath } from 'hodi:sdk'

const path = usePluginPath()
return path.startsWith('week/') ? <Week n={Number(path.slice(5))} /> : <Home />
```

<!-- prettier-ignore -->
| Returns | Type | |
| --- | --- | --- |
| `path` | `string` | What follows the address of the plugin's page, or `''` at its root. |

## useServerSettings()

This hook gives the durations and limits the admin chose in _Server › Content_ and _Backups_, read-only. A plugin uses it to write the real figures, in its legal pages for example. It is `null` until the server has answered.

```tsx title="web/index.tsx"
import { useServerSettings } from 'hodi:sdk'

const settings = useServerSettings()
settings && t('privacy.kept', { days: settings.articleDays })
```

<!-- prettier-ignore -->
| Returns | Type | |
| --- | --- | --- |
| `articleDays` | `number` | The number of days Hodi keeps an article. |
| `videoDays` | `number` | The number of days Hodi keeps a video. |
| `textDays` | `number` | The number of days Hodi keeps the text of an article read. |
| `backupCopies` | `number` | The number of database copies Hodi keeps, one per night. |
| `maxSources` | `number \| null` | The number of sources a household can follow, or `null` when there is no limit. |
