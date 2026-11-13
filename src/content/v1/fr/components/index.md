---
title: "Composants"
description: "La partie web importe les composants de Hodi depuis `hodi:sdk` : ceux de l'app, avec leurs tailles, leurs couleurs et leurs trois thèmes."
intro: "La partie web importe les composants de Hodi depuis `hodi:sdk`. Ce sont ceux de l'app, avec leurs tailles, leurs couleurs et leurs trois thèmes : le plugin a l'air d'être de Hodi."
order: 1
icon: "component"
cards: "components"
---

```tsx title="web/index.tsx"
import { Button, SettingRow, SettingsCard } from 'hodi:sdk'
```

Chaque page montre le rendu réel du composant, le code qui le dessine, puis toutes ses props. Les icônes viennent de `lucide-react`, que le plugin ajoute à ses propres dépendances.

## Les règles

- **Pas de style en ligne** : la page de Hodi refuse les styles en ligne. Le CSS du plugin va dans un fichier, avec des classes préfixées par son id.
- **Les couleurs de Hodi** : les [tokens](/fr/tokens/), jamais une couleur écrite en dur.
- **Un composant de Hodi d'abord** : le plugin ne dessine son propre composant que pour ce qu'aucun composant de Hodi ne fait.
