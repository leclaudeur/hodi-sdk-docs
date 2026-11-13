---
title: "Composants"
description: "La partie web importe les composants de Hodi depuis `hodi:sdk` : ce sont ceux de l'app, avec leurs tailles, leurs couleurs et leurs thèmes."
intro: "La partie web importe les composants de Hodi depuis `hodi:sdk` : ce sont ceux de l'app, avec leurs tailles, leurs couleurs et leurs thèmes."
order: 1
icon: "component"
---

```tsx title="web/index.tsx"
import { Button, SettingRow, SettingsCard } from 'hodi:sdk'
```

## Boutons

- `Button` : le bouton avec un libellé, 44 px ou 32 px, neutre, principal, danger ou IA.
- `RoundButton` : le bouton rond d'une icône.
- `AiButton` : le bouton violet, le seul qui demande l'IA du foyer.
- `ReaderButton` : un bouton au bout d'un article, dans le lecteur.

## Réglages et pages

- `SectionPage` : une page, avec son titre et son « ? ».
- `SettingsCard` : une carte de lignes de réglages.
- `SettingRow` : une ligne : un titre, sa valeur ou une aide, et une action au bout.
- `MoreRow` : « Voir les 4 autres », au bas d'une liste.
- `OverviewCard` : une carte de Vue d'ensemble.
- `StepPage`, `TilesPage` et `SetupActions` : les pages d'étapes et de choix.

## Champs

- `TextField` : un champ de texte.
- `PasswordField` et `PasswordGauge` : un mot de passe avec son œil, et sa force.
- `PinField` : une case par caractère d'un code.
- `Toggle`, `Checkbox` et `AgeCheckbox` : un interrupteur et des cases à cocher.
- `Segmented` : un choix parmi quelques-uns, dans une pilule.

## Dialogues et messages

- `Dialog` et `DialogActions` : une fenêtre et la rangée de ses boutons.
- `askToConfirm()` : la question avant ce qui ne se défait pas.
- `showDone()`, `showSaved()` et `showError()` : les toasts de Hodi.
- `StatusLine` et `Notice` : un message dans la page, ou dans un encadré.
- `EmptyState` : un titre et une ligne, quand une liste est vide.

## Petits éléments

- `Chip` et `FilterChip` : les puces et les filtres.
- `SourceAvatar` et `HouseholdAvatar` : l'avatar d'une source et celui d'un foyer.

## Hooks

- `usePluginTranslation()` : ses textes, dans la langue de la personne.
- `usePluginApi()`, `usePluginServerApi()` et `usePluginPublicApi()` : ses trois tables de routes.
- `usePluginLinks()`, `usePluginPath()` et `navigate()` : ses liens et ses adresses.
- `useServerSettings()` : les durées de Serveur › Contenu et Sauvegardes.
