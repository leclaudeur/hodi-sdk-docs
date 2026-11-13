---
title: "ageConsent"
description: "Un texte du plugin après la case _J'ai au moins 13 ans_, comme _et j'accepte les conditions_."
intro: "Un texte que Hodi ajoute après la case _J'ai au moins 13 ans_, quand une personne crée son compte. Il sert à faire accepter les conditions du service avec la même case."
order: 10
icon: "square-check"
topic: "sport"
key: "ageConsent"
---

## Où dans Hodi

Quand une personne crée son compte, Hodi lui demande de cocher _J'ai au moins 13 ans_. Le texte `ageConsent` continue la phrase de cette case, après une espace : _J'ai au moins 13 ans et j'accepte les conditions d'utilisation_.

`ageConsent` n'est pas un composant : c'est un texte. Hodi le dessine lui-même, dans la phrase de la case.

## Exemple

Le texte est une clé des `locales` du plugin. Une balise comme `<terms>` dans ce texte devient un lien vers l'adresse donnée dans `links`, ouvert dans un nouvel onglet.

```tsx title="web/public.tsx"
import { definePlugin } from 'hodi:sdk'

definePlugin({
  ageConsent: {
    text: 'consent',
    links: { terms: '/#terms' }
  }
})
```

```json title="locales/fr.json"
{
  "consent": "et j'accepte les <terms>conditions d'utilisation</terms>"
}
```

Sans lien, `ageConsent` peut aussi être la clé seule : `ageConsent: 'consent'`.

## Les champs

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `text` | `string` | Une clé des `locales` du plugin. |
| `links?` | `Record<string, string>` | Les adresses des liens, sur ce serveur ou en https. |
