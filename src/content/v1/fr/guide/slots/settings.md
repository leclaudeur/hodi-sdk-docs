---
title: "page"
description: "Une page du plugin dans Réglages, pour ce que chaque profil du foyer règle ou consulte lui-même."
intro: "Un plugin peut ajouter sa propre entrée dans la page Réglages de Hodi. Cette entrée ouvre une page que le plugin dessine lui-même. Le plugin y met ce que chaque profil du foyer règle ou consulte pour lui-même : ses notes, ses statistiques, ses préférences pour le plugin."
order: 2
icon: "settings"
topic: "world"
key: "page"
---

## Où dans Hodi

Dans Hodi, chaque profil a sa page Réglages. La page Réglages liste des entrées, rangées en six groupes : Lecture, Sujets, Toi, Foyer, Cet appareil et Hodi. Chaque entrée ouvre une page.

Un plugin peut ajouter sa propre entrée à cette liste. L'entrée du plugin porte le nom du plugin. Un clic sur l'entrée du plugin ouvre la page du plugin, que le plugin dessine lui-même.

Deux fichiers du plugin servent à cette entrée et à cette page :

- `plugin.json` dit **où** placer l'entrée du plugin, avec le champ `menu`.
- `web/index.tsx` dit **ce que** la page du plugin affiche, avec la clé `page` de `definePlugin`.

## Placer l'entrée

L'entrée du plugin se range dans l'un des six groupes de la page Réglages. Le champ `menu` de `plugin.json` choisit ce groupe, avec `group`. Le champ `menu` peut aussi choisir, avec `after`, l'entrée de Hodi après laquelle l'entrée du plugin se place.

```json title="plugin.json"
"menu": {
  "group": "you",
  "after": "stats"
}
```

Avec cet exemple, l'entrée du plugin va dans le groupe _Toi_, juste après l'entrée _Statistiques_.

Sans `after`, l'entrée du plugin va à la fin de son groupe. Sans `menu`, ou avec un groupe que Hodi ne connaît pas, l'entrée du plugin va à la fin du groupe _Foyer_.

Voici les six valeurs possibles de `group`. Pour chaque valeur, le nom du groupe dans la page Réglages, et les entrées de Hodi que ce groupe contient déjà, avec la valeur à donner à `after` pour placer l'entrée du plugin après l'une d'elles :

<!-- prettier-ignore -->
| Valeur de `group` | Le groupe et ses entrées |
| --- | --- |
| `reading` | Le groupe _Lecture_. Ce groupe contient Lecture et affichage (`reading`), Thèmes (`themes`), Sources (`sources`) et Historique (`history`). |
| `subjects` | Le groupe _Sujets_. Ce groupe contient Sujets suivis (`followed`) et Sujets masqués (`muted`). |
| `you` | Le groupe _Toi_. Ce groupe contient Mon profil (`me`), Statistiques (`stats`), Compte et données (`account`) et Partage (`sharing`). |
| `household` | Le groupe _Foyer_. Ce groupe contient Foyer (`household`), Profils (`profiles`) et IA et crédits (`ai`). C'est le groupe par défaut. |
| `device` | Le groupe _Cet appareil_. Ce groupe contient Notifications (`notifications`) et Raccourcis clavier (`shortcuts`). |
| `about` | Le groupe _Hodi_. Ce groupe contient Serveur (`server`) et À propos (`about`). |

## Dessiner la page

La page du plugin est un composant React, écrit dans la partie web du plugin (`web/index.tsx`). Le plugin donne ce composant à Hodi avec la clé `page` de `definePlugin`. Sans la clé `page`, la page Réglages n'affiche aucune entrée pour le plugin, même avec un champ `menu` dans `plugin.json`.

Pour que la page du plugin ressemble aux pages de Hodi, la page du plugin se construit avec les mêmes composants que Hodi :

- `SectionPage` dessine la page, avec son titre et sa ligne d'introduction.
- `SettingsCard` dessine une carte, dans la page.
- `SettingRow` dessine une ligne, dans une carte.

```tsx title="web/index.tsx"
import { SectionPage, SettingRow, SettingsCard, definePlugin } from 'hodi:sdk'
import { NotebookPen } from 'lucide-react'

const NotesPage = ({ layout }) => (
  <SectionPage
    title="Mes notes"
    intro="Les notes prises en lisant."
    layout={layout}
  >
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

Avec cet exemple, la page Réglages affiche une entrée pour le plugin, avec une icône de carnet. Un clic sur cette entrée ouvre la page _Mes notes_. La page _Mes notes_ contient une carte, et cette carte contient une ligne _Notes enregistrées : 12_.

## Les props

Hodi donne une seule prop au composant de la page du plugin : `layout`.

Sur un ordinateur, la page Réglages s'affiche en colonnes : la liste des entrées à gauche, la page ouverte à droite. Sur une tablette ou un téléphone, la page Réglages s'affiche page par page. La prop `layout` dit dans lequel de ces deux cas se trouve la page du plugin.

Le composant de la page n'a rien à faire de `layout` lui-même : il suffit de passer `layout` tel quel à `SectionPage`, qui s'occupe de la mise en page.

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | `'desktop'` quand la page Réglages s'affiche en colonnes, `'phone'` quand la page Réglages s'affiche page par page. À passer tel quel à `SectionPage`. |

## L'icône et la ligne grise

Dans la liste de la page Réglages, chaque entrée a une icône à gauche de son nom, et une ligne grise sous son nom. Le nom de l'entrée du plugin est toujours le nom du plugin. L'icône et la ligne grise de l'entrée du plugin se choisissent avec deux autres clés de `definePlugin`, toutes les deux facultatives.

Voici les trois clés de `definePlugin` qui servent à la page Réglages :

<!-- prettier-ignore -->
| Clé de `definePlugin` | Type | |
| --- | --- | --- |
| `page` | `ComponentType<{ layout }>` | Le composant de la page du plugin, décrit plus haut. Sans cette clé, la page Réglages n'a pas d'entrée pour le plugin. |
| `menuIcon?` | `ComponentType` | L'icône à gauche du nom de l'entrée, une icône Lucide. Sans cette clé, Hodi affiche une pièce de puzzle. |
| `menuHint?` | `ComponentType` | La ligne grise sous le nom de l'entrée, par exemple _12 notes_. Sans cette clé, Hodi affiche la description du plugin. |

`menuHint` est un composant, et pas un simple texte : le composant `menuHint` peut donc lire des données, par exemple le nombre de notes, et afficher ce nombre.

## À savoir

- **Qui voit l'entrée du plugin** : les profils prévus par `audience` dans `plugin.json`.
- **Avec `audience: "admin"`** : seul l'admin du foyer voit l'entrée du plugin et sa page.
- **Le titre de la page du plugin** : le plugin le donne, avec `SectionPage`.
- **Si la page du plugin plante** : Hodi affiche un message à la place de cette page.
