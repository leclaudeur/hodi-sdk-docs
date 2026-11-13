---
title: "Hooks"
description: "Les textes de ton plugin, ses routes, ses liens et les réglages du serveur."
intro: "Ces hooks savent quel plugin les appelle : ils ne marchent que dans ses composants."
order: 7
icon: "anchor"
topic: "science"
---

## usePluginTranslation()

Les textes de ton plugin, dans la langue de la personne, depuis `locales/`. Jamais ceux de Hodi.

```tsx title="web/index.tsx"
import { usePluginTranslation } from 'hodi:sdk'

const { t, language } = usePluginTranslation()
t('greeting', { name: 'Anna' })
```

<!-- prettier-ignore -->
| Renvoie | Type | |
| --- | --- | --- |
| `t` | `(key: string, options?) => string` | Le texte d'une clé, avec ses variables. |
| `language` | `'fr' \| 'en'` | La langue de la personne. |

## usePluginApi()

Une requête vers tes `routes` : `api('/hello')` demande `/api/plugins/<id>/hello`. Ses deux sœurs font de même pour tes autres tables de routes, voir [le contexte serveur](/fr/guide/server-context/).

```tsx title="web/index.tsx"
import { usePluginApi, usePluginPublicApi, usePluginServerApi } from 'hodi:sdk'

const api = usePluginApi()
const answer = await api('/hello', { method: 'POST' })
const { greeting } = await answer.json()
```

<!-- prettier-ignore -->
| Hooks | Type | |
| --- | --- | --- |
| `usePluginApi()` | `(path, init?) => Promise<Response>` | Tes `routes`. |
| `usePluginServerApi()` | `(path, init?) => Promise<Response>` | Tes `serverRoutes`, pour l'admin du serveur seulement. |
| `usePluginPublicApi()` | `(path, init?) => Promise<Response>` | Tes `publicRoutes`, avant toute connexion. |

`init` est celui de `fetch`, plus `proof` : le mot de passe que `askToConfirm` a reçu.

## usePluginLinks()

Les adresses de Hodi et de tes écrans. Un plugin ne les écrit jamais : elles suivent Hodi.

```tsx title="web/index.tsx"
import { Button, navigate, usePluginLinks } from 'hodi:sdk'

const links = usePluginLinks()
<Button href={links.page('week/3')}>Cette semaine</Button>
<Button onClick={() => navigate(links.frontPage)}>Accueil</Button>
```

<!-- prettier-ignore -->
| Renvoie | Type | |
| --- | --- | --- |
| `frontPage` | `string` | La une. |
| `article` | `(id: string) => string` | Un article, dans le lecteur. |
| `settings` | `string` | Réglages. |
| `plugins` | `string` | Ta page dans Serveur › Plugins, pour l'admin du serveur. |
| `page` | `(path?: string) => string` | Ta page, ou un de ses écrans. |
| `serverPage` | `(section: string, path?: string) => string` | Une de tes sections de Serveur, ou un de ses écrans. |

`navigate(href)` y va, comme un lien, depuis un bouton ou après une action.

## usePluginPath()

L'écran que montre ta page : ce qui suit son adresse, `''` à sa racine.

```tsx title="web/index.tsx"
import { usePluginPath } from 'hodi:sdk'

const path = usePluginPath()
return path.startsWith('week/') ? <Week n={Number(path.slice(5))} /> : <Home />
```

<!-- prettier-ignore -->
| Renvoie | Type | |
| --- | --- | --- |
| `path` | `string` | Ce qui suit l'adresse de ta page. |

## useServerSettings()

Ce que promettent Serveur › Contenu et Sauvegardes, en lecture seule : les chiffres que disent tes pages légales. null tant que le serveur n'a pas répondu.

```tsx title="web/index.tsx"
import { useServerSettings } from 'hodi:sdk'

const settings = useServerSettings()
settings && t('privacy.kept', { days: settings.articleDays })
```

<!-- prettier-ignore -->
| Renvoie | Type | |
| --- | --- | --- |
| `articleDays` | `number` | Les jours qu'un article est gardé. |
| `videoDays` | `number` | Les jours qu'une vidéo est gardée. |
| `textDays` | `number` | Les jours qu'un texte lu est gardé. |
| `backupCopies` | `number` | Les copies de la base gardées chaque nuit. |
| `maxSources` | `number \| null` | Les sources qu'un foyer peut suivre, null sans limite. |
