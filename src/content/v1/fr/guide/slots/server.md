---
title: "Serveur"
description: "Un groupe de sections dans l'espace Serveur, pour ce que seul l'admin du serveur doit voir et gérer."
intro: "Un groupe de sections dans l'espace Serveur, au nom du plugin. Il sert à ce que seul l'admin du serveur doit voir et gérer : une liste de comptes, des inscriptions en attente, des statistiques…"
order: 3
icon: "server"
topic: "science"
key: "serverSections"
---

## Où elles s'affichent

L'espace Serveur a sa propre sidebar, avec les groupes de Hodi (Général, Plugins…). Le plugin y ajoute un groupe à son nom, sous ceux de Hodi. Chaque section de ce groupe est une entrée de la sidebar, qui ouvre sa page.

Chaque section a sa propre adresse : `#/server/plugin/<id du plugin>/<id de la section>`.

## Exemple

```tsx title="web/index.tsx"
import { SectionPage, definePlugin } from 'hodi:sdk'
import { Hand } from 'lucide-react'

const SaidPage = ({ layout }) => (
  <SectionPage title="Bonjours" layout={layout}>
    …
  </SectionPage>
)

definePlugin({
  serverSections: [
    {
      id: 'said',
      label: 'server.said',
      icon: Hand,
      page: SaidPage
    }
  ]
})
```

## Une section

<!-- prettier-ignore -->
| Champ | Type | |
| --- | --- | --- |
| `id` | `string` | Son nom dans l'adresse : lettres minuscules, chiffres et tirets, une seule fois par plugin. |
| `label` | `string` | Une clé de ses `locales`, comme `server.said` : son nom dans la sidebar. |
| `page` | `ComponentType<{ layout }>` | Sa page, dessinée avec `SectionPage`. |
| `icon?` | `ComponentType` | Une icône Lucide. Une pièce de puzzle sans elle. |
| `hint?` | `ComponentType` | La ligne sous son nom, sur téléphone, comme « 12 personnes ». |

## À savoir

- **Qui les voit** : l'admin du serveur seulement.
- **Ses routes** : une section appelle les `serverRoutes` du plugin, avec `usePluginServerApi()`. Ces routes refusent tout autre que l'admin du serveur.
- **Une section invalide** : une section sans `id` valide, ou avec un `id` déjà pris, n'est pas affichée.
