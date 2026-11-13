---
title: "The manifest"
description: "`plugin.json`, a plugin's identity card: its name, who it is for, its settings and its permissions, field by field."
intro: "`plugin.json` is the plugin's identity card. It tells Hodi what the plugin is called, who it is for, what settings it offers and what it is allowed to do. It is the only required file of a plugin."
order: 2
icon: "file-braces"
---

## An example

Here is the `plugin.json` of the Hello world plugin. It has a name, a version and a single setting: the message the plugin answers.

```json title="plugin.json"
{
  "id": "hello-world",
  "name": "Hello world",
  "version": "0.1.0",
  "description": "One setting, one route and its own card.",
  "api": 2,
  "audience": "all",
  "settings": [
    {
      "key": "greeting",
      "type": "text",
      "default": "Hello",
      "maxLength": 40
    }
  ]
}
```

Hodi reads this file when the plugin is installed, and checks every field. If a required field is missing, or a value breaks the rules of this page, Hodi refuses to install the plugin. The admin then sees the error, for example: `version must be like 1.2.3`.

## All the fields

A `?` marks an optional field. Each field has its section below.

<!-- prettier-ignore -->
| Field | Type | |
| --- | --- | --- |
| `id` | `string` | The plugin's technical name, which never changes. |
| `name` | `string` | The name people see, 60 characters at most. |
| `version` | `string` | The version number, such as `1.2.0`. |
| `description` | `string` | A sentence that says what the plugin does, 280 characters at most. |
| `api` | `2` | The version of the plugin API it is written for. |
| `audience?` | `'admin' \| 'all'` | Who sees the plugin in a household. `all` by default. |
| `settings?` | `Setting[]` | Its settings, which the server admin changes. |
| `permissions?` | `Permissions` | What it is allowed to do besides keeping its data. |
| `menu?` | `{ group, after? }` | Where to put its page in Settings. |
| `feeds?` | `Feed[]` | The feeds of articles it offers, 5 at most. |
| `memoryMb?` | `number` | The memory of its server part, in MB. 16 by default. |
| `publicPages?` | `PublicPages` | The addresses of its public pages that search engines may read. |

## The plugin's identity

### `id`

The id is the plugin's technical name. Hodi uses it everywhere:

- for the plugin's folder on the server;
- for the address of its routes, such as `/api/plugins/hello-world/hello`;
- for the file of its database;
- to recognise the plugin when a new version arrives.

An id follows these rules:

- it starts with a lowercase letter;
- it holds only lowercase letters, digits and dashes;
- it is 2 to 32 characters long;
- it is neither `packages` nor `dev-mode`, which Hodi keeps for itself.

Once the plugin is published, its id never changes. For Hodi, another id means another plugin: it would install the new one next to the old one, with an empty database, and the old one's data wouldn't follow.

### `name` and `description`

The name (60 characters at most) and the description (280 at most) are what the admin reads in _Server › Plugins_, and what the registry shows before the install.

These two texts also exist in each language, in the plugin's `locales/` files, under the `manifest` key:

```json title="locales/en.json"
{
  "manifest": {
    "name": "Hello world",
    "description": "One setting, one route and its own card."
  }
}
```

Hodi always shows the name and the description in the person's language. Those of `plugin.json` are only a fallback, when a language's file doesn't give them.

### `version`

The version number follows the form `major.minor.patch`, such as `1.2.0`. A pre-release adds a dash and a name, such as `1.2.0-beta.1`.

Hodi compares this number with the registry's: when the registry has a higher number, the admin sees that an update is available.

### `api`

`api` says which version of the plugin API the plugin is written for. Today, it is `2`.

Hodi doesn't load a plugin written for another version: its code would expect functions Hodi no longer has, or doesn't have yet. A plugin written for API 1 stays listed in _Server › Plugins_, with a message asking to update it.

## Who it is for

`audience` says who sees the plugin in a household: its page in Settings, its cards and its buttons. Hodi applies the same rule to its [routes](/en/guide/server-context/#routes): someone who doesn't see the plugin can't call it either.

<!-- prettier-ignore -->
| Value | Who sees the plugin |
| --- | --- |
| `"all"` | Every profile of the household: adults, teens and children. It is the default. |
| `"admin"` | The household's admin only. |

With `"all"`, a route can still adapt its answer: `request.who.kind` is `"adult"`, `"teen"` or `"child"`.

## Settings

### What they are for

A setting is a value the server admin can change without touching the code. In Hello world, the `greeting` setting is the message the plugin answers.

The plugin declares its settings in `plugin.json`. Hodi draws their rows itself, with its own components, on the plugin's page in _Server › Plugins_, under the "Options" heading. The plugin has no screen to write for that.

Here is what Hodi draws for four settings, one of each type:

```json title="plugin.json" render="pluginoptions"
"settings": [
  {
    "key": "greeting",
    "type": "text",
    "default": "Hello",
    "maxLength": 40
  },
  {
    "key": "loud",
    "type": "boolean",
    "default": false
  },
  {
    "key": "times",
    "type": "number",
    "default": 1,
    "min": 1,
    "max": 5
  },
  {
    "key": "moment",
    "type": "choice",
    "default": "morning",
    "options": [
      "morning",
      "evening"
    ]
  }
]
```

A plugin has 32 settings at most.

### A setting's fields

<!-- prettier-ignore -->
| Field | Type | |
| --- | --- | --- |
| `key` | `string` | Its technical name, unique in the plugin: a letter, then letters and digits, 32 at most. |
| `type` | `'text' \| 'boolean' \| 'number' \| 'choice'` | What it holds, and so what Hodi draws. |
| `default` | Depends on the type | Its value as long as the admin hasn't changed it. |
| `maxLength?` | `number` | For `text`: the longest length. 2000 by default, and at most. |
| `min?` and `max?` | `number` | For `number`: the bounds. The default must be between the two. |
| `options` | `string[]` | For `choice`: the possible values. Each follows the same rules as `key`. |

### Setting types

<!-- prettier-ignore -->
| `type` | What Hodi draws | `default` |
| --- | --- | --- |
| `"text"` | A text field | A text, such as `"Hello"` |
| `"boolean"` | A switch | `true` or `false` |
| `"number"` | A number field | A number, such as `1` |
| `"choice"` | Buttons side by side, one per option | One of the `options`, such as `"morning"` |

### Their texts

In `plugin.json`, a setting only has a technical name, such as `greeting`. The text the admin reads comes from the plugin's `locales/` files, under the `settings` key:

```json title="locales/en.json"
{
  "settings": {
    "greeting": "Message",
    "greetingHint": "What the plugin answers",
    "loud": "In capitals",
    "times": "Number of hellos",
    "moment": "Moment",
    "momentOptions": {
      "morning": "Morning",
      "evening": "Evening"
    }
  }
}
```

For a setting whose key is `greeting`:

- `settings.greeting` is its label, in bold on its row: "Message";
- `settings.greetingHint` is its help line, in grey below: "What the plugin answers";
- for a `choice`, `settings.momentOptions.morning` is the text of the `morning` option's button.

The help line is optional. Without a label, Hodi shows the key itself, `greeting`.

### Reading them in the server part

The server part reads the settings with `ctx.settings()`. This function returns an object with each key and its current value: the one the admin chose, or the default if nothing was changed.

```tsx title="server/index.ts"
'POST /hello': async (request, ctx) => {
  const { greeting, loud, times } = ctx.settings()
  // greeting = 'Hello', loud = false, times = 1 as long as the admin changed nothing
  const text = (loud ? greeting.toUpperCase() : greeting).repeat(times)
  return { body: { text } }
}
```

`ctx.settings()` always gives the value of the moment: when the admin changes a setting, the next call already sees the new value.

## Permissions

### The principle

By default, a plugin can only do three things: keep its data in its database, read its settings and write in Hodi's log.

For everything else, it asks for a **permission** in `plugin.json`. Reading a site, asking the AI a question or sending an e-mail are permissions. A plugin that didn't ask for a permission can't do what it opens: Hodi refuses the call, whatever its code says.

```json title="plugin.json"
"permissions": {
  "network": [
    "api.example.com"
  ],
  "articles": true,
  "notify": true,
  "ai": true
}
```

Before installing the plugin, the admin sees the list of what it asks for, in plain words. Here is what Hodi shows for the permissions above:

```json title="What the admin sees" render="pluginpermissions"
"permissions": {
  "network": [
    "api.example.com"
  ],
  "articles": true,
  "notify": true,
  "ai": true
}
```

The admin installs the plugin if they accept. The plugin can't add a permission later without a new version, which the admin installs again while seeing the new list.

### For every plugin

These permissions work for any plugin, signed or not.

<!-- prettier-ignore -->
| Permission | Type | What it opens |
| --- | --- | --- |
| `network` | `string[]` | Reading these sites with `ctx.fetchText()` and `ctx.http()`. Each site is an exact name, such as `api.example.com`, 20 at most. A subdomain that isn't listed stays closed. |
| `articles` | `boolean` | Reading the articles Hodi has already listed, and their page, with `ctx.articles`. The plugin receives an article id, never an address to open. |
| `publicRoutes` | `boolean` | Opening routes to everyone, even signed out, and drawing [screens before signing in](/en/guide/slots/sign-in/). |

### For a signed plugin only

These permissions touch people's accounts, or cost the household money. Only a signed plugin, read by Hodi's maintainer, can have them.

<!-- prettier-ignore -->
| Permission | Type | What it opens |
| --- | --- | --- |
| `ai` | `boolean` | Asking the household's AI a question, one per click on the plugin's AI button, with `ctx.ai.ask()`. |
| `notify` | `boolean` | Sending a notification to a person's devices, 10 a day at most, with `ctx.notify()`. |
| `mail` | `boolean` | Sending an e-mail through Hodi's mail server, 50 an hour at most, with `ctx.mail`. |
| `accounts` | `boolean` | Creating accounts, finding them and checking a password, with `ctx.accounts`. |
| `households` | `boolean` | Listing and creating households, and suspending or deleting those it created, with `ctx.households`. |
| `signIn` | `boolean` | Signing someone in from a public route, and refusing a sign-in with `checkSignIn`. |

An unsigned plugin that asks for `notify`, `mail`, `accounts`, `households` or `signIn` is refused at install. For `ai`, it still installs, but without the AI: its AI button doesn't answer.

In development, with `hodi-plugin dev`, the plugin keeps all its permissions, even unsigned. So they can be tested before asking for the signature.

## The other fields

### `menu`

`menu` says where to put the plugin's page in Settings. It is only for a plugin that has a page of its own, declared by `page` in the web part.

```json title="plugin.json"
"menu": {
  "group": "you",
  "after": "stats"
}
```

- `group`: the Settings group, such as `you` for "You".
- `after`: the entry the page goes after, such as `stats`.

Without `menu`, or with an unknown group, the page goes at the end of the Household group. [Settings](/en/guide/slots/settings/) lists the groups.

### `feeds`

`feeds` declares the feeds of articles the plugin offers, 5 at most. A household follows them like any other source. [Feeds](/en/guide/slots/feeds/) shows a whole example.

### `memoryMb`

`memoryMb` gives the server part's memory, in MB. It is 16 by default, and 32 at most. A plugin only raises it if it really needs to: all plugins share the server's memory.

### `publicPages`

`publicPages` lists the addresses of the plugin's public pages that search engines may read, 20 at most. It needs the `publicRoutes` permission. Each address has its language, and may have its title, its description and its sharing image.

```json title="plugin.json"
"publicPages": {
  "defaults": {
    "title": "Hodi, the news for the whole family",
    "image": "assets/share.png"
  },
  "routes": [
    {
      "path": "/",
      "lang": "fr"
    },
    {
      "path": "/en",
      "lang": "en"
    }
  ]
}
```

- `defaults`: the title (70 characters at most), the description (200 at most) and the image of every page that doesn't have its own.
- `routes`: each address, with its two-letter language. The image is a `.png`, `.jpg` or `.webp` file of the `assets/` folder, at 1200 × 630.
