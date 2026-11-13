---
title: "Publier"
description: "Du dossier d'un plugin au bouton « Installer » de chaque Hodi : tester, essayer sur un Hodi de test, construire le fichier, puis le faire vérifier et signer par le registre des plugins."
intro: "Du dossier d'un plugin au bouton « Installer » de chaque Hodi : tester, essayer sur un Hodi de test, construire le fichier, puis le faire vérifier et signer par le registre des plugins."
order: 5
icon: "package"
---

## Tester

Le SDK lance la partie serveur comme Hodi : il la construit, la charge dans le même bac à sable et appelle ses routes avec les mêmes vérifications. Autour, un petit Hodi en mémoire, avec un foyer et des remplaçants pour les sites, les e-mails, les notifications et l'IA. Un test n'envoie donc jamais rien à personne : il tourne de la même façon en CI et en local.

```tsx title="test/plugin.test.ts"
import { testPlugin } from '@hodi-app/plugin-sdk/testing'

const hodi = await testPlugin('.', { settings: { greeting: 'Salut' } })
const child = await hodi.addPerson({ name: 'Zoé', kind: 'child' })

const answer = await hodi.route('POST /hello', { as: child })
assert.deepEqual(answer.body, { text: 'Salut' })
```

Dans le modèle de plugin, `npm test` lance ces tests, et la CI les relance à chaque push. Un plugin qui les passe se comporte pareil dans un vrai Hodi.

## Essayer sur un Hodi de test

1. Dans _Serveur › Plugins_, activer le **mode développeur** et copier le code.
2. Lancer `hodi-plugin dev` depuis le dossier du plugin, avec l'adresse du Hodi de test.
3. À chaque enregistrement, il reconstruit le plugin, l'envoie et affiche son journal.

```sh title="Terminal"
npx hodi-plugin dev --server http://localhost:3000 --code 482913
```

Hodi redémarre tout seul pour charger chaque version, en quelques secondes. Le plugin y apparaît « En développement » : ses pages s'affichent même sans signature, et il garde ses données d'une version à l'autre. Le code peut aussi venir de `HODI_DEV_CODE`, pour qu'il reste hors de l'historique du terminal, où on le retrouverait sinon.

## Construire

```sh title="Terminal"
npx hodi-plugin build
```

Le fichier `dist/<id>-<version>.hodi-plugin` est alors prêt à installer.

L'admin d'un Hodi l'installe dans _Serveur › Plugins › Installer depuis un fichier_, même sur un serveur qu'il ne gère que depuis son navigateur. Hodi lui montre d'abord son nom, sa version et ses permissions, puis attend qu'il confirme.

## Être « Vérifié »

Une signature dit à Hodi qui a fait un plugin. Hodi ne fait confiance qu'à la clé de son mainteneur. Un autre plugin s'installe comme « Code non vérifié », après une confirmation de plus. Ses pages ne s'affichent pas, et il n'a pas les [permissions](/fr/guide/manifest/) des plugins signés.

1. **Publier le plugin** dans un dépôt public, avec une release.
2. **Ouvrir une pull request** qui l'ajoute au [registre des plugins](https://github.com/leclaudeur/hodi-plugin-registry).
3. **Le mainteneur lit son code**, et signe cette version s'il suit les règles de Hodi.

Une fois listé, il apparaît dans _Serveur › Plugins › Disponibles_ de chaque Hodi, prêt à installer en un clic. Chaque nouvelle version est relue avant d'être signée.

## Les règles de Hodi

- **Pas d'IA sans un clic** : seul `AiButton` la demande, une fois par clic.
- **Chaque texte dans les locales**, en français et en anglais ; le français dit « tu ».
- **Les composants de Hodi** plutôt que les tiens, et ses couleurs plutôt qu'en dur.
- **Les données des gens** : le plugin dit ce qu'il garde, et l'efface quand ils partent.
- **Les migrations** s'ajoutent au bout, et ne se modifient jamais une fois publiées.

Le mainteneur relit chacune avant de signer. Une clé privée ne va jamais dans un dépôt.
