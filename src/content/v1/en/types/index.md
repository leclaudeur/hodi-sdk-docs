---
title: "Types"
description: "Every type in the SDK, part by part, with each of their fields."
intro: "The SDK gives a type to every object a plugin writes or receives. The editor shows these types while writing, with their comments. This page gathers them all, sorted by part of the plugin, and the sidebar leads straight to each one."
order: 4
icon: "type"
---

## Where to find them

The types come from three paths, one per part of the plugin:

- `@hodi-app/plugin-sdk/server`: the types of the server part and of the manifest.
- `hodi:sdk`: the types of the web part.
- `@hodi-app/plugin-sdk/testing`: the types of the test kit.

The path `hodi:sdk` is not an npm package. The plugin's `tsconfig.json` points `hodi:sdk` to `@hodi-app/plugin-sdk/hodi-sdk`.

```ts title="server/index.ts"
import type { PluginContext, PluginRequest, ServerPlugin } from '@hodi-app/plugin-sdk/server'
```

## Server part

### ServerPlugin

The object `server/index.ts` exports by default. All its fields are optional: a plugin only writes the ones it needs. [The server context](/en/guide/server-context/) explains each one with an example.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `migrations?` | `readonly string[]` | The SQL statements that build the plugin's database, in order. A published migration never changes again. |
| `routes?` | `PluginRoutes` | The routes the web part calls for the household's profiles. Hodi serves them under `/api/plugins/<id>/`, only to the profiles `audience` allows. |
| `serverRoutes?` | `PluginRoutes` | The routes of the Server space. Hodi serves them under `/api/server/plugins/<id>/`, to the server's admin only. |
| `publicRoutes?` | `PublicRoutes` | The routes open to everyone, even signed out. Hodi serves them under `/api/public/plugins/<id>/`, with the `publicRoutes` permission, at 30 requests per minute per address. |
| `tasks?` | `Record<string, PluginTask>` | The jobs Hodi starts by itself, at regular intervals, such as clearing what expired every night. |
| `feeds?` | `Record<string, (ctx) => Promise<PluginFeedArticle[]>>` | For each feed declared in `plugin.json`, the function that gives its articles. The key is the feed's. |
| `aiActions?` | `Record<string, PluginAiAction>` | What each `AiButton` of the plugin does, by the name of its action. It is the only place where `ctx.ai` answers. |
| `onArticle?` | `(article: PluginArticle, ctx) => Promise<void>` | Hodi calls it for each article it reads for the first time. |
| `checkSignIn?` | `(who, ctx) => Promise<string \| null>` | Hodi calls it at each sign-in, with the `signIn` permission. `null` lets the person in; a key of the plugin's locales refuses the sign-in with that message. |
| `onProfileDeleted?` | `(deleted, ctx) => Promise<void>` | Hodi calls it when a profile is deleted. The plugin erases what it kept about that profile. |
| `onAccountDeleted?` | `(deleted, ctx) => Promise<void>` | Hodi calls it when an account is deleted. The plugin erases what it kept about that account. |
| `onHouseholdRemoved?` | `(removed, ctx) => Promise<void>` | Hodi calls it when a household is removed from the server. The plugin erases what it kept about that household. |
| `exportData?` | `(who, ctx) => Promise<unknown>` | What the plugin keeps about a person, as JSON. Hodi adds it to the copy that person downloads in _Settings › Account and data_. |

### PluginContext

The `ctx` Hodi gives every route, task and hook. Only through it does the plugin read its database, its settings or a site. A field tied to a permission only works if [the manifest](/en/guide/manifest/#permissions) asks for that permission.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `string` | The plugin's id, as `plugin.json` gives it. |
| `db` | `PluginDatabase` | The plugin's SQLite database, which only it sees. |
| `settings` | `() => SettingValues` | The plugin's settings, with the value the server's admin chose at that moment. |
| `log` | `(message: string) => void` | Writes a line in Hodi's log. `hodi-plugin dev` shows these lines too. |
| `fetchText` | `(url, options?) => Promise<{ url; text }>` | Reads a page of a site listed in `permissions.network`, and returns its final address and its text. |
| `http` | `(url, options?) => Promise<{ url; status; contentType; text }>` | Sends any request to a site listed in `permissions.network`, such as an OAuth exchange. It sends 64 KB and receives 512 KB at most. |
| `articles` | `{ get; page }` | With the `articles` permission: finds an article Hodi read, and that article's page. |
| `serverSettings` | `() => Promise<ServerSettings>` | The durations chosen in _Server › Content_ and _Backups_: how many days Hodi keeps an article, a video and a backup copy. |
| `mail` | `{ available; appUrl; send }` | With the `mail` permission: sends an e-mail through the server set in _Server › E-mail_, 50 per hour at most. `available` says whether that server is set. |
| `households` | `{ list; get; of; create; suspend; resume; remove }` | With the `households` permission: lists, creates, suspends and removes the server's households. |
| `accounts` | `{ get; findByEmail; create; checkPassword; findByLogin; addLogin }` | With the `accounts` permission: finds, creates and checks accounts. The plugin never gets anything that signs into an account. |
| `notify?` | `(notice) => Promise<void>` | With the `notify` permission: sends a notification to a profile, ten per day per profile at most. |
| `ai?` | `{ ask }` | With the `ai` permission, for a signed plugin: asks the household's AI a question, once per click on an `AiButton`. |

### PluginDatabase

The type of `ctx.db`, the plugin's SQLite database. Each function takes an SQL query and its parameters, written `?` in the query. A BLOB column is read and written as a `Uint8Array`.

<!-- prettier-ignore -->
| Methods | Type | |
| --- | --- | --- |
| `query` | `(sql, params?) => Record<string, SqlValue>[]` | For a `SELECT` that returns several rows. It returns every row, one object per row. |
| `get` | `(sql, params?) => Record<string, SqlValue> \| null` | For a `SELECT` that returns one row. It returns the first row, or `null` when there is none. |
| `run` | `(sql, params?) => { changes; lastInsertRowid }` | For an `INSERT`, an `UPDATE` or a `DELETE`. It returns the number of rows changed and the id of the last row added. |

### PluginRequest

What a route receives as its first argument: the web part's request, already read and checked by Hodi.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `method` | `'GET' \| 'POST' \| 'PUT' \| 'PATCH' \| 'DELETE'` | The request's HTTP method. |
| `path` | `string` | The path under the plugin's, such as `/notes/12`. |
| `params` | `Record<string, string>` | The variable parts of the path. For the route `/notes/:id` called on `/notes/12`, `params.id` is `'12'`. |
| `query` | `Record<string, string>` | The parameters written after the address's `?`. |
| `body` | `unknown` | The JSON the web part sent, or `null`. For a `raw` route, the bytes received. |
| `who` | `PluginCaller` | The person calling the route, as Hodi checked them. |

### PluginCaller

The person calling a route, as Hodi checked them. The route can rely on it without checking anything itself. No cookie, no header and no session reaches the plugin: it cannot reuse someone's session.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `profileId` | `number \| null` | The profile open on the device. It is `null` in the Server space, when the server's admin has no profile in the household. |
| `householdId` | `number \| null` | The household the person asks for. Every query that reads a household's data filters on this id. |
| `kind` | `'adult' \| 'teen' \| 'child'` | The open profile is an adult's, a teen's or a child's. |
| `householdAdmin` | `boolean` | `true` when the person is their household's admin. |
| `serverAdmin` | `boolean` | `true` when the person is the server's admin. |
| `accountId` | `number \| null` | The account signed in on the device. It can differ from the open profile's account, for example when a parent opens their child's profile. |

### PluginResponse

What a route returns: JSON, or a zip Hodi builds and sends as a download. Hodi only lets 2xx and 4xx codes through: if the route crashes or answers another code, the web part gets 500.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `status?` | `number` | The response's HTTP code. It is 200 by default. |
| `body?` | `unknown` | Any JSON value, which the web part reads with `answer.json()`. |
| `headers?` | `{ 'Cache-Control'?: string }` | The only header a route can choose: how long the browser keeps the response. |
| `moveDevice?` | `number` | With the `households` permission: a household's id. From this response on, the device reads in that household. |
| `zip?` | `{ filename; entries: PluginZipEntry[] }` | A zip to download, instead of `body`. Each entry is a text, or the first column of a row of the database (`{ path, blob: { sql, params } }`). |

### PluginRoutes

An object of routes. Each key has the form `'METHOD /path'`, and a part of the path that starts with `:` is variable, such as `:id`. The value is either the route's function, or an object with these options:

<!-- prettier-ignore -->
| Options | Type | |
| --- | --- | --- |
| `handler` | `(request, ctx) => Promise<PluginResponse>` | The route's function. |
| `proof?` | `boolean` | Marks a sensitive route. Hodi only runs it after the person typed their password again in `askToConfirm()`. Without that password, the route answers 403 without running. |
| `raw?` | `true` | The route receives bytes instead of JSON, such as an image or a file. |
| `maxBody?` | `number` | The largest size of those bytes, in bytes, up to 10 MB. |

### PublicRoutes

The routes open to everyone, before any sign-in. They have the same form as `PluginRoutes`, with three differences: they only receive JSON, 64 KB at most; `request.who` is `null` there; and their response can sign the device in with this extra field:

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `signIn?` | `number` | With the `signIn` permission: an account's id. Hodi signs the device in to that account, provided this call just created the account or checked its password. |

### PluginTask

A job of `tasks`, which Hodi starts by itself at regular intervals. A task runs for no household and no person: `ctx` therefore refuses what needs one, such as the AI or a notification.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `every` | `number` | The number of minutes between two runs, from 15 to one week (10,080). |
| `run` | `(ctx) => Promise<void>` | The job itself. |

### PluginFeedArticle

An article a feed of `feeds` returns. In Hodi, this article opens with its summary and a link to its site, never in the reader.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `title` | `string` | The article's title. |
| `link` | `string` | The article's address, in https, on the feed's site. |
| `summary?` | `string` | The article's summary, as plain text. |
| `publishedAt?` | `string \| number` | The publication date: an ISO date, or a number of milliseconds since 1970. |
| `image?` | `string` | An image's address, in https. |

### PluginAiAction

An action of `aiActions`. Hodi runs it when someone clicks the `AiButton` that carries its name, and sends its answer to that button's `onAnswer` function. The action receives these fields:

<!-- prettier-ignore -->
| Receives | Type | |
| --- | --- | --- |
| `request.input` | `unknown` | The value the button sent with the click, 16 KB of JSON at most. |
| `request.who` | `{ householdId; profileId }` | The adult who clicked, and their household. |

### PluginArticle

An article Hodi read, as `ctx.articles.get()` returns it or `onArticle` receives it.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `string` | The article's id in Hodi. |
| `title` | `string` | The article's title. |
| `url` | `string` | The article's address on its site. |
| `sourceId` | `string` | The id of the source that published the article. |
| `sourceName` | `string` | That source's name, such as "RTL info". |
| `publishedAt` | `string \| null` | The publication date, or `null` when the site doesn't give it. |
| `status` | `'ok' \| 'unreadable' \| 'failed'` | `ok`: the reader has the article's text. `unreadable`: the page has no text to read. `failed`: the site didn't answer. |
| `text` | `{ title; byline; contentHtml; textLength } \| null` | The text the reader shows, when `status` is `ok`. Otherwise, `null`. |

### PluginHousehold

What a plugin can know about a household, with the `households` permission. It never sees what the household holds: neither its profiles, nor its sources, nor its reading.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `number` | The household's id. |
| `name` | `string` | The household's name. |
| `language` | `'fr' \| 'en'` | The household's language. |
| `createdAt` | `number` | When the household was created, in milliseconds since 1970. |
| `suspended` | `boolean` | `true` when the plugin that created the household suspended it. |
| `mine` | `boolean` | `true` when this plugin created the household. A plugin can only suspend or remove its own households. |
| `photo` | `string \| null` | The address of the household's photo, to pass to `HouseholdAvatar`. |

### PluginAccount

What a plugin can know about an account, with the `accounts` permission.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `number` | The account's id. |
| `email` | `string` | The account's e-mail address. |
| `loginOnly` | `boolean` | `true` when the account has no password: it was created with a login of the plugin's, such as `google:<id>`, and the person comes in through the plugin. |
| `serverAdmin` | `boolean` | `true` when this account is the server's admin. |

## The manifest

### Manifest

`plugin.json`, as Hodi reads it. [The manifest](/en/guide/manifest/) explains each field with an example.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `string` | The plugin's id: lowercase letters, digits and dashes. It never changes once the plugin is published. |
| `name` | `string` | The plugin's name, 60 characters at most. |
| `version` | `string` | The plugin's version, such as `1.2.0`. |
| `description` | `string` | One sentence that says what the plugin does, 280 characters at most. |
| `api` | `number` | The version of the plugin API the plugin is written for. |
| `audience` | `'admin' \| 'all'` | Who sees the plugin in a household: the household's admin only, or every profile. |
| `provides` | `string[]` | What the plugin brings to Hodi: a kind of profile (`profile-kind:child`), an interface (`shell:child`) or the voice (`speech`). |
| `menu` | `{ group; after?; icon? } \| null` | Where the plugin's entry goes in Settings: its group, the entry it comes after, and its icon. |
| `settings` | `SettingSpec[]` | The plugin's settings, which the server's admin changes in _Server › Plugins_. |
| `permissions` | `Permissions` | What the plugin asks to be able to do beyond the basics. |
| `feeds` | `PluginFeed[]` | The article feeds the plugin adds to Hodi. |
| `memoryMb` | `number \| null` | The server part's memory, in MB: 16 by default, 32 at most. |
| `publicPages` | `PublicPages \| null` | With the `publicRoutes` permission: the addresses the plugin opens to search engines. |

### Permissions

What a plugin can ask for beyond the basics: without a permission, it can only keep its data in its database, read its settings and write in the log. Hodi checks every call. The last six permissions are only granted to a signed plugin.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `network` | `string[]` | The sites the plugin can reach with `ctx.fetchText()` and `ctx.http()`, written by their exact host name. |
| `articles` | `boolean` | Opens `ctx.articles`: finding an article Hodi read. |
| `publicRoutes` | `boolean` | Opens the public routes and the screens before sign-in. |
| `notify` | `boolean` | Opens `ctx.notify`: sending a notification. |
| `mail` | `boolean` | Opens `ctx.mail`: sending an e-mail. |
| `accounts` | `boolean` | Opens `ctx.accounts`: finding, creating and checking accounts. |
| `households` | `boolean` | Opens `ctx.households`: managing the server's households. |
| `signIn` | `boolean` | Opens a public route's `signIn` answer and the `checkSignIn` hook. |
| `ai` | `boolean` | Opens `ctx.ai`: asking the household's AI a question, on a click. |

### SettingSpec

A setting declared in `settings`. Hodi draws its row in _Server › Plugins_, and the plugin reads its value with `ctx.settings()`.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `key` | `string` | The setting's key. It is also the key of its label in the plugin's locales. |
| `type` | `'boolean' \| 'number' \| 'text' \| 'choice'` | The kind of value: a switch, a number, a text or a choice in a list. |
| `default` | `boolean \| number \| string` | The setting's value until the server's admin changes it. |
| `min?, max?` | `number` | For a `number`: the smallest and largest values accepted. |
| `maxLength?` | `number` | For a `text`: the number of characters at most. |
| `options?` | `string[]` | For a `choice`: the possible values. |

### PluginFeed

A feed declared in the `feeds` field of `plugin.json`. [`feeds`](/en/guide/slots/feeds/) explains how to fill it.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `key` | `string` | The feed's key. The server part gives its articles under the same key, in `feeds`. |
| `name` | `string` | The feed's name, which Hodi shows as the source's name. |
| `site` | `string` | The address of the site the articles come from. |
| `lang` | `'fr' \| 'en'` | The articles' language. |
| `topic` | `string` | The news topic where the articles show, such as `tech`. |

## Web part

### WebPlugin

The object `definePlugin()` receives: one field per slot, all optional. [The slots](/en/guide/slots/) explain each one with an example.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `settingsPage?` | `ComponentType` | The plugin's [options](/en/guide/slots/options/), in _Server › Plugins_, under the settings Hodi draws. |
| `page?` | `ComponentType<{ layout }>` | The [plugin's page in Settings](/en/guide/slots/settings/). |
| `menuIcon?` | `ComponentType<{ size? }>` | The icon of the plugin's entry in Settings, at 18 px. |
| `menuHint?` | `ComponentType` | The grey line under that entry's name. |
| `serverSections?` | `ServerSection[]` | The [plugin's sections in the Server space](/en/guide/slots/server/). |
| `overviewCards?` | `OverviewCardSlot[]` | The [plugin's cards in Overview](/en/guide/slots/overview/). |
| `readerAction?` | `ComponentType<{ article: ReaderArticle }>` | A component at the end of each article, in [the reader](/en/guide/slots/reader/). |
| `signInExtras?` | `ComponentType<{ layout; signedIn }>` | A component under the [Sign in](/en/guide/slots/sign-in/) form. |
| `signedOutPage?` | `ComponentType<SignedOutPageProps>` | A [page instead of Sign in](/en/guide/slots/signed-out-page/), when the device has no household. |
| `afterSignIn?` | `ComponentType<AfterSignInProps>` | A [step right after signing in](/en/guide/slots/after-sign-in/), before entering the app. |
| `whoIsReadingFooter?` | `ComponentType<{ layout }>` | A component [under "Who's in?"](/en/guide/slots/who-is-reading-footer/), next to "Manage profiles". |
| `ageConsent?` | `AgeConsent` | A [text after "I am at least 13 years old"](/en/guide/slots/age-consent/). |
| `setupSteps?` | `SetupStep[]` | The [plugin's steps in Hodi's setup](/en/guide/slots/setup/). |
| `accountRows?` | `ComponentType<{ layout }>` | [Rows at the end of "Your account"](/en/guide/slots/account-rows/). |
| `avatarMenu?` | `AvatarMenuItem[]` | [Entries in the avatar's menu](/en/guide/slots/avatar-menu/). |

### ServerSection

A section of `serverSections`: an entry in the Server space's column, and the page it opens.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `string` | The section's id. Its address is `#/server/plugin/<plugin id>/<id>`. |
| `label` | `string` | The section's name: a key of the plugin's locales. |
| `page` | `ComponentType<{ layout }>` | The section's page, built with `SectionPage`. |
| `icon?` | `ComponentType<{ size? }>` | The entry's icon, a Lucide icon. |
| `hint?` | `ComponentType` | The grey line under the entry's name, on a phone. |

### OverviewCardSlot

A card of `overviewCards`, in _Server › Overview_.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `string` | The card's id: lowercase letters, digits and dashes. |
| `size` | `'narrow' \| 'wide' \| 'full'` | The card's width on a computer: a third, two thirds or the full width. |
| `component` | `ComponentType<{ from; to }>` | The card's content, built with `OverviewCard`. It receives the start and the end of the chosen period. |

### SetupStep

A step of `setupSteps`. To place one of Hodi's steps among the plugin's, an entry can also be `{ id, core: 'mail' }`.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `string` | The step's id. After a reload, the setup goes back to the step with this id. |
| `title` | `string` | The step's title: a key of the plugin's locales. |
| `intro` | `string` | The sentence under the title: a key of the plugin's locales. |
| `page` | `ComponentType<SetupStepProps>` | The step's content. |

### SignedOutPageProps

The props the component of `signedOutPage` receives.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | The screen's size. |
| `showSignIn` | `() => void` | Opens Hodi's Sign in screen. |
| `signedIn` | `() => void` | Restarts the app, signed in, after a public route answered `signIn`. |

### AfterSignInProps

The props the component of `afterSignIn` receives.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | The screen's size. |
| `done` | `() => void` | Ends the step and lets the person into the app. |

### AvatarMenuItem

An entry of `avatarMenu`, in the menu that opens under the avatar.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `string` | The entry's id. |
| `label` | `string` | The entry's text: a key of the plugin's locales. |
| `onClick` | `() => void` | What a click on the entry does. |
| `icon?` | `ComponentType<{ size? }>` | The entry's icon, at 16 px. |

### ReaderArticle

The article open in the reader, which the component of `readerAction` receives. To learn more about this article, the server part finds it by its `id` with `ctx.articles.get()`.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `id` | `string` | The article's id in Hodi. |
| `title` | `string` | The article's title. |
| `url` | `string` | The article's address on its site. |
| `sourceId` | `string` | The id of the source that published the article. |
| `sourceName` | `string` | That source's name, such as "RTL info". |

### AgeConsent

The text of `ageConsent`. It is either a key of the plugin's locales, or an object `{ text, links }`: in the text, each `<name>` tag becomes a link to `links[name]`, opened in a new tab.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `text` | `string` | The text: a key of the plugin's locales. |
| `links` | `Record<string, string>` | Each link's address, by the name of its tag. An address is on this server, or in https. |

### Confirmation

What [askToConfirm()](/en/functions/#asktoconfirm) receives. With `proof`, the window also asks for the password, and `onConfirm` receives a `Proof` that holds `password` and `code`.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `title` | `string` | The question asked, such as "Clear the history?". |
| `message` | `ReactNode` | What will happen after the click, in one sentence. |
| `label` | `string` | The text of the button that confirms. |
| `onConfirm` | `(proof: Proof) => void \| Promise<void>` | What the click on that button does. If the promise fails, the window stays open. |
| `look?` | `'danger' \| 'primary'` | The button's colour: red by default, for something that erases. |
| `proof?` | `{}` | Asks for the person's password before confirming, for a route with `proof: true`. |
| `onCancel?` | `() => void` | What happens when the window closes without the button. |

### PluginLinks

What [usePluginLinks()](/en/hooks/) returns: the addresses of Hodi's and the plugin's screens, to put in a link.

<!-- prettier-ignore -->
| Fields | Type | |
| --- | --- | --- |
| `frontPage` | `string` | The front page's address. |
| `article` | `(id) => string` | The address of an article in the reader, by its id. |
| `settings` | `string` | The address of Settings. |
| `plugins` | `string` | The address of the plugin's page in _Server › Plugins_. |
| `page` | `(path?) => string` | The address of the plugin's page in Settings, or of one of its screens with `path`. |
| `serverPage` | `(section, path?) => string` | The address of one of the plugin's sections in the Server space, or of one of its screens with `path`. |
