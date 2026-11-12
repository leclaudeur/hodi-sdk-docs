---
title: "Réglages"
description: "Son entrée et sa page dans Réglages, pour ce que chaque profil règle ou consulte lui-même."
intro: "Une entrée de Réglages rien qu'à ton plugin, avec sa propre page : pour ce que chaque profil du foyer règle ou consulte lui-même."
order: 2
icon: "settings"
topic: "world"
key: "page"
---

## Où elle s'affiche

`menu`, dans `plugin.json`, dit dans quel groupe de Réglages vient l'entrée, et après laquelle. Sans groupe connu, elle va à la fin du groupe Foyer.

```json title="plugin.json"
"menu": {
  "group": "you",
  "after": "stats"
}
```

Les six groupes de Réglages sont Lecture, Sujets, Toi, Foyer, Cet appareil et Hodi. Dans `plugin.json`, ils s'appellent `reading`, `subjects`, `you`, `household`, `device` et `about`.

## Exemple

```tsx title="web/index.tsx"
import { SectionPage, SettingsCard, definePlugin } from 'hodi:sdk'

const NotesPage = ({ layout }) => (
  <SectionPage title="Mes notes" layout={layout}>
    <SettingsCard>…</SettingsCard>
  </SectionPage>
)

definePlugin({
  page: NotesPage,
  menuIcon: NotebookPen
})
```

## À savoir

- **Ce qu’elle reçoit** : `layout`, `desktop` ou `phone`, à passer à `SectionPage`.
- **Son icône** : `menuIcon`, une icône Lucide de 18 px ; sans elle, une pièce de puzzle.
- **Sa ligne** : `menuHint`, sous son nom, comme « 12 articles signalés ».
- **Qui la voit** : les profils de `audience`, comme ses routes.
