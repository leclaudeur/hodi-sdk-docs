---
title: "Ses options"
description: "Une carte du plugin sous ses réglages, dans Serveur › Plugins, pour tout ce que ces réglages ne disent pas."
intro: "Sous les réglages que Hodi dessine pour le plugin, dans Serveur › Plugins : une carte à lui, pour ce que des réglages seuls ne disent pas."
order: 1
icon: "sliders-horizontal"
topic: "tech"
key: "settingsPage"
---

## Où elle s'affiche

L'admin du serveur ouvre le plugin dans _Serveur › Plugins_, avec son rond « Gérer ». Hodi y dessine d'abord les lignes des réglages de `plugin.json`, puis la carte du plugin en dessous.

## Exemple

```tsx title="web/index.tsx"
import { Button, SettingRow, definePlugin, usePluginApi } from 'hodi:sdk'

const HelloCard = () => {
  const api = usePluginApi()
  return (
    <SettingRow label="Dire bonjour" hint="Réponse de ta route">
      <Button compact onClick={() => api('/hello', { method: 'POST' })}>
        Dire bonjour
      </Button>
    </SettingRow>
  )
}

definePlugin({ settingsPage: HelloCard })
```

## À savoir

- **Ce qu’elle reçoit** : rien : elle lit ses réglages et appelle ses routes.
- **Qui la voit** : l'admin du serveur, qui gère les plugins.
- **Ses lignes** : des `SettingRow`, comme celles que Hodi dessine au-dessus.
