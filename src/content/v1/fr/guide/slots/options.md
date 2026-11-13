---
title: "Sa carte d'admin"
description: "Une carte du plugin sur sa page de Serveur › Plugins, sous ses réglages, pour ce que des réglages seuls ne permettent pas."
intro: "Une carte que le plugin dessine lui-même sur sa page de _Serveur › Plugins_, sous les réglages que Hodi dessine pour lui. Elle sert à ce que de simples réglages ne permettent pas : un bouton pour tester, une liste, des statistiques…"
order: 1
icon: "sliders-horizontal"
topic: "tech"
key: "settingsPage"
---

## Où elle s'affiche

L'admin du serveur ouvre _Serveur › Plugins_, puis la page d'un plugin. Cette page a, de haut en bas :

1. Le nom du plugin, sa version et son interrupteur.
2. « Options » : les [réglages](/fr/guide/manifest/#les-réglages) de `plugin.json`, que Hodi dessine.
3. La carte du plugin, `settingsPage`.
4. Les boutons pour supprimer le plugin.

Le plugin ne dessine que la partie 3. Le reste vient de Hodi.

## Exemple

Hello world y met un bouton « Dire bonjour » qui appelle sa route et affiche la réponse :

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

- **Ce qu'elle reçoit** : rien. Elle lit ses réglages avec ses routes, et les appelle avec `usePluginApi()`.
- **Qui la voit** : l'admin du serveur seulement, comme toute la page _Serveur › Plugins_.
- **Quand elle s'affiche** : seulement quand le plugin est activé.
- **Son dessin** : des `SettingRow`, comme les lignes des réglages au-dessus. La carte a ainsi l'air de faire partie de la page.
