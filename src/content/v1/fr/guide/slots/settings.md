---
title: "Réglages"
description: "Une page du plugin dans Réglages, pour ce que chaque profil du foyer règle ou consulte lui-même."
intro: "Une entrée de Réglages rien qu'au plugin, avec sa propre page. Elle sert à ce que chaque profil du foyer règle ou consulte lui-même : ses notes, ses statistiques, ses préférences pour le plugin…"
order: 2
icon: "settings"
topic: "world"
key: "page"
---

## Où elle s'affiche

Réglages liste ses entrées en six groupes. Le plugin y ajoute une entrée, qui ouvre sa page. Deux fichiers y participent :

- `plugin.json` dit **où** placer l'entrée, avec `menu` ;
- `web/index.tsx` dit **ce que** la page affiche, avec `page`.

## Placer l'entrée

```json title="plugin.json"
"menu": {
  "group": "you",
  "after": "stats"
}
```

`group` est le groupe de Réglages, et `after` l'entrée après laquelle le plugin se place. Sans `menu`, ou avec un groupe inconnu, l'entrée va à la fin du groupe Foyer.

<!-- prettier-ignore -->
| `group` | Le groupe dans Réglages |
| --- | --- |
| `reading` | Lecture |
| `subjects` | Sujets |
| `you` | Toi |
| `household` | Foyer |
| `device` | Cet appareil |
| `about` | Hodi |

## Exemple

```tsx title="web/index.tsx"
import { SectionPage, SettingRow, SettingsCard, definePlugin } from 'hodi:sdk'
import { NotebookPen } from 'lucide-react'

const NotesPage = ({ layout }) => (
  <SectionPage title="Mes notes" intro="Les notes prises en lisant." layout={layout}>
    <SettingsCard>
      <SettingRow label="Notes enregistrées" value="12" />
    </SettingsCard>
  </SectionPage>
)

definePlugin({
  page: NotesPage,
  menuIcon: NotebookPen
})
```

## Ce qu'elle reçoit

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | La taille d'écran. À passer tel quel à `SectionPage`, qui dessine la page comme celles de Hodi. |

## Les autres clés

<!-- prettier-ignore -->
| Clé de `definePlugin` | Type | |
| --- | --- | --- |
| `page` | `ComponentType<{ layout }>` | La page elle-même. Sans elle, Réglages n'a pas d'entrée pour le plugin. |
| `menuIcon?` | `ComponentType` | L'icône de l'entrée, une icône Lucide de 18 px. Une pièce de puzzle sans elle. |
| `menuHint?` | `ComponentType` | La ligne sous le nom de l'entrée, comme « 12 notes ». La description du plugin sans elle. |

## À savoir

- **Qui la voit** : les profils prévus par `audience`, comme pour ses routes.
- **Son titre** : c'est le plugin qui le donne, avec `SectionPage`. Hodi n'ajoute rien autour.
- **Si elle plante** : Hodi affiche un message à sa place, et le reste de Réglages continue de marcher.
