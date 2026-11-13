---
title: "Installation"
description: "Des étapes du plugin dans la mise en route de Hodi, pour ce qu'il doit savoir dès le premier démarrage."
intro: "Des étapes du plugin dans la mise en route de Hodi, l'assistant qui s'ouvre au premier démarrage. Elles servent à ce que le plugin doit savoir dès le départ, comme le nom d'un site public."
order: 8
icon: "list-checks"
topic: "travel"
key: "setupSteps"
---

## Où elles s'affichent

La mise en route de Hodi enchaîne des étapes. L'une d'elles, « Plugins trouvés », liste les plugins présents et laisse les activer. Les étapes des plugins activés viennent juste après, avant « Le serveur est prêt ».

## Exemple

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
      <TextField aria-label="Nom du site" value={name} onChange={event => setName(event.target.value)} />
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

## Une étape

<!-- prettier-ignore -->
| Champ | Type | |
| --- | --- | --- |
| `id` | `string` | Lettres minuscules, chiffres et tirets. La mise en route y revient après un rechargement. |
| `title` | `string` | Une clé de ses `locales` : le titre de l'étape. |
| `intro` | `string` | Une clé de ses `locales` : la ligne sous le titre. |
| `page` | `ComponentType<{ next, layout }>` | Le contenu de l'étape. |

## Ce qu'elle reçoit

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `next` | `() => void` | Passe à l'étape suivante, une fois ce qu'il faut enregistré. |
| `layout` | `'desktop' \| 'phone'` | La taille d'écran. |

## Qui dessine quoi

- **Hodi** dessine la carte, le titre, la ligne sous le titre, la numérotation et « Retour ».
- **Le plugin** dessine le milieu, et termine par `SetupActions`, qui affiche « Continuer ».

## À savoir

- **Qui les voit** : seulement si le plugin a été activé à l'étape « Plugins trouvés ».
- **Une étape de Hodi** : `{ id: 'mail', core: 'mail' }` place le formulaire de _Serveur › E-mail_ parmi les étapes du plugin.
