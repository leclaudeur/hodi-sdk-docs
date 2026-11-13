---
title: "serverSections"
description: "Un groupe de sections dans l'espace Serveur, pour ce que seul l'admin du serveur doit voir et gérer."
intro: "Un groupe de sections dans l'espace Serveur, au nom du plugin. Il sert à ce que seul l'admin du serveur doit voir et gérer : une liste de comptes, des inscriptions en attente, des statistiques…"
order: 3
icon: "server"
topic: "science"
key: "serverSections"
---

## Où s'affiche `serverSections`

L'espace Serveur a sa propre sidebar, avec les groupes de Hodi : Général, Plugins… Le plugin ajoute à cette sidebar un groupe au nom du plugin, sous les groupes de Hodi. Chaque section de ce groupe est une entrée de la sidebar, qui ouvre la page de la section.

Chaque section a sa propre adresse : `#/server/plugin/<id du plugin>/<id de la section>`.

## Une section « Bonjours »

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

## Les champs d'une section de `serverSections`

`serverSections` est une liste. Chaque section de la liste a ces champs :

<!-- prettier-ignore -->
| Champ | Type | |
| --- | --- | --- |
| `id` | `string` | Le nom de la section dans l'adresse : minuscules, chiffres et tirets, une fois par plugin. |
| `label` | `string` | Le nom de la section dans la sidebar, une clé des `locales`, comme `server.said`. |
| `page` | `ComponentType<{ layout }>` | La page de la section, dessinée avec `SectionPage`. |
| `icon?` | `ComponentType` | Une icône Lucide. Sans icône, Hodi affiche une pièce de puzzle. |
| `hint?` | `ComponentType` | La ligne sous le nom de la section, sur téléphone, comme « 12 personnes ». |

## À savoir sur `serverSections`

- **Qui voit les sections** : l'admin du serveur seulement.
- **Les routes des sections** : les `serverRoutes`, appelées avec `usePluginServerApi()`.
- **Une section invalide** : sans `id` valide, ou avec un `id` déjà pris, Hodi ne l'affiche pas.

Les `serverRoutes` refusent toute personne autre que l'admin du serveur.
