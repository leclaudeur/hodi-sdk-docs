---
title: "setupSteps"
description: "Des étapes du plugin dans la mise en route de Hodi, pour ce qu'il doit savoir dès le premier démarrage."
intro: "Des étapes du plugin dans la mise en route de Hodi, l'assistant qui s'ouvre au premier démarrage. Elles servent à ce que le plugin doit savoir dès le départ, comme le nom d'un site public."
order: 12
icon: "list-checks"
topic: "travel"
key: "setupSteps"
---

## Où dans Hodi

La mise en route de Hodi est l'assistant qui s'ouvre au premier démarrage. L'assistant enchaîne des étapes. L'une de ces étapes, _Plugins trouvés_, liste les plugins présents et propose de les activer. Les étapes des plugins activés viennent juste après, avant _Le serveur est prêt_.

## Exemple

Cette étape demande le nom du site, l'enregistre, puis passe à l'étape suivante avec `next()` :

```tsx title="web/index.tsx"
import { SetupActions, TextField, definePlugin } from 'hodi:sdk'

const Welcome = ({ next }) => {
  const [name, setName] = useState('')
  const save = async () => {
    await saveName(name)
    next()
  }
  return (
    <>
      <TextField
        aria-label="Nom du site"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <SetupActions onNext={save} />
    </>
  )
}

definePlugin({
  setupSteps: [
    {
      id: 'welcome',
      title: 'setup.title',
      intro: 'setup.intro',
      page: Welcome
    }
  ]
})
```

## Les champs d'une étape

`setupSteps` est une liste. Chaque étape de la liste a quatre champs :

<!-- prettier-ignore -->
| Champ | Type | |
| --- | --- | --- |
| `id` | `string` | Minuscules, chiffres et tirets. Après un rechargement, l'assistant revient à cette étape. |
| `title` | `string` | Le titre de l'étape, une clé des `locales`. |
| `intro` | `string` | La ligne sous le titre, une clé des `locales`. |
| `page` | `ComponentType<{ next, layout }>` | Le contenu de l'étape. |

## Les props

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `next` | `() => void` | Passe à l'étape suivante, une fois les valeurs de l'étape enregistrées. |
| `layout` | `'desktop' \| 'phone'` | La taille de l'écran. |

## Qui dessine quoi

- **Hodi** dessine la carte, le titre, la ligne sous le titre, la numérotation et _Retour_.
- **Le plugin** dessine le milieu, et termine par `SetupActions`, qui affiche _Continuer_.

## À savoir

- **Qui voit les étapes** : l'admin, si le plugin est activé à l'étape _Plugins trouvés_.
- **Une étape de Hodi** : `{ id: 'mail', core: 'mail' }` ajoute le formulaire de _Serveur › E-mail_.
