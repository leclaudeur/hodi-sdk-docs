---
title: "Composants"
description: "La partie web importe les composants de Hodi depuis `hodi:sdk` : ceux de l'app, avec leurs tailles, leurs couleurs et leurs trois thèmes."
intro: "La partie web importe les composants de Hodi depuis `hodi:sdk`. Ce sont ceux de l'app, avec leurs tailles, leurs couleurs et leurs trois thèmes : ton plugin a l'air d'être de Hodi."
order: 1
icon: "component"
cards: "components"
---

```tsx title="web/index.tsx"
import { Button, SettingRow, SettingsCard } from 'hodi:sdk'
```

Chaque page montre le rendu réel, le code qui le donne, puis toutes les props. Les icônes viennent de `lucide-react`, que ton plugin ajoute à ses dépendances.

## Les règles

- **Pas de style en ligne** : la page de Hodi les refuse. Ton CSS va dans `web.css`.
- **Les couleurs de Hodi** : ses variables CSS, jamais une couleur en dur.
- **Un composant de Hodi d'abord** : n'en dessine un à toi que pour ce qu'aucun ne fait.
