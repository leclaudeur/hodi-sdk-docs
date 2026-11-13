---
title: "The manifest"
description: "`plugin.json` tells Hodi who your plugin is, who it is for, what settings it has and what it is allowed to do."
intro: "`plugin.json` tells Hodi who your plugin is, who it is for, what settings it has and what it is allowed to do. Hodi checks it at install time and refuses a manifest that's wrong, saying why."
order: 2
icon: "file-braces"
---

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

## Who it is

- `id`: lowercase letters, digits and hyphens, 32 at most. It never changes.
- `name` and `description`: 60 and 280 characters at most.
- `version`: a number such as `1.2.0`, or `1.2.0-beta.1` for a pre-release.
- `api`: the version of the plugin API, `2` today.

The id names its folder, its routes and its files: changing it would make another plugin, without its data. Hodi doesn't load a plugin written for another version of the API.

The name and description in `plugin.json` are used when a language doesn't have its own. Give them in each file of `locales/` anyway, under `manifest`, because a name can change from one language to another, and Hodi always shows the person's.

## Who it's for

`audience` says who sees the plugin, its pages and its [routes](/en/guide/server-context/):

- `"admin"`: the household's admin only;
- `"all"`: every profile in the household, children included.

A route always gets the profile's kind, `request.who.kind`.

## Its settings

Hodi draws their rows on the plugin's page, in _Server › Plugins_, above [its options](/en/guide/slots/options/). 32 settings at most, each with a key, a type and a default value:

- `"boolean"`: a switch.
- `"number"`: a number, with `min` and `max` if you like.
- `"text"`: a text, with `maxLength`, 2000 at most.
- `"choice"`: one choice among `options`.

A setting's label comes from `settings.<key>` in its locales, and its help line from `settings.<key>Hint`. Your server part reads them with `ctx.settings()`, defaults included.

## Its permissions

Each power is a permission, false until the manifest says `true`. Hodi shows their list to the admin before installing, then refuses everything else.

```json title="plugin.json"
"permissions": {
  "network": [
    "api.example.com"
  ],
  "articles": true
}
```

For every plugin:

- `network`: the sites it can read, by exact name, 20 at most.
- `articles`: the articles Hodi has listed, and their page.
- `publicRoutes`: routes open to everyone, and [screens before sign-in](/en/guide/slots/sign-in/).

For a signed plugin only, because they touch people or cost the household:

- `ai`: a question to the household's AI, at each click on its button.
- `notify` and `mail`: notifications and e-mails.
- `accounts`, `households` and `signIn`: accounts, households and sign-in.

An unsigned plugin that asks for one is refused at install time, except `ai`, which it simply goes without. Developer mode keeps them all, so you can test them.

## The rest

- `menu`: where its page goes in Settings; see [Settings](/en/guide/slots/settings/).
- `feeds`: up to 5 feeds a household can follow; see [feeds](/en/guide/slots/feeds/).
- `memoryMb`: its server part's memory, 16 MB by default, 32 at most.
- `publicPages`: the addresses it opens to search engines.
