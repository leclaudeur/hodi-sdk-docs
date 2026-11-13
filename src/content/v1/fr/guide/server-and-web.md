---
title: "Serveur et web"
description: "Les deux parties d'un plugin Hodi : où chacune tourne, ce qu'elle peut faire et comment elles se parlent."
intro: "Un plugin ajoute une fonction à Hodi sans toucher à son code. Il a deux parties : l'une tourne sur le serveur, l'autre dans le navigateur."
order: 1
icon: "layers"
---

## En bref

- **La partie serveur** répond aux routes du plugin. Elle tourne sur le serveur de Hodi, isolée de Hodi lui-même, et garde ses données dans sa propre base SQLite.
- **La partie web** dessine les écrans du plugin. Elle tourne dans le navigateur, dans les pages de Hodi, avec les composants de Hodi.
- **Entre les deux**, la partie web appelle les routes du serveur et Hodi vérifie la session.

Un plugin peut n'avoir qu'une des deux : une partie serveur qui ne fait que lire des articles, ou une partie web sans route à elle.

## Le dossier d'un plugin

Un plugin tient dans un dossier. Le [modèle de plugin](https://github.com/leclaudeur/hodi-plugin-template) en donne un qui marche tel quel, avec sa construction, ses tests et sa CI.

```text title="mon-plugin/"
plugin.json        son nom, pour qui il est, ses réglages, ses permissions
server/index.ts    la partie serveur
web/index.tsx      la partie web, une fois connecté
web/public.tsx     ses écrans avant la connexion, s'il en a
locales/fr.json    ses textes, un fichier par langue
locales/en.json
assets/            ses images, copiées telles quelles
test/              ses tests
```

Seul `plugin.json` est obligatoire. [Le manifeste](/fr/guide/manifest/) le détaille.

## La construction

`npx hodi-plugin build` fait de ce dossier un seul fichier `.hodi-plugin`, celui que Hodi installe :

- `server/index.ts` devient `server.js`, un seul fichier avec tout le code qu'il importe ;
- `web/index.tsx` devient `web.js` et `web.css` ;
- `web/public.tsx` devient `web-public.js` et `web-public.css` ;
- `plugin.json`, `locales/` et `assets/` sont copiés tels quels.

[Publier](/fr/guide/publish/) explique comment le tester, le construire et le faire signer.

## La partie serveur

Hodi ne charge pas ce code dans son propre processus. Il le lance dans un moteur JavaScript à part, QuickJS, dans un thread à lui. Ce moteur ne connaît que le JavaScript standard : pas de `require`, pas de `fs`, pas de `fetch`, pas de `process`.

Le fichier exporte un objet `ServerPlugin`, avec ses routes et ses hooks. Tout ce qui sort du JavaScript standard passe par le contexte que Hodi lui donne, `ctx`, que [le contexte serveur](/fr/guide/server-context/) détaille :

- **sa base** : un fichier SQLite à lui, avec ses tables nommées comme il veut ;
- **ses réglages** : tels que l'admin les a choisis ;
- **ce que ses permissions ouvrent**, et rien d'autre : un site, l'IA, les e-mails…

Les paquets npm marchent s'ils sont écrits en JavaScript pur, comme `date-fns` ou `zod` : la construction les copie dans `server.js`. Un paquet qui a besoin de Node, par exemple pour lire un fichier ou ouvrir une connexion, ne marche pas.

### Ses limites

- **Mémoire** : 16 Mo, jusqu'à 32 si `memoryMb` le demande.
- **Durée** : 10 secondes par appel. Au-delà, Hodi arrête l'appel.
- **Réponse** : 1 Mo au plus par appel.
- **Base** : 256 Mo au plus.
- **File d'attente** : 8 appels au plus derrière celui qui tourne. Au-delà, Hodi répond `busy`.
- **Plantages** : après 3 en 10 minutes, le plugin attend le prochain démarrage de Hodi.

Le thread s'arrête après une minute sans appel, et repart au suivant. Une variable globale ne survit donc pas entre deux appels : ce qui doit durer va dans la base.

## La partie web

Elle se charge une fois la personne connectée, en arrière-plan : l'app n'attend jamais un plugin pour s'afficher. Elle utilise le React et les composants de la page de Hodi, qu'elle importe de `hodi:sdk`. Le plugin a donc l'air du reste de l'app, dans chaque thème et sur chaque taille d'écran.

- **Ses emplacements** : `definePlugin()` dit où elle s'affiche, voir [les emplacements](/fr/guide/slots/).
- **Ses composants** : ceux de l'app, listés dans [composants](/fr/components/).
- **Ses textes** : `usePluginTranslation()` lit ceux de son dossier `locales/`.
- **Ses styles** : un fichier CSS, des classes préfixées par l'id du plugin, les couleurs de Hodi.

La page de Hodi refuse les styles en ligne (`style=`) : les styles passent toujours par une classe. Les variables de couleur de Hodi suivent le thème, une couleur écrite en dur non.

La partie web tourne dans la page de Hodi, avec la session de la personne. Hodi ne l'affiche donc que pour un plugin signé, ou pour le plugin en cours d'écriture en mode développeur.

## Comment elles se parlent

La partie web appelle une route par son chemin. Hodi vérifie qui demande, puis passe la requête à la partie serveur.

```tsx title="web/index.tsx"
const api = usePluginApi()
const answer = await api('/hello', { method: 'POST' })
const { text } = await answer.json()
```

1. `api('/hello')` demande `/api/plugins/hello-world/hello`.
2. Hodi vérifie la session, le profil et que le plugin est bien pour lui.
3. Il appelle la route `'POST /hello'` de la partie serveur, avec `request.who` mais sans aucun cookie.
4. Ce qu'elle répond revient tel quel à la partie web, en JSON.

## Les textes

Chaque texte va dans `locales/fr.json`, la référence, et dans `locales/en.json`. Les textes français d'un plugin tutoient la personne, comme le reste de Hodi. Chaque fichier traduit aussi le nom, la description et les réglages du plugin :

```json title="locales/fr.json"
{
  "manifest": {
    "name": "Hello world",
    "description": "Un réglage, une route et sa propre carte."
  },
  "settings": {
    "greeting": "Message",
    "greetingHint": "Ce que le plugin répond"
  },
  "say": "Dire bonjour"
}
```

## Pour commencer

1. **Node.js 24** ou plus récent.
2. **Un Hodi de test**, avec _Serveur › Plugins › Mode développeur_ activé.
3. **Le SDK** : `npm install --save-dev @hodi-app/plugin-sdk` dans le dossier du plugin.

Les [premiers pas](/fr/getting-started/) font les quatre étapes d'un plugin complet, dans un éditeur.
