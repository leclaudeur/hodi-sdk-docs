---
title: "Publier"
description: "Du dossier d'un plugin au bouton « Installer » de chaque Hodi : tester, essayer sur un Hodi de test, construire le fichier, puis le faire vérifier et signer par le registre des plugins."
intro: "Du dossier d'un plugin au bouton « Installer » de chaque Hodi : tester, essayer sur un Hodi de test, construire le fichier, puis le faire vérifier et signer par le registre des plugins."
order: 5
icon: "package"
---

## En bref

Un plugin passe par quatre étapes avant d'arriver chez les gens. Les trois premières se font seul, sur sa machine. La dernière passe par le mainteneur de Hodi.

<!-- prettier-ignore -->
| Étape | Ce qu'elle fait | La commande |
| --- | --- | --- |
| [Tester](#tester) | Vérifie la partie serveur, sans aucun Hodi. | `npm test` |
| [Essayer](#essayer-sur-un-hodi-de-test) | Installe le plugin sur un Hodi de test, à chaque enregistrement. | `npx hodi-plugin dev` |
| [Construire](#construire) | Fabrique le fichier `.hodi-plugin` à installer. | `npm run build` |
| [Être vérifié](#être-vérifié) | Le mainteneur relit le code et signe le fichier. | Une pull request |

Le [modèle de plugin](https://github.com/leclaudeur/hodi-plugin-template) contient déjà tout : le SDK, les scripts et la CI. Il n'y a rien à installer en plus.

## Tester

### Ce que fait un test

Un test lance la partie serveur du plugin **comme Hodi la lance** :

1. Le SDK construit le plugin.
2. Il le charge dans le même bac à sable que Hodi.
3. Il appelle ses routes avec les mêmes vérifications que Hodi.

Autour, il y a un petit Hodi en mémoire : un foyer, son admin, et des remplaçants pour les sites, les e-mails, les notifications et l'IA. Un test n'envoie donc jamais rien à personne. Il tourne pareil sur sa machine et dans la CI.

### Un exemple

Le modèle de plugin a déjà ce fichier. Il demande la route `POST /hello` et regarde la réponse :

```ts title="test/plugin.test.ts"
import assert from 'node:assert/strict'
import { after, describe, it } from 'node:test'
import { testPlugin } from '@hodi-app/plugin-sdk/testing'

describe('my-plugin', async () => {
  const hodi = await testPlugin('.', {
    settings: {
      greeting: 'Salut'
    }
  })
  after(() => hodi.stop())

  it('answers a child too', async () => {
    const child = await hodi.addPerson({
      name: 'Zoé',
      kind: 'child'
    })
    const answer = await hodi.route('POST /hello', {
      as: child
    })
    assert.equal(answer.status, 200)
  })
})
```

Pour lancer les tests :

```sh title="Terminal"
npm test
```

La CI du modèle les relance à chaque push. Un plugin qui passe ses tests se comporte pareil une fois installé dans un vrai Hodi.

### Les options de testPlugin

`testPlugin('.')` prend le dossier du plugin. Le deuxième argument, facultatif, prépare le petit Hodi :

<!-- prettier-ignore -->
| Option | Type | Ce qu'elle prépare |
| --- | --- | --- |
| `settings` | `object` | Les réglages, comme l'admin les aurait choisis. Les autres gardent leur valeur par défaut. |
| `sites` | `object` | La réponse de chaque site de `permissions.network`, par adresse. Une autre adresse échoue, comme un site fermé. |
| `articles` | `object` | Les articles que Hodi connaît, par id, pour `ctx.articles`. |
| `ai` | `(question) => string` | La réponse de l'IA à chaque question. Sans cette option, le foyer n'a pas d'IA. |
| `mail` | `boolean` | L'e-mail est configuré sur le serveur (`true` par défaut). |
| `household` | `object` | Le nom (`name`) et la langue (`language`) du foyer. |
| `unsigned` | `boolean` | Le plugin est construit sans signature. Hodi refuse alors ce qu'il refuserait en vrai. |

### Ce que le petit Hodi permet

<!-- prettier-ignore -->
| Nom | Ce qu'il fait |
| --- | --- |
| `route('POST /hello', { as, body, query })` | Appelle une route du plugin. Sans `as`, c'est l'admin du foyer qui appelle. |
| `addPerson({ name, kind })` | Ajoute quelqu'un au foyer : `adult`, `teen` ou `child`. |
| `click(action, input)` | Simule un clic sur l'`AiButton` du plugin. |
| `runTask(name)` | Lance une tâche, comme Hodi le ferait à son heure. |
| `readFeed(key)` | Lit un flux du plugin, comme un foyer qui le suit. |
| `exportData(person)` | Demande la copie des données d'une personne. |
| `mails` | Les e-mails que le plugin a envoyés, dans l'ordre. |
| `notifications` | Les notifications que le plugin a envoyées, dans l'ordre. |
| `questions` | Les questions que le plugin a posées à l'IA, dans l'ordre. |
| `log` | Les lignes du journal du plugin, et celles de Hodi à son sujet (une permission refusée, par exemple). |
| `stop()` | Arrête le petit Hodi à la fin des tests. |

## Essayer sur un Hodi de test

Un test vérifie la partie serveur. Pour voir aussi la partie web, il faut un vrai Hodi : le **mode développeur** y installe le plugin, puis le remet à jour à chaque enregistrement.

### Ce qu'il faut

- Un Hodi à soi, sur sa machine par exemple (`http://localhost:3000`).
- Être l'admin de son serveur.

Un Hodi de test évite de mélanger ses essais avec les données de son foyer.

### Les étapes

1. Ouvrir _Serveur › Plugins_ sur le Hodi de test.
2. Activer le **mode développeur** : Hodi affiche un code, une seule fois.
3. Copier ce code.
4. Dans le dossier du plugin, lancer la commande ci-dessous en remplaçant `LE_CODE`.
5. Laisser la commande tourner pendant le travail.

```sh title="Terminal"
npx hodi-plugin dev --server http://localhost:3000 --code LE_CODE
```

<!-- prettier-ignore -->
| Option | Ce qu'elle donne |
| --- | --- |
| `--server` | L'adresse du Hodi de test. |
| `--code` | Le code du mode développeur. Il peut aussi venir de la variable `HODI_DEV_CODE`, pour qu'il ne reste pas dans l'historique du terminal. |
| un dossier | Le dossier du plugin, si la commande n'est pas lancée depuis ce dossier. |

### Ce qui se passe ensuite

À chaque enregistrement d'un fichier, la commande :

1. reconstruit le plugin ;
2. l'envoie au Hodi de test ;
3. attend que Hodi redémarre avec la nouvelle version (quelques secondes) ;
4. affiche le journal du plugin dans le terminal.

Dans Hodi, le plugin porte le badge _En développement_. Ses pages s'affichent même sans signature, et il garde ses données d'une version à l'autre. `Ctrl+C` arrête la commande.

## Construire

### Le fichier du plugin

```sh title="Terminal"
npm run build
```

La commande écrit un seul fichier, `dist/<id>-<version>.hodi-plugin`. Par exemple `dist/hello-world-0.1.0.hodi-plugin`. C'est ce fichier que les gens installent.

### L'installer à la main

N'importe quel admin peut installer ce fichier, même sur un serveur qu'il ne gère que depuis son navigateur :

1. Ouvrir _Serveur › Plugins_.
2. Cliquer sur **Ajouter un plugin** et choisir le fichier.
3. Lire ce que Hodi montre : le nom, la version et les permissions.
4. Confirmer l'installation.

### Ce que l'admin voit avant d'installer

Hodi regarde si le fichier est signé, et le dit à l'admin :

<!-- prettier-ignore -->
| Hodi affiche | Quand | Ce qui se passe |
| --- | --- | --- |
| _Vérifié_ | Le fichier est signé par la clé du mainteneur de Hodi. | Le plugin s'installe avec tout ce qu'il demande. |
| _Code non vérifié_ | Le fichier n'est pas signé, ou par une autre clé. | Le plugin s'installe après une confirmation de plus. Ses pages ne s'affichent pas. |
| _Pas installable sans signature_ | Le fichier n'est pas signé et demande une permission réservée aux plugins signés. | Hodi refuse de l'installer. |

Les permissions réservées aux plugins signés sont listées dans [Le manifeste](/fr/guide/manifest/#les-permissions).

## Être vérifié

### Pourquoi une signature

Une signature dit à Hodi **qui a fait un plugin**. Hodi ne fait confiance qu'à une seule clé : celle de son mainteneur.

Les pages d'un plugin tournent dans la page de Hodi, avec la session de la personne connectée. C'est pour ça que seul un plugin signé, ou celui qui est en développement, peut afficher les siennes.

### Les étapes

1. Mettre le plugin dans un dépôt GitHub **public**.
2. Publier une release `v<version>` (par exemple `v0.1.0`) avec son fichier `.hodi-plugin`.
3. Ajouter le plugin au [registre des plugins](https://github.com/leclaudeur/hodi-plugin-registry) par une pull request.
4. Le mainteneur lit le code du plugin.
5. S'il suit les [règles de Hodi](#les-règles-de-hodi), il signe cette version et accepte la pull request.

Dans le modèle de plugin, pousser un tag `v0.1.0` suffit pour l'étape 2 : la CI construit le fichier et crée la release toute seule.

### L'entrée dans le registre

Le registre est une simple liste, le fichier `plugins.json`. Une entrée demande deux champs, et la commande `npm run index` du registre remplit le reste depuis la release :

```json title="plugins.json"
{
  "repo": "https://github.com/me/hodi-plugin-hello-world",
  "version": "0.1.0"
}
```

Le [README du registre](https://github.com/leclaudeur/hodi-plugin-registry#add-or-update-a-plugin) détaille les commandes à lancer avant la pull request.

### Ensuite

- Le plugin apparaît dans _Serveur › Plugins › Disponibles_ de chaque Hodi, prêt à installer en un clic.
- Chaque nouvelle version passe par une nouvelle pull request.

Cette nouvelle version est relue, puis signée à son tour.

## Les règles de Hodi

Le mainteneur vérifie chacune de ces règles avant de signer un plugin.

<!-- prettier-ignore -->
| Règle | Pourquoi |
| --- | --- |
| **Pas d'IA sans un clic.** Seul `AiButton` interroge l'IA, une fois par clic. | L'IA coûte de l'argent au foyer : rien ne doit la lancer dans son dos. |
| **Chaque texte dans les locales**, en français et en anglais. Les textes du plugin disent « tu ». | Hodi est bilingue, et parle à chacun de la même façon. |
| **Les composants et les couleurs de Hodi**, pas des boutons ni des couleurs maison. | Le plugin ressemble au reste de Hodi, dans les trois thèmes. |
| **Les données des gens** : le plugin dit ce qu'il garde, et l'efface quand ils partent. | Chacun peut récupérer ou effacer ce que Hodi sait de lui. |
| **Les migrations s'ajoutent au bout**, et ne changent jamais une fois publiées. | Un Hodi qui a déjà installé une version doit pouvoir passer à la suivante. |
| **Aucune clé privée** dans le dépôt ni dans le dossier du plugin. | Une clé publiée permettrait à n'importe qui de signer à la place de son auteur. |
