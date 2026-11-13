---
title: "Vue d'ensemble"
description: "Une carte du tableau de bord du serveur, avec un chiffre ou un graphique du plugin sur la période."
intro: "Une carte du tableau de bord du serveur, après « En ligne » et « Profils » : un chiffre ou un graphique du plugin sur la période choisie."
order: 4
icon: "layout-dashboard"
topic: "ai"
key: "overviewCards"
---

## Exemple

```tsx title="web/index.tsx"
const SaidCard = ({ from, to }) => (
  <OverviewCard title="Bonjours" count={12}>
    …
  </OverviewCard>
)

definePlugin({
  overviewCards: [
    {
      id: 'said',
      size: 'narrow',
      component: SaidCard
    }
  ]
})
```

## Sa taille

- `narrow` : un tiers de la largeur d'un ordinateur, la moitié d'une tablette ;
- `wide` : deux tiers d'un ordinateur, la moitié d'une tablette ;
- `full` : toute la largeur.

Sur un téléphone, chaque carte prend toute la largeur.

## À savoir

- **Ce qu’elle reçoit** : `from` et `to`, la période affichée, deux jours inclus, au format `AAAA-MM-JJ`.
- **Son dessin** : `OverviewCard`, avec son titre, un nombre et une puce.
- **Si elle plante** : Hodi le dit à sa place, et le reste du tableau continue.
