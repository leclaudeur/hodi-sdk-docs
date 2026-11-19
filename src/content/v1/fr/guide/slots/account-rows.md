---
title: "accountRows"
description: "Des lignes du plugin à la fin de la carte _Compte_, dans Réglages › Mon compte."
intro: "Des lignes que le plugin ajoute à la fin de la carte _Compte_, dans _Réglages › Mon compte_. Elles servent à montrer ce que le plugin sait du compte, comme un compte Google lié."
order: 13
icon: "user-round"
topic: "world"
key: "accountRows"
---

## Où dans Hodi

Chaque personne a une page _Réglages › Mon compte_. La carte _Compte_ de cette page montre l'e-mail et le mot de passe du compte. Les lignes `accountRows` du plugin s'ajoutent à la fin de cette carte.

## Exemple

```tsx title="web/index.tsx"
import { SettingRow, definePlugin } from 'hodi:sdk'

const GoogleRow = () => <SettingRow label="Google" value="anna@gmail.com" />

definePlugin({ accountRows: GoogleRow })
```

## Les props

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | La taille de l'écran. |

## À savoir

- **Le dessin des lignes** : des `SettingRow`, comme les lignes de Hodi dans la même carte.
- **Qui voit les lignes** : chaque personne, sur la page de son propre compte.
