---
title: "Serveur et web"
description: "Un plugin ajoute une fonction à Hodi sans toucher à son code."
intro: "Un plugin ajoute une fonction à Hodi sans toucher à son code. Il a deux parties : l'une tourne sur le serveur, l'autre s'affiche dans l'app. Cette page explique comment elles marchent et se parlent."
order: 1
icon: "layers"
---

## Le dossier d'un plugin

Un plugin tient dans un dossier. Le plus simple est de partir du [modèle de plugin](https://github.com/leclaudeur/hodi-plugin-template) : il marche tel quel, avec sa construction, ses tests et sa CI.

```text title="mon-plugin/"
plugin.json        ce qu'il est : son nom, pour qui, ses réglages, ses permissions
server/index.ts    sa partie serveur
web/index.tsx      sa partie web, une fois connecté
web/public.tsx     ses écrans avant la connexion, s'il en a
locales/fr.json    ses textes, un fichier par langue
locales/en.json
assets/            ses images, copiées telles quelles
test/              ses tests
```

Seul `plugin.json` est obligatoire, et [le manifeste](/fr/guide/manifest/) le détaille. Un plugin peut n'avoir qu'une partie serveur, ou qu'une partie web sans route à lui.

## La construction

`npx hodi-plugin build` fait de ce dossier un seul fichier `.hodi-plugin`, celui que Hodi installe :

- `server/index.ts` devient `server.js`, avec ses paquets npm dedans ;
- `web/index.tsx` devient `web.js` et `web.css` ;
- `web/public.tsx` devient `web-public.js` et `web-public.css` ;
- `plugin.json`, `locales/` et `assets/` sont copiés tels quels.

[Publier](/fr/guide/publish/) explique comment le tester, le construire et le faire signer.

## La partie serveur

Elle tourne dans le bac à sable de Hodi, un fil à part avec son propre moteur JavaScript, jamais dans Hodi lui-même. Elle exporte un objet `ServerPlugin`.

Elle n'importe aucun module de Node ni de Hodi. Les paquets npm sont acceptés tant qu'ils n'en demandent pas : la construction les met dans `server.js`. Tout le reste arrive dans son contexte, `ctx`, que [le contexte serveur](/fr/guide/server-context/) détaille :

- **sa propre base**, un fichier SQLite à elle, avec ses tables nommées comme elle veut ;
- **ses réglages**, tels que l'admin les a choisis ;
- **ce que ses permissions lui ouvrent**, et rien d'autre : un site, l'IA, les e-mails…

## Les limites du bac à sable

- **Mémoire** : 16 Mo, 32 au plus si `memoryMb` le demande.
- **Durée** : 10 secondes par appel ; au-delà, Hodi l'arrête.
- **Réponse** : 1 Mo au plus par appel.
- **Base** : 256 Mo au plus.
- **File d'attente** : 8 appels au plus derrière celui qui tourne ; au-delà, `busy`.
- **Plantages** : 3 en 10 minutes, et le plugin attend le prochain démarrage de Hodi.

Le fil s'endort après une minute sans appel, et se réveille au suivant : ne garde rien en mémoire entre deux appels, mets-le dans ta base.

## La partie web

Elle se charge une fois la personne connectée, en arrière-plan : l'app n'attend jamais un plugin pour s'afficher. Elle reçoit React et les composants de Hodi de la page, qu'elle importe de `hodi:sdk`. Le plugin a donc l'air du reste de l'app, dans chaque thème et sur chaque taille d'écran.

- **Ses emplacements** : `definePlugin()` dit où elle s'affiche, voir [les emplacements](/fr/guide/slots/).
- **Ses composants** : ceux de l'app, listés dans [composants](/fr/components/).
- **Ses textes** : `usePluginTranslation()` lit ceux de son dossier `locales/`.
- **Ses styles** : un fichier CSS, ses classes préfixées par son id, les couleurs de Hodi.

Les styles en ligne (`style=`) sont refusés par la page de Hodi : passe toujours par une classe. Les variables de couleur de Hodi changent avec le thème, une couleur écrite en dur non.

Hodi n'affiche la partie web que d'un plugin signé, ou de celui que tu écris en mode développeur : elle tourne dans la page de Hodi, avec la session de la personne.

## Comment elles se parlent

La partie web appelle ses routes par leur chemin, et Hodi fait le reste : il vérifie qui demande, puis passe la requête à la partie serveur.

```tsx title="web/index.tsx"
const api = usePluginApi()
const answer = await api('/hello', { method: 'POST' })
const { text } = await answer.json()
```

1. `api('/hello')` demande `/api/plugins/hello-world/hello`.
2. Hodi vérifie la session, le profil et que le plugin est bien pour lui.
3. Il appelle la route `'POST /hello'` avec `request.who`, sans aucun cookie.
4. Ce qu'elle répond revient tel quel à la partie web, en JSON.

## Les textes

Chaque texte va dans `locales/fr.json`, la référence, et dans `locales/en.json`. Le français dit « tu ». Chaque fichier traduit aussi le nom, la description et les réglages du plugin :

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
2. **Un Hodi de test**, le tien, avec _Serveur › Plugins › Mode développeur_ activé.
3. **Le SDK** : `npm install --save-dev @hodi-app/plugin-sdk` dans son dossier.

Pour voir les quatre étapes en vrai, suis les [premiers pas](/fr/guide/) : un plugin complet en 15 minutes.
