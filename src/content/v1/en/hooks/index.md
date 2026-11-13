---
title: "Hooks"
description: "Your plugin's texts, its routes, its links and the server's settings."
intro: "These hooks know which plugin calls them: they only work in its components."
order: 2
icon: "anchor"
topic: "science"
---

## usePluginTranslation()

Your plugin's texts, in the person's language, from `locales/`. Never Hodi's.

```tsx title="web/index.tsx"
import { usePluginTranslation } from 'hodi:sdk'

const { t, language } = usePluginTranslation()
t('greeting', { name: 'Anna' })
```

<!-- prettier-ignore -->
| Returns | Type | |
| --- | --- | --- |
| `t` | `(key: string, options?) => string` | A key's text, with its variables. |
| `language` | `'fr' \| 'en'` | The person's language. |

## usePluginApi()

A request to your `routes`: `api('/hello')` requests `/api/plugins/<id>/hello`. Its two siblings do the same for your other route tables, see [the server context](/en/guide/server-context/).

```tsx title="web/index.tsx"
import { usePluginApi, usePluginPublicApi, usePluginServerApi } from 'hodi:sdk'

const api = usePluginApi()
const answer = await api('/hello', { method: 'POST' })
const { greeting } = await answer.json()
```

<!-- prettier-ignore -->
| Hooks | Type | |
| --- | --- | --- |
| `usePluginApi()` | `(path, init?) => Promise<Response>` | Your `routes`. |
| `usePluginServerApi()` | `(path, init?) => Promise<Response>` | Your `serverRoutes`, for the server admin only. |
| `usePluginPublicApi()` | `(path, init?) => Promise<Response>` | Your `publicRoutes`, before anyone signs in. |

`init` is `fetch`'s, plus `proof`: the password `askToConfirm` received.

## usePluginLinks()

The addresses of Hodi and of your screens. A plugin never writes them: they follow Hodi.

```tsx title="web/index.tsx"
import { Button, navigate, usePluginLinks } from 'hodi:sdk'

const links = usePluginLinks()
<Button href={links.page('week/3')}>This week</Button>
<Button onClick={() => navigate(links.frontPage)}>Home</Button>
```

<!-- prettier-ignore -->
| Returns | Type | |
| --- | --- | --- |
| `frontPage` | `string` | The front page. |
| `article` | `(id: string) => string` | An article, in the reader. |
| `settings` | `string` | Settings. |
| `plugins` | `string` | Your page in Server › Plugins, for the server admin. |
| `page` | `(path?: string) => string` | Your page, or one of its screens. |
| `serverPage` | `(section: string, path?: string) => string` | One of your Server sections, or one of its screens. |

`navigate(href)` goes there, like a link, from a button or after an action.

## usePluginPath()

The screen your page shows: what follows its address, `''` at its root.

```tsx title="web/index.tsx"
import { usePluginPath } from 'hodi:sdk'

const path = usePluginPath()
return path.startsWith('week/') ? <Week n={Number(path.slice(5))} /> : <Home />
```

<!-- prettier-ignore -->
| Returns | Type | |
| --- | --- | --- |
| `path` | `string` | What follows your page's address. |

## useServerSettings()

What Server › Content and Backups promise, read only: the numbers your legal pages state. null until the server has answered.

```tsx title="web/index.tsx"
import { useServerSettings } from 'hodi:sdk'

const settings = useServerSettings()
settings && t('privacy.kept', { days: settings.articleDays })
```

<!-- prettier-ignore -->
| Returns | Type | |
| --- | --- | --- |
| `articleDays` | `number` | The days an article is kept. |
| `videoDays` | `number` | The days a video is kept. |
| `textDays` | `number` | The days a read text is kept. |
| `backupCopies` | `number` | The copies of the database kept each night. |
| `maxSources` | `number \| null` | The sources a household can follow, null for no limit. |
