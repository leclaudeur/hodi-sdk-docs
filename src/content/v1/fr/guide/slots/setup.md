---
title: "Installation"
description: "Ses étapes dans la mise en route de Hodi, pour ce que ton plugin doit savoir dès le premier démarrage."
intro: "Des étapes dans la mise en route de Hodi, entre « Plugins trouvés » et « Le serveur est prêt » : pour ce que ton plugin doit savoir dès le départ."
order: 8
icon: "list-checks"
topic: "travel"
key: "setupSteps"
---

## Exemple

```tsx title="web/index.tsx"
const Welcome = ({ next }) => (
  <>
    <TextField label="Nom du site" … />
    <SetupActions onNext={next} />
  </>
)

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

## À savoir

- **Qui les voit** : seulement un plugin activé à l'étape « Plugins trouvés ».
- **Ce que Hodi dessine** : la carte, le titre, la ligne sous le titre, la numérotation et « Retour ».
- **Ce que tu dessines** : le milieu, jusqu'à `SetupActions`, puis `next()`.
- **Une étape de Hodi** : `core: 'mail'` y place le formulaire de Serveur › E-mail.
