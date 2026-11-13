---
title: "Hooks"
description: "Les textes du plugin, ses routes, ses liens et les réglages du serveur."
intro: "Les hooks de `hodi:sdk` donnent à un composant du plugin ses textes, ses routes, ses liens et les réglages du serveur. Chaque hook sait quel plugin l'appelle : il ne marche que dans les composants de ce plugin."
order: 2
icon: "anchor"
topic: "science"
---

## usePluginTranslation()

Ce hook donne les textes du plugin, dans la langue de la personne. Il les lit dans les fichiers `locales/` du plugin, jamais dans ceux de Hodi.

```tsx title="web/index.tsx"
import { usePluginTranslation } from 'hodi:sdk'

const { t, language } = usePluginTranslation()
t('greeting', { name: 'Anna' })
```

<!-- prettier-ignore -->
| Renvoie | Type | |
| --- | --- | --- |
| `t` | `(key: string, options?) => string` | Renvoie le texte d'une clé. `options` remplit ses variables, comme `{{name}}`. |
| `language` | `'fr' \| 'en'` | La langue de la personne. |

## usePluginApi()

Ce hook renvoie une fonction qui appelle les `routes` du plugin. `api('/hello')` demande `/api/plugins/<id>/hello` : le plugin n'écrit jamais l'adresse entière. Deux autres hooks font la même chose pour les deux autres sortes de routes, que [le contexte serveur](/fr/guide/server-context/#trois-sortes-de-routes) explique.

```tsx title="web/index.tsx"
import { usePluginApi, usePluginPublicApi, usePluginServerApi } from 'hodi:sdk'

const api = usePluginApi()
const answer = await api('/hello', { method: 'POST' })
const { greeting } = await answer.json()
```

<!-- prettier-ignore -->
| Hooks | Type | |
| --- | --- | --- |
| `usePluginApi()` | `(path, init?) => Promise<Response>` | Appelle les `routes` du plugin, pour les profils du foyer. |
| `usePluginServerApi()` | `(path, init?) => Promise<Response>` | Appelle les `serverRoutes` du plugin. Seul l'admin du serveur peut les appeler. |
| `usePluginPublicApi()` | `(path, init?) => Promise<Response>` | Appelle les `publicRoutes` du plugin, même avant toute connexion. |

La fonction renvoyée prend les mêmes options que `fetch`, plus une : `proof`, la preuve que `askToConfirm()` a reçue quand la personne a retapé son mot de passe. Une route marquée `proof: true` ne tourne qu'avec elle.

## usePluginLinks()

Ce hook donne les adresses des écrans de Hodi et du plugin. Un plugin ne les écrit jamais à la main : elles restent justes même quand Hodi change ses adresses.

```tsx title="web/index.tsx"
import { Button, navigate, usePluginLinks } from 'hodi:sdk'

const links = usePluginLinks()
<Button href={links.page('week/3')}>Cette semaine</Button>
<Button onClick={() => navigate(links.frontPage)}>Accueil</Button>
```

<!-- prettier-ignore -->
| Renvoie | Type | |
| --- | --- | --- |
| `frontPage` | `string` | L'adresse de la une. |
| `article` | `(id: string) => string` | L'adresse d'un article dans le lecteur, par son id. |
| `settings` | `string` | L'adresse de Réglages. |
| `plugins` | `string` | L'adresse de la page du plugin dans _Serveur › Plugins_. Seul l'admin du serveur peut l'ouvrir. |
| `page` | `(path?: string) => string` | L'adresse de la page du plugin dans Réglages, ou d'un de ses écrans avec `path`. |
| `serverPage` | `(section: string, path?: string) => string` | L'adresse d'une section du plugin dans l'espace Serveur, ou d'un de ses écrans avec `path`. |

Pour aller à une de ces adresses depuis le code, après une action par exemple, `navigate(href)` fait la même chose qu'un clic sur un lien.

## usePluginPath()

Ce hook dit quel écran la page du plugin doit montrer. Il renvoie ce qui suit l'adresse de la page : `''` à sa racine, `'week/3'` pour l'adresse que `links.page('week/3')` donne.

```tsx title="web/index.tsx"
import { usePluginPath } from 'hodi:sdk'

const path = usePluginPath()
return path.startsWith('week/') ? <Week n={Number(path.slice(5))} /> : <Home />
```

<!-- prettier-ignore -->
| Renvoie | Type | |
| --- | --- | --- |
| `path` | `string` | Ce qui suit l'adresse de la page du plugin, ou `''` à sa racine. |

## useServerSettings()

Ce hook donne les durées et les limites choisies par l'admin dans _Serveur › Contenu_ et _Sauvegardes_, en lecture seule. Un plugin s'en sert pour écrire les vrais chiffres, par exemple dans ses pages légales. Il vaut `null` tant que le serveur n'a pas répondu.

```tsx title="web/index.tsx"
import { useServerSettings } from 'hodi:sdk'

const settings = useServerSettings()
settings && t('privacy.kept', { days: settings.articleDays })
```

<!-- prettier-ignore -->
| Renvoie | Type | |
| --- | --- | --- |
| `articleDays` | `number` | Le nombre de jours pendant lesquels Hodi garde un article. |
| `videoDays` | `number` | Le nombre de jours pendant lesquels Hodi garde une vidéo. |
| `textDays` | `number` | Le nombre de jours pendant lesquels Hodi garde le texte d'un article lu. |
| `backupCopies` | `number` | Le nombre de copies de la base que Hodi garde, une par nuit. |
| `maxSources` | `number \| null` | Le nombre de sources qu'un foyer peut suivre, ou `null` quand il n'y a pas de limite. |
