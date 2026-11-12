---
title: "Types"
description: "Every type in the SDK, part by part, with each of their fields."
intro: "The SDK gives the types of each part. Your editor shows them as you write, with their comments. This page gathers them all: the sidebar leads straight to each one."
order: 2
icon: "type"
---

## Where to find them

- `@hodi-app/plugin-sdk/server`: the server part and the manifest.
- `hodi:sdk`: the web part, with `@hodi-app/plugin-sdk/hodi-sdk` in `tsconfig.json`.
- `@hodi-app/plugin-sdk/testing`: the test kit.

```ts title="server/index.ts"
import type { PluginContext, PluginRequest, ServerPlugin } from '@hodi-app/plugin-sdk/server'
```

## Server part

### ServerPlugin

What `server/index.ts` exports by default. Everything is optional. See [the server context](/en/guide/server-context/).

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `migrations?` | `readonly string[]` | The changes to its database, in order. Never changed once published. |
| `routes?` | `PluginRoutes` | Served under `/api/plugins/<id>/` to the profiles in its audience. |
| `serverRoutes?` | `PluginRoutes` | Served under `/api/server/plugins/<id>/` to the server admin only. |
| `publicRoutes?` | `PublicRoutes` | Served under `/api/public/plugins/<id>/` to everyone, with `permissions.publicRoutes`. 30 requests per minute per address. |
| `tasks?` | `Record<string, PluginTask>` | A job that comes back by itself: purge, remind. |
| `feeds?` | `Record<string, (ctx) => Promise<PluginFeedArticle[]>>` | The articles of each feed, by its key. |
| `aiActions?` | `Record<string, PluginAiAction>` | What its `AiButton`s run, by their name. The only place where `ctx.ai` answers. |
| `onArticle?` | `(article: PluginArticle, ctx) => Promise<void>` | Each article Hodi reads for the first time. |
| `checkSignIn?` | `(who, ctx) => Promise<string \| null>` | With `permissions.signIn`: at every sign-in. null lets them in, a key from its locales refuses with that message. |
| `onProfileDeleted?` | `(deleted, ctx) => Promise<void>` | A profile deleted: delete what you kept about it. |
| `onAccountDeleted?` | `(deleted, ctx) => Promise<void>` | An account deleted. |
| `onHouseholdRemoved?` | `(removed, ctx) => Promise<void>` | A household removed. |
| `exportData?` | `(who, ctx) => Promise<unknown>` | Its data, for "Download a copy". |

### PluginContext

The `ctx` every route, task and hook gets. The powers marked with a permission only exist with it in [the manifest](/en/guide/manifest/).

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `string` | The plugin's id. |
| `db` | `PluginDatabase` | Its own SQLite database. |
| `settings` | `() => SettingValues` | Its settings as they are. |
| `log` | `(message: string) => void` | A line in Hodi's log. |
| `fetchText` | `(url, options?) => Promise<{ url; text }>` | A page from a site in `permissions.network`. |
| `http` | `(url, options?) => Promise<{ url; status; contentType; text }>` | Any request to those sites, such as an OAuth exchange. 64 KB sent, 512 KB received at most. |
| `articles` | `{ get; page }` | An article Hodi read, and its page. |
| `serverSettings` | `() => Promise<ServerSettings>` | The durations of Server › Content and Backups. |
| `mail` | `{ available; appUrl; send }` | With `permissions.mail`: an e-mail through Server › E-mail. 50 per hour at most. |
| `households` | `{ list; get; of; create; suspend; resume; remove }` | The server's households. |
| `accounts` | `{ get; findByEmail; create; checkPassword; findByLogin; addLogin }` | With `permissions.accounts`: accounts, never a way to sign in to them. |
| `notify?` | `(notice) => Promise<void>` | With `permissions.notify`: a notification, ten per day per profile at most. |
| `ai?` | `{ ask }` | With `permissions.ai`, signed plugin: a question to the household's AI, once per click. |

### PluginDatabase

`ctx.db`: the plugin's database, its alone. A BLOB is a `Uint8Array`, both ways.

<!-- prettier-ignore -->
| Methods | Type | |
| --- | --- | --- |
| `query` | `(sql, params?) => Record<string, SqlValue>[]` | The rows of a SELECT. |
| `get` | `(sql, params?) => Record<string, SqlValue> \| null` | The first row, or null. |
| `run` | `(sql, params?) => { changes; lastInsertRowid }` | An INSERT, an UPDATE or a DELETE. |

### PluginRequest

What a route gets.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `method` | `'GET' \| 'POST' \| 'PUT' \| 'PATCH' \| 'DELETE'` | The method. |
| `path` | `string` | The path under the plugin's: `/notes/12`. |
| `params` | `Record<string, string>` | The named parts of the path. |
| `query` | `Record<string, string>` | The address's parameters. |
| `body` | `unknown` | The JSON sent, or null. For a `raw` route, its bytes. |
| `who` | `PluginCaller` | Who is asking. |

### PluginCaller

Who is asking, as Hodi checked it. No cookie, header or session reaches the plugin.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `profileId` | `number \| null` | The profile open on the device. null in the Server space for an admin outside the household. |
| `householdId` | `number \| null` | Its household: it keeps households' data apart. |
| `kind` | `'adult' \| 'teen' \| 'child'` | The profile's kind. |
| `householdAdmin` | `boolean` | The household's admin. |
| `serverAdmin` | `boolean` | The server's admin. |
| `accountId` | `number \| null` | The account signed in on the device, which can differ from the open profile's. |

### PluginResponse

What a route answers: JSON, or a zip Hodi builds and sends as a download. Hodi only lets 2xx and 4xx statuses through.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `status?` | `number` | 200 by default. |
| `body?` | `unknown` | JSON. |
| `headers?` | `{ 'Cache-Control'?: string }` | The only header a route chooses. |
| `moveDevice?` | `number` | With `permissions.households`: the device reads in this household from now on. |
| `zip?` | `{ filename; entries: PluginZipEntry[] }` | Instead of all that: a zip. An entry is a text, or the first column of a row of its database (`{ path, blob: { sql, params } }`). |

### PluginRoutes

A table of routes: `'METHOD /path'`, with `:name` for a part of the path. Each route is a function, or an object with options.

<!-- prettier-ignore -->
| Options | Type | |
| --- | --- | --- |
| `handler` | `(request, ctx) => Promise<PluginResponse>` | The route's function. |
| `proof?` | `boolean` | A sensitive route: it only runs once the person has typed their password in `askToConfirm`. |
| `raw?` | `true` | A raw body instead of JSON: an image, a file. |
| `maxBody?` | `number` | The raw body's maximum size, 10 MB at most. |

### PublicRoutes

Routes open to everyone, before sign-in: JSON only, 64 KB at most. Their request has `who: null`, and their answer can sign the device in.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `signIn?` | `number` | With `permissions.signIn`: signs the device in to this account, if the call created it or checked its password. |

### PluginTask

A job in `tasks`. It runs for no household: no AI, no sign-in.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `every` | `number` | In minutes: from 15 to a week. |
| `run` | `(ctx) => Promise<void>` | The job. |

### PluginFeedArticle

An article from a feed in `feeds`. It opens with its summary and its link, never in the reader.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `title` | `string` | Its title. |
| `link` | `string` | Its https address, on the feed's site. |
| `summary?` | `string` | Its summary, as text. |
| `publishedAt?` | `string \| number` | An ISO date, or milliseconds since 1970. |
| `image?` | `string` | An https image. |

### PluginAiAction

An action in `aiActions`, run by a click on an `AiButton`. Its answer arrives in `onAnswer`.

<!-- prettier-ignore -->
| Receives | Type | |
| --- | --- | --- |
| `request.input` | `unknown` | What the button received, 16 KB of JSON at most. |
| `request.who` | `{ householdId; profileId }` | The adult who clicked. |

### PluginArticle

An article from `ctx.articles.get()` or from `onArticle`.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `string` | Its id. |
| `title` | `string` | Its title. |
| `url` | `string` | Its address on its site. |
| `sourceId` | `string` | Its source's id. |
| `sourceName` | `string` | Its source's name. |
| `publishedAt` | `string \| null` | Its date. |
| `status` | `'ok' \| 'unreadable' \| 'failed'` | `ok`: the reader has its text. `unreadable`: no text. `failed`: the site didn't answer. |
| `text` | `{ title; byline; contentHtml; textLength } \| null` | The reader's text, when there is one. |

### PluginHousehold

What a plugin knows about a household: never what it holds.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `number` | Its id. |
| `name` | `string` | Its name. |
| `language` | `'fr' \| 'en'` | Its language. |
| `createdAt` | `number` | When it was created. |
| `suspended` | `boolean` | Suspended by the plugin that created it. |
| `mine` | `boolean` | Created by this plugin: the only one it can suspend or remove. |
| `photo` | `string \| null` | Its photo's address, for `HouseholdAvatar`. |

### PluginAccount

What a plugin knows about an account.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `number` | Its id. |
| `email` | `string` | Its e-mail address. |
| `loginOnly` | `boolean` | Created with a login only, without a password. |
| `serverAdmin` | `boolean` | The server's admin. |

## The manifest

### Manifest

`plugin.json`, once Hodi has read it. See [the manifest](/en/guide/manifest/).

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `string` | Lowercase letters, digits and hyphens. |
| `name` | `string` | Its name. |
| `version` | `string` | Its version. |
| `description` | `string` | One sentence. |
| `api` | `number` | The API version it expects. |
| `audience` | `'admin' \| 'all'` | The household's admin only, or every profile. |
| `provides` | `string[]` | What it brings. |
| `menu` | `{ group; after?; icon? } \| null` | Where its page goes in Settings. |
| `settings` | `SettingSpec[]` | Its settings. |
| `permissions` | `Permissions` | Its powers. |
| `feeds` | `PluginFeed[]` | Its feeds. |
| `memoryMb` | `number \| null` | Its memory, 16 MB by default, 32 at most. |
| `publicPages` | `PublicPages \| null` | The addresses it opens to search engines, with `permissions.publicRoutes`. |

### Permissions

What a plugin can ask for on top of its database, its settings and its log. Hodi checks every call. The last six are only given to a signed plugin.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `network` | `string[]` | The sites it can reach, by exact host name. |
| `articles` | `boolean` | `ctx.articles`. |
| `publicRoutes` | `boolean` | Its public routes. |
| `notify` | `boolean` | `ctx.notify`. |
| `mail` | `boolean` | `ctx.mail`. |
| `accounts` | `boolean` | `ctx.accounts`. |
| `households` | `boolean` | `ctx.households`. |
| `signIn` | `boolean` | `signIn` and `checkSignIn`. |
| `ai` | `boolean` | `ctx.ai`. |

### SettingSpec

A setting in the manifest: Hodi draws its row in Server › Plugins.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `key` | `string` | Its key, and its label's. |
| `type` | `'boolean' \| 'number' \| 'text' \| 'choice'` | Its kind. |
| `default` | `boolean \| number \| string` | Its default value. |
| `min?, max?` | `number` | For `number`. |
| `maxLength?` | `number` | For `text`. |
| `options?` | `string[]` | For `choice`. |

### PluginFeed

A feed in `plugin.json › feeds`. See [its feeds](/en/guide/slots/feeds/).

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `key` | `string` | Its key in the server part's `feeds`. |
| `name` | `string` | Its name. |
| `site` | `string` | Its site. |
| `lang` | `'fr' \| 'en'` | Its language. |
| `topic` | `string` | Its topic. |

## Web part

### WebPlugin

What `definePlugin()` gets: one field per slot, all optional. Each is explained in [slots](/en/guide/slots/), with an example.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `settingsPage?` | `ComponentType` | [Its options](/en/guide/slots/options/), in Server › Plugins. |
| `page?` | `ComponentType<{ layout }>` | Its page in [Settings](/en/guide/slots/settings/). |
| `menuIcon?` | `ComponentType<{ size? }>` | Its entry's icon, 18 px. |
| `menuHint?` | `ComponentType` | The line under its entry's name. |
| `serverSections?` | `ServerSection[]` | Its [Server](/en/guide/slots/server/) sections. |
| `overviewCards?` | `OverviewCardSlot[]` | Its [Overview](/en/guide/slots/overview/) cards. |
| `readerAction?` | `ComponentType<{ article: ReaderArticle }>` | At the end of an article, in [the reader](/en/guide/slots/reader/). |
| `signInExtras?` | `ComponentType<{ layout; signedIn }>` | Under the [Sign in](/en/guide/slots/sign-in/) form. |
| `signedOutPage?` | `ComponentType<SignedOutPageProps>` | In place of Sign in, without a household. |
| `afterSignIn?` | `ComponentType<AfterSignInProps>` | A step after sign-in, before the app. |
| `whoIsReadingFooter?` | `ComponentType<{ layout }>` | Next to "Manage profiles", under "Who's in?". |
| `ageConsent?` | `AgeConsent` | After "I am at least 13". |
| `setupSteps?` | `SetupStep[]` | Its steps in [setup](/en/guide/slots/setup/). |
| `accountRows?` | `ComponentType<{ layout }>` | Rows at the end of "Your account". |
| `avatarMenu?` | `AvatarMenuItem[]` | Items in the avatar's menu. |

### ServerSection

A section in `serverSections`.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `string` | Its address, `#/server/plugin/<id>/<section>`. |
| `label` | `string` | Its name, a key from its locales. |
| `page` | `ComponentType<{ layout }>` | Its page, a `SectionPage`. |
| `icon?` | `ComponentType<{ size? }>` | Its Lucide icon. |
| `hint?` | `ComponentType` | The line under its name on a phone. |

### OverviewCardSlot

A card in `overviewCards`.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `string` | Lowercase letters, digits and hyphens. |
| `size` | `'narrow' \| 'wide' \| 'full'` | A third, two thirds or the whole of a computer's width. |
| `component` | `ComponentType<{ from; to }>` | An `OverviewCard`, for the period shown. |

### SetupStep

A step in `setupSteps`, or one of Hodi's steps the plugin places (`{ id, core: 'mail' }`).

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `string` | Where setup comes back to after a reload. |
| `title` | `string` | A key from its locales. |
| `intro` | `string` | A key from its locales. |
| `page` | `ComponentType<SetupStepProps>` | The step's content. |

### SignedOutPageProps

What `signedOutPage` gets.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | The screen's size. |
| `showSignIn` | `() => void` | Opens Hodi's Sign in. |
| `signedIn` | `() => void` | After a `signIn`: the app restarts. |

### AfterSignInProps

What `afterSignIn` gets.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | The screen's size. |
| `done` | `() => void` | Lets the person in. |

### AvatarMenuItem

An item in `avatarMenu`.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `string` | Its id. |
| `label` | `string` | A key from its locales. |
| `onClick` | `() => void` | What it does. |
| `icon?` | `ComponentType<{ size? }>` | Its icon, 16 px. |

### ReaderArticle

The open article, for `readerAction`.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `string` | Its id. |
| `title` | `string` | Its title. |
| `url` | `string` | Its address on its site. |
| `sourceId` | `string` | Its source's id. |
| `sourceName` | `string` | Its source's name. |

### AgeConsent

A key from its locales, or `{ text, links }`: its `<name>` tags become links to `links[name]`, opened in a new tab.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `text` | `string` | A key from its locales. |
| `links` | `Record<string, string>` | The addresses, on this server or over https. |

### Confirmation

What [askToConfirm()](/en/components/dialogs-and-messages/#asktoconfirm) gets. With `proof`, `onConfirm` gets a `Proof`: `password` and `code`.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `title` | `string` | The question. |
| `message` | `ReactNode` | What happens. |
| `label` | `string` | The button. |
| `onConfirm` | `(proof: Proof) => void \| Promise<void>` | After the click. |
| `look?` | `'danger' \| 'primary'` | Red by default. |
| `proof?` | `{}` | Asks for the password. |
| `onCancel?` | `() => void` | Closed without the button. |

### PluginLinks

What [usePluginLinks()](/en/components/hooks/) gives.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `frontPage` | `string` | The front page. |
| `article` | `(id) => string` | An article. |
| `settings` | `string` | Settings. |
| `plugins` | `string` | Its page in Server › Plugins. |
| `page` | `(path?) => string` | Its page, or one of its screens. |
| `serverPage` | `(section, path?) => string` | One of its Server sections. |
