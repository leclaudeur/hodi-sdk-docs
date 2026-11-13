---
title: "Réglages et pages"
description: "Une page de réglages, ses cartes, ses lignes, la fin d'une longue liste et les cartes de Vue d'ensemble."
intro: "Ces composants construisent une page de réglages, comme celles des emplacements [`page`](/fr/guide/slots/settings/) et [`serverSections`](/fr/guide/slots/server/), et les cartes de [`overviewCards`](/fr/guide/slots/overview/). Une page faite avec eux a la même allure que les pages de Hodi."
order: 2
icon: "settings"
topic: "world"
preview: "settingrow"
---

## SectionPage

Une page de réglages entière : son titre, la phrase qui l'explique, puis ses cartes. Sur un téléphone, le titre passe dans l'en-tête de Hodi. La page reçoit `layout` de l'emplacement qui la dessine, et le passe à `SectionPage`.

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
| `title` | `string` | Le titre de la page, déjà traduit. |
| `layout` | `'desktop' \| 'phone'` | La taille de l'écran, telle que l'emplacement la donne à la page. |
| `intro?` | `ReactNode` | Une phrase sous le titre, qui dit à quoi sert la page. |
| `aside?` | `ReactNode` | Un élément à côté du titre, ou sous le titre sur un téléphone. |
| `children` | `ReactNode` | Les cartes de la page, des `SettingsCard`. |

## SettingsCard

Une carte qui regroupe des lignes de réglage. Son nom s'affiche en petites capitales au-dessus de la carte.

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
| `label?` | `string` | Le nom du groupe, affiché au-dessus de la carte. |
| `children` | `ReactNode` | Les lignes de la carte, des `SettingRow`. |

## SettingRow

Une ligne de réglage. Sous son nom, une ligne de 14 px montre sa valeur, ou à défaut une aide courte, jamais les deux. Son action est un bouton avec un texte au bout de la ligne ; sur un téléphone, ce bouton devient un rond de 38 px avec la même icône. Un choix (`Segmented`) passe sous le texte sur un téléphone.

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
| `value?` | `ReactNode` | La valeur du réglage, dans la couleur du texte. Une ligne avec une valeur n'a pas d'aide : l'explication va dans la fenêtre qui change la valeur. |
| `hint?` | `ReactNode` | Une aide courte, en gris, sur une seule ligne, quand la ligne n'a pas de valeur. |
| `lead?` | `ReactNode` | Un élément avant le texte, comme un avatar ou une icône. |
| `action?` | `RowAction \| RowAction[]` | Un bouton au bout de la ligne, ou deux côte à côte. Un `RowAction` a un `label`, une `icon`, un `look`, un `onClick` ou un `href`, et peut être `disabled` ou `busy`. `ariaLabel` donne un nom plus complet aux lecteurs d'écran. |
| `choice?` | `ReactNode` | Un `Segmented`, au bout de la ligne, ou sous le texte sur un téléphone. |
| `as?` | `'div' \| 'li'` | La balise de la ligne : `div` par défaut, `li` quand les lignes forment une liste. |
| `children?` | `ReactNode` | Des éléments au bout de la ligne, avant l'action, qui restent au même endroit sur un téléphone : un `Toggle`, une `Chip` ou de petits boutons ronds. |

## MoreRow

La dernière ligne d'une longue liste, quand la liste ne montre que ses premiers éléments. Un clic sur cette ligne montre le reste.

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
| `label` | `string` | Le texte de la ligne, comme « Voir les 4 autres », dans les mots du plugin. |
| `onClick` | `() => void` | Ce que fait le clic : montrer le reste de la liste. |

## OverviewCard

Une carte de [`overviewCards`](/fr/guide/slots/overview/), dans _Serveur › Vue d'ensemble_. Sa ligne de titre montre un titre, un nombre et une puce au bout. Le plugin met ce qu'il veut dessous, comme un graphique.

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
| `title` | `string` | Le titre de la carte, déjà traduit. |
| `count?` | `number` | Un nombre affiché en gris à côté du titre. |
| `aside?` | `ReactNode` | Un élément au bout de la ligne du titre, comme une `Chip` ou une légende. |
| `children?` | `ReactNode` | Le contenu de la carte, sous la ligne du titre. |
