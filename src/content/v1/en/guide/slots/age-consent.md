---
title: "ageConsent"
description: "A text of the plugin after the \"I'm at least 13\" box, such as \"and I accept the terms\"."
intro: "A text Hodi adds after the \"I'm at least 13\" box, when someone creates their account. It is for having the service's terms accepted with the same box."
order: 10
icon: "square-check"
topic: "sport"
key: "ageConsent"
---

## Where in Hodi

When someone creates their account, Hodi asks them to tick "I'm at least 13". The `ageConsent` text goes on with this box's sentence, after a space: "I'm at least 13 and I accept the terms of use".

`ageConsent` isn't a component: it is a text. Hodi draws it itself, in the box's sentence.

## Example

The text is a key of the plugin's `locales`. A tag such as `<terms>` in this text becomes a link to the address given in `links`, opened in a new tab.

```tsx title="web/public.tsx"
import { definePlugin } from 'hodi:sdk'

definePlugin({
  ageConsent: {
    text: 'consent',
    links: { terms: '/#terms' }
  }
})
```

```json title="locales/en.json"
{
  "consent": "and I accept the <terms>terms of use</terms>"
}
```

Without a link, `ageConsent` can also be the key alone: `ageConsent: 'consent'`.

## Fields

<!-- prettier-ignore -->
| Field | Type | |
| --- | --- | --- |
| `text` | `string` | A key of the plugin's `locales`. |
| `links?` | `Record<string, string>` | The links' addresses, on this server or in https. |
