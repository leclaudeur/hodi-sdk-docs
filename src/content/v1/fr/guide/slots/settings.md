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

Dans Hodi, chaque profil a sa page Réglages. Elle liste des entrées, rangées en six groupes : Lecture, Sujets, Toi, Foyer, Cet appareil et Hodi. Chaque entrée ouvre une page.

Un plugin peut ajouter sa propre entrée à cette liste. Elle porte le nom du plugin, et elle ouvre une page que le plugin dessine lui-même.

Deux fichiers du plugin y participent :

- `plugin.json` dit **où** placer l'entrée dans la liste, avec le champ `menu`.
- `web/index.tsx` dit **ce que** la page affiche, avec la clé `page` de `definePlugin`.

## Placer l'entrée

L'entrée du plugin se range dans l'un des six groupes de Réglages. Le champ `menu` de `plugin.json` choisit ce groupe, avec `group`. Il peut aussi choisir, avec `after`, l'entrée de Hodi après laquelle elle se place.

```json title="plugin.json"
"menu": {
  "group": "you",
  "after": "stats"
}
```

Avec cet exemple, l'entrée du plugin va dans le groupe « Toi », juste après « Statistiques ».

Sans `after`, elle va à la fin du groupe. Sans `menu`, ou avec un groupe que Hodi ne connaît pas, elle va à la fin du groupe « Foyer ».

Voici les six valeurs possibles de `group`. Pour chacune, le nom du groupe dans Réglages, et les entrées de Hodi qu'il contient déjà, avec la valeur à donner à `after` pour se placer après l'une d'elles :

<!-- prettier-ignore -->
| Valeur de `group` | Le groupe et ses entrées |
| --- | --- |
| `reading` | Le groupe « Lecture ». Il contient Lecture et affichage (`reading`), Thèmes (`themes`), Sources (`sources`) et Historique (`history`). |
| `subjects` | Le groupe « Sujets ». Il contient Sujets suivis (`followed`) et Sujets masqués (`muted`). |
| `you` | Le groupe « Toi ». Il contient Mon profil (`me`), Statistiques (`stats`), Compte et données (`account`) et Partage (`sharing`). |
| `household` | Le groupe « Foyer ». Il contient Foyer (`household`), Profils (`profiles`) et IA et crédits (`ai`). C'est le groupe par défaut. |
| `device` | Le groupe « Cet appareil ». Il contient Notifications (`notifications`) et Raccourcis clavier (`shortcuts`). |
| `about` | Le groupe « Hodi ». Il contient Serveur (`server`) et À propos (`about`). |

## Dessiner la page

La page elle-même est un composant React, dans la partie web du plugin. Le plugin la donne à Hodi avec la clé `page` de `definePlugin`. Sans `page`, Réglages n'affiche pas d'entrée pour le plugin, même avec un `menu` dans `plugin.json`.

Pour que la page ressemble à celles de Hodi, elle se construit avec les mêmes composants : `SectionPage` pour la page, avec son titre et sa ligne d'introduction, puis `SettingsCard` et `SettingRow` pour ses cartes et ses lignes.

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

Avec cet exemple, Réglages affiche une entrée avec une icône de carnet. Elle ouvre une page « Mes notes », avec une carte qui contient une ligne « Notes enregistrées : 12 ».

## Ce que la page reçoit

Hodi donne une seule prop à la page : `layout`. Sur un ordinateur, Réglages s'affiche en colonnes, la liste à gauche et la page à droite. Sur une tablette ou un téléphone, il s'affiche page par page. `layout` dit dans lequel des deux cas la page se trouve. La page n'a rien à en faire elle-même : il suffit de la passer telle quelle à `SectionPage`, qui s'occupe de la mise en page.

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | `'desktop'` quand Réglages s'affiche en colonnes, `'phone'` quand il s'affiche page par page. À passer tel quel à `SectionPage`. |

## L'icône et la ligne sous le nom

Dans la liste de Réglages, chaque entrée a une icône à gauche de son nom, et une ligne grise sous son nom. Le nom de l'entrée est toujours le nom du plugin. L'icône et la ligne se choisissent avec deux autres clés de `definePlugin`, toutes les deux facultatives :

<!-- prettier-ignore -->
| Clé de `definePlugin` | Type | |
| --- | --- | --- |
| `page` | `ComponentType<{ layout }>` | La page du plugin, décrite plus haut. Sans elle, Réglages n'a pas d'entrée pour le plugin. |
| `menuIcon?` | `ComponentType` | L'icône à gauche du nom, une icône Lucide. Sans elle, Hodi affiche une pièce de puzzle. |
| `menuHint?` | `ComponentType` | La ligne grise sous le nom, par exemple « 12 notes ». Sans elle, Hodi affiche la description du plugin. |

`menuHint` est un composant, et pas un simple texte : il peut donc lire des données, par exemple le nombre de notes, et l'afficher.

## À savoir

- **Qui voit l'entrée** : les profils prévus par `audience` dans `plugin.json`.
- **Avec `audience: "admin"`** : seul l'admin du foyer voit l'entrée et sa page.
- **Le titre de la page** : c'est le plugin qui le donne, avec `SectionPage`.
- **Si la page plante** : Hodi affiche un message à sa place, le reste de Réglages marche.
