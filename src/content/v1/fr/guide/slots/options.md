---
title: "settingsPage"
description: "Une carte du plugin dans Serveur › Plugins, sous ses réglages, pour ce qu'un réglage seul ne permet pas."
intro: "Une carte que le plugin dessine lui-même sur sa page de _Serveur › Plugins_, sous les réglages que Hodi dessine pour lui. Elle sert à ce que de simples réglages ne permettent pas : un bouton pour tester, une liste, des statistiques…"
order: 1
icon: "sliders-horizontal"
topic: "tech"
key: "settingsPage"
---

## Où dans Hodi

L'admin du serveur ouvre _Serveur › Plugins_, puis la page d'un plugin. Cette page montre, de haut en bas :

1. Le nom du plugin, sa version et son interrupteur.
2. « Options » : les [réglages](/fr/guide/manifest/#les-réglages--settings) que Hodi dessine.
3. La carte `settingsPage`, que le plugin dessine.
4. Les boutons pour supprimer le plugin.

Le plugin ne dessine que la carte `settingsPage`. Le reste de la page vient de Hodi.

## Exemple

Hello world met dans cette carte un bouton « Dire bonjour ». Un clic sur ce bouton appelle la route `/hello`, puis la carte affiche la réponse :

```tsx title="web/index.tsx"
import { Button, SettingRow, definePlugin, usePluginApi } from 'hodi:sdk'
import { useState } from 'react'

const HelloCard = () => {
  const api = usePluginApi()
  const [text, setText] = useState('Réponse de ta route')
  const sayHello = async () => {
    const answer = await api('/hello', { method: 'POST' })
    setText((await answer.json()).text)
  }
  return (
    <SettingRow label="Dire bonjour" hint={text}>
      <Button compact onClick={sayHello}>
        Dire bonjour
      </Button>
    </SettingRow>
  )
}

definePlugin({ settingsPage: HelloCard })
```

## À savoir

- **Ce que Hodi donne au composant** : aucune prop.
- **Les données de la carte** : les routes du plugin, avec `usePluginApi()`.
- **Qui voit la carte** : l'admin du serveur seulement, comme toute la page.
- **Quand la carte s'affiche** : seulement quand le plugin est activé.
- **Le dessin de la carte** : des `SettingRow`, comme les réglages au-dessus.
