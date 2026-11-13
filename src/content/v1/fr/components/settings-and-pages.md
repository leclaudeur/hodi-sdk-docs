---
title: "Réglages et pages"
description: "Une page de réglages, ses cartes, ses lignes, la fin d'une longue liste et les cartes de Vue d'ensemble."
intro: "Les pages des emplacements [Réglages](/fr/guide/slots/settings/) et [Serveur](/fr/guide/slots/server/) se construisent avec ces composants."
order: 2
icon: "settings"
topic: "world"
preview: "settingrow"
---

## SectionPage

Une page de réglages : son titre, la ligne qui l'explique, puis ses cartes. Sur téléphone, le titre passe dans l'en-tête de Hodi. Elle reçoit `layout` de l'emplacement qui la dessine.

```tsx title="web/index.tsx" render="sectionpage" play="sectionpage"
import { SectionPage, SettingRow, SettingsCard } from 'hodi:sdk'
import { Pencil } from 'lucide-react'

<SectionPage
  title="Hello world"
  intro="Une salutation, chaque fois que tu ouvres Hodi."
  layout="desktop"
>
  <SettingsCard>
    <SettingRow
      label="Salutation"
      value="Salut"
      action={{
        label: 'Changer',
        icon: Pencil,
        onClick: edit
      }}
    />
  </SettingsCard>
</SectionPage>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `title` | `string` | Le titre de la page. |
| `layout` | `'desktop' \| 'phone'` | Celui que l'emplacement donne à la page. |
| `intro?` | `ReactNode` | Ce que fait la page, sous son titre. |
| `aside?` | `ReactNode` | À côté du titre, ou dessous sur téléphone. |
| `children` | `ReactNode` | Ses cartes, des `SettingsCard`. |

## SettingsCard

Un groupe de lignes : son nom en petites capitales, puis ses lignes dans une carte.

```tsx title="web/index.tsx" render="settingscard" play="settingscard"
import { SettingRow, SettingsCard } from 'hodi:sdk'
import { Pencil } from 'lucide-react'

<SettingsCard label="Salutation">
  <SettingRow
    label="Texte"
    value="Salut"
    action={{
      label: 'Changer',
      icon: Pencil,
      onClick: edit
    }}
  />
</SettingsCard>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `label?` | `string` | Le nom du groupe, au-dessus de la carte. |
| `children` | `ReactNode` | Ses lignes, des `SettingRow`. |

## SettingRow

Une ligne de réglage. Sous son nom, une ligne de 14 px : sa valeur, ou à défaut une aide courte, jamais les deux. Son action est un bouton avec un libellé, qui devient un rond de 38 px sur téléphone. Un choix (`Segmented`) passe sous le texte sur téléphone.

```tsx title="web/index.tsx" render="settingrow" play="settingrow"
import { SettingRow, SettingsCard } from 'hodi:sdk'
import { Pencil } from 'lucide-react'

<SettingsCard>
  <SettingRow
    label="Texte"
    value="Salut"
    action={{
      label: 'Changer',
      icon: Pencil,
      onClick: edit
    }}
  />
</SettingsCard>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `label` | `ReactNode` | Le nom du réglage. |
| `value?` | `ReactNode` | Sa valeur. Une ligne avec une valeur n'a pas d'aide : l'explication va dans la fenêtre qui la change. |
| `hint?` | `ReactNode` | Ce qu'il fait, en gris, sur une ligne. |
| `lead?` | `ReactNode` | Une marque avant le texte : un avatar, une étoile. |
| `action?` | `RowAction \| RowAction[]` | Un bouton au bout, ou deux côte à côte. `RowAction` : `label`, `icon`, `look`, `onClick` ou `href`, `disabled`, `busy`, `ariaLabel`. |
| `choice?` | `ReactNode` | Un `Segmented` : au bout, ou sous le texte sur téléphone. |
| `as?` | `'div' \| 'li'` | `li` dans une liste. Par défaut `div`. |
| `children?` | `ReactNode` | Au bout, avant l'action, et au même endroit sur téléphone : un `Toggle`, une `Chip`, de petits ronds. |

## MoreRow

La dernière ligne d'une liste qui ne montre que ses premiers éléments : un clic ouvre le reste.

```tsx title="web/index.tsx" render="morerow" play="morerow"
import { MoreRow, SettingRow, SettingsCard } from 'hodi:sdk'

<SettingsCard>
  <SettingRow label="Anna" value="Salut !" />
  <MoreRow label="Voir les 4 autres" onClick={showAll} />
</SettingsCard>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `label` | `string` | « Voir les 4 autres », dans les mots du plugin. |
| `onClick` | `() => void` | Montre le reste. |

## OverviewCard

Une carte de [Vue d’ensemble](/fr/guide/slots/overview/) : son titre, un nombre, une puce au bout, puis le contenu du plugin.

```tsx title="web/index.tsx" render="overviewcard" play="overviewcard"
import { Chip, OverviewCard } from 'hodi:sdk'
import WeekChart from './WeekChart.tsx'

<OverviewCard
  title="Bonjours"
  count={128}
  aside={<Chip tone="success">+12 cette semaine</Chip>}
>
  <WeekChart days={week} />
</OverviewCard>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `title` | `string` | Son titre, déjà traduit. |
| `count?` | `number` | Un nombre à côté du titre, en gris. |
| `aside?` | `ReactNode` | Au bout de la ligne du titre : une `Chip`, une légende. |
| `children?` | `ReactNode` | Le contenu de la carte. |
