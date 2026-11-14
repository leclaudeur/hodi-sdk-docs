---
title: "The manifest"
description: "`plugin.json`, a plugin's identity card: its name, who it is for, its settings and its permissions, field by field."
intro: "`plugin.json` is the plugin's identity card. It tells Hodi what the plugin is called, who it is for, what settings it offers and what it is allowed to do. It is the only required file of a plugin."
order: 2
icon: "file-braces"
---

## Hello world's manifest

Here is the `plugin.json` of the Hello world plugin. This manifest gives a name, a version and a single setting: the message the plugin answers.

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

Hodi reads `plugin.json` when the plugin is installed, and checks every field. If a required field is missing, or a value breaks the rules of this page, Hodi refuses to install the plugin. The server admin then sees the error, for example: `version must be like 1.2.3`.

## The manifest's fields

Here is each field of `plugin.json`, with its type and its role. Each field has its own section below, with an example.

<!-- prettier-ignore -->
| Field | Type | |
| --- | --- | --- |
| `id` | `string` | The plugin's technical name, which never changes. |
| `name` | `string` | The name people see, 60 characters at most. |
| `version` | `string` | The version number, such as `1.2.0`. |
| `description` | `string` | A sentence that says what the plugin does, 280 characters at most. |
| `api` | `2` | The version of the plugin API the plugin is written for. |
| `audience?` | `'admin' \| 'all'` | Who sees the plugin in a household. `all` by default. |
| `settings?` | `Setting[]` | The plugin's settings, which the server admin changes. |
| `permissions?` | `Permissions` | What the plugin is allowed to do, besides keeping its data. |
| `menu?` | `{ group, after? }` | Where to put the plugin's entry in Settings. |
| `feeds?` | `Feed[]` | The feeds of articles the plugin offers, 5 at most. |
| `memoryMb?` | `number` | The memory of the server part, in MB. 16 by default. |

## The plugin's identity

### `id`

The id is the plugin's technical name. Hodi uses it everywhere:

- for the plugin's folder on the server;
- for the address of its routes, such as `/api/plugins/hello-world/hello`;
- for the file of its database;
- to recognise the plugin when a new version arrives.

Hodi refuses an id that breaks one of these four rules:

- the id starts with a lowercase letter;
- the id holds only lowercase letters, digits and dashes;
- the id is 2 to 32 characters long;
- the id is neither `packages` nor `dev-mode`, which Hodi keeps.

Once the plugin is published, the plugin's id never changes. For Hodi, another id means another plugin: Hodi would install the new plugin next to the old one, with an empty database, and the old plugin's data wouldn't follow.

### `name`

The plugin's name, 60 characters at most. The server admin reads it in _Server › Plugins_, and the plugin registry shows it before the install.

### `description`

The plugin's description, 280 characters at most. It shows in the same places as the name.

The name and the description also exist in each language, in the plugin's `locales/` files, under the `manifest` key:

```json title="locales/en.json"
{
  "manifest": {
    "name": "Hello world",
    "description": "One setting, one route and its own card."
  }
}
```

Hodi always shows the name and the description in the person's language. The name and the description of `plugin.json` are only a fallback, when a language's file doesn't give them.

### `version`

The version number follows the form `major.minor.patch`, such as `1.2.0`. A pre-release adds a dash and a name, such as `1.2.0-beta.1`.

Hodi compares the installed plugin's version number with the registry's: when the registry has a higher number, the server admin sees that an update is available.

### `api`

This field says which version of the plugin API the plugin is written for. Today, it is `2`.

Hodi doesn't load a plugin written for another version of the API: that plugin's code would expect functions Hodi no longer has, or doesn't have yet. A plugin written for API 1 stays listed in _Server › Plugins_, with a message asking to update it.

## Who sees the plugin

### `audience`

The `audience` field says which profiles of a household see the plugin: the plugin's page in Settings, its cards and its buttons. Hodi applies the same rule to the plugin's [routes](/en/guide/server-context/#routes): someone who doesn't see the plugin can't call its routes either.

The `audience` field has two possible values:

<!-- prettier-ignore -->
| Value | Who sees the plugin |
| --- | --- |
| `"all"` | Every profile of the household: adults, teens and children. It is the default. |
| `"admin"` | The household's admin only. |

With `"all"`, a route can still adapt its answer to the person asking: `request.who.kind` is `"adult"`, `"teen"` or `"child"`.

## Settings

### `settings`

A setting is a value the server admin can change without touching the plugin's code. In Hello world, the `greeting` setting is the message the plugin answers.

The plugin declares its settings in the `settings` field of `plugin.json`. Hodi draws a row for each setting itself, with its own components, on the plugin's page in _Server › Plugins_, under the _Options_ heading. The plugin has no screen to write for its settings.

Here are four settings, one of each type, and the rows Hodi draws for these four settings:

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

> **A plugin has 32 settings at most.**

### A setting's fields

Each setting of the `settings` list is an object. Here are the fields of this object.

<!-- prettier-ignore -->
| Field | Type | |
| --- | --- | --- |
| `key` | `string` | The setting's technical name, unique in the plugin: a letter, then letters and digits, 32 at most. |
| `type` | `'text' \| 'boolean' \| 'number' \| 'choice'` | What the setting holds, and so what Hodi draws. |
| `default` | Depends on the type | The setting's value as long as the admin hasn't changed it. |
| `maxLength?` | `number` | For `text`: the longest length. 2000 by default, and at most. |
| `min?` | `number` | For `number`: the smallest value allowed. The default cannot be smaller. |
| `max?` | `number` | For `number`: the largest value allowed. The default cannot be larger. |
| `options` | `string[]` | For `choice`: the possible values. Each follows the same rules as `key`. |

### The four setting types

A setting's `type` field decides two things: what Hodi draws on the setting's row, and the form of the `default` value. Here are the four types:

<!-- prettier-ignore -->
| Value of `type` | What Hodi draws, and the form of `default` |
| --- | --- |
| `"text"` | Hodi draws a text field. The `default` value is a text, such as `"Hello"`. |
| `"boolean"` | Hodi draws a switch. The `default` value is `true` or `false`. |
| `"number"` | Hodi draws a number field. The `default` value is a number, such as `1`. |
| `"choice"` | Hodi draws one button per option, side by side. The `default` value is one of the `options`, such as `"morning"`. |

### The settings' texts

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

- `settings.greeting` is its label, in bold on its row: _Message_;
- `settings.greetingHint` is its help line, in grey below: _What the plugin answers_;
- for a `choice`, `settings.momentOptions.morning` is the text of the `morning` option's button.

The help line is optional. Without a label, Hodi shows the setting's key itself: `greeting`.

### Reading the settings in the server part

The server part reads the settings with `ctx.settings()`. This function returns an object with each setting's key and its current value: the value the server admin chose, or the `default` value as long as the admin changed nothing.

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

### `permissions`

By default, a plugin can only do three things: keep its data in its database, read its settings and write in Hodi's log.

For everything else, the plugin asks for a **permission** in the `permissions` field of `plugin.json`. Reading a site, asking the AI a question or sending an e-mail are permissions. A plugin that didn't ask for a permission can't do what this permission opens: Hodi refuses the call, whatever the plugin's code says.

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

Before installing the plugin, the server admin sees in plain words the list of the permissions the plugin asks for. Here is what Hodi shows for the permissions above:

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

The admin installs the plugin if they accept these permissions. To add a permission later, the plugin publishes a new version: the admin then sees the new list before installing this version.

### Permissions for every plugin

These three permissions work for any plugin, signed or not:

<!-- prettier-ignore -->
| Permission | Type | What the permission opens |
| --- | --- | --- |
| `network` | `string[]` | Reading these sites with `ctx.fetchText()` and `ctx.http()`. Each site is an exact name, such as `api.example.com`, 20 at most. A subdomain that isn't listed stays closed. |
| `articles` | `boolean` | Reading the articles Hodi has already listed, and their page, with `ctx.articles`. The plugin receives an article id, never an address to open. |
| `publicRoutes` | `boolean` | Opening routes to everyone, even signed out, and drawing [screens before signing in](/en/guide/slots/sign-in/). |

### Permissions for signed plugins

These six permissions touch people's accounts, or cost the household money. Only a signed plugin, read by Hodi's maintainer, gets these permissions:

<!-- prettier-ignore -->
| Permission | Type | What the permission opens |
| --- | --- | --- |
| `ai` | `boolean` | Asking the household's AI a question, one per click on the plugin's AI button, with `ctx.ai.ask()`. |
| `notify` | `boolean` | Sending a notification to a person's devices, 10 a day at most, with `ctx.notify()`. |
| `mail` | `boolean` | Sending an e-mail through Hodi's mail server, 50 an hour at most, with `ctx.mail`. |
| `accounts` | `boolean` | Creating accounts, finding them and checking a password, with `ctx.accounts`. |
| `households` | `boolean` | Listing and creating households, and suspending or deleting those it created, with `ctx.households`. |
| `signIn` | `boolean` | Signing someone in from a public route, and refusing a sign-in with `checkSignIn`. |

An unsigned plugin that asks for `notify`, `mail`, `accounts`, `households` or `signIn` is refused at install. An unsigned plugin that asks for `ai` still installs, but without the AI: the plugin's AI button doesn't answer.

In development, with `hodi-plugin dev`, the plugin keeps all its permissions, even unsigned. So each permission can be tested before asking for the signature.

## The other fields

### `menu`

The `menu` field says where to put the plugin's entry in Settings. This field is only for a plugin that has its own page in Settings, declared by the `page` key of `definePlugin()`.

```json title="plugin.json"
"menu": {
  "group": "you",
  "after": "stats"
}
```

- `group`: the Settings group, such as `you` for _You_.
- `after`: the Hodi entry just before, such as `stats`.

Without `menu`, or with an unknown group, the plugin's entry goes at the end of the _Household_ group. [`page`](/en/guide/slots/settings/) lists the six groups and their entries.

### `feeds`

The `feeds` field declares the feeds of articles the plugin offers, 5 at most. A household follows these feeds like any other source. [`feeds`](/en/guide/slots/feeds/) shows a whole example.

### `memoryMb`

The `memoryMb` field gives the server part's memory, in MB: 16 by default, and 32 at most. A plugin only raises this memory when it really needs it: all plugins share the server's memory.
