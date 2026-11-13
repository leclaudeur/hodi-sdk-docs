---
title: "Types"
description: "Tous les types du SDK, partie par partie, avec chacun de leurs champs."
intro: "Le SDK donne les types de chaque partie. L'éditeur les montre pendant l'écriture, avec leurs commentaires. Cette page les rassemble tous : la sidebar mène droit à chacun."
order: 4
icon: "type"
---

## Où les trouver

- `@hodi-app/plugin-sdk/server` : la partie serveur et le manifeste.
- `hodi:sdk` : la partie web, avec `@hodi-app/plugin-sdk/hodi-sdk` dans `tsconfig.json`.
- `@hodi-app/plugin-sdk/testing` : le kit de test.

```ts title="server/index.ts"
import type { PluginContext, PluginRequest, ServerPlugin } from '@hodi-app/plugin-sdk/server'
```

## Partie serveur

### ServerPlugin

Ce que `server/index.ts` exporte par défaut. Tout est facultatif. Voir [le contexte serveur](/fr/guide/server-context/).

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `migrations?` | `readonly string[]` | Les changements de sa base, dans l'ordre. Jamais modifiés une fois publiés. |
| `routes?` | `PluginRoutes` | Servies sous `/api/plugins/<id>/` aux profils de son audience. |
| `serverRoutes?` | `PluginRoutes` | Servies sous `/api/server/plugins/<id>/` à l'admin du serveur seulement. |
| `publicRoutes?` | `PublicRoutes` | Servies sous `/api/public/plugins/<id>/` à tout le monde, avec `permissions.publicRoutes`. 30 requêtes par minute et par adresse. |
| `tasks?` | `Record<string, PluginTask>` | Un travail qui revient tout seul : purger, rappeler. |
| `feeds?` | `Record<string, (ctx) => Promise<PluginFeedArticle[]>>` | Les articles de chaque flux, par sa clé. |
| `aiActions?` | `Record<string, PluginAiAction>` | Ce que lancent ses `AiButton`, par leur nom. Le seul endroit où `ctx.ai` répond. |
| `onArticle?` | `(article: PluginArticle, ctx) => Promise<void>` | Chaque article que Hodi lit pour la première fois. |
| `checkSignIn?` | `(who, ctx) => Promise<string \| null>` | Avec `permissions.signIn` : à chaque connexion. null laisse entrer, une clé de ses locales refuse avec ce message. |
| `onProfileDeleted?` | `(deleted, ctx) => Promise<void>` | Un profil supprimé : le plugin efface ce qu'il en gardait. |
| `onAccountDeleted?` | `(deleted, ctx) => Promise<void>` | Un compte supprimé. |
| `onHouseholdRemoved?` | `(removed, ctx) => Promise<void>` | Un foyer retiré. |
| `exportData?` | `(who, ctx) => Promise<unknown>` | Ses données, pour « Télécharger une copie ». |

### PluginContext

Le `ctx` que reçoit chaque route, tâche et hook. Les pouvoirs marqués d'une permission n'existent qu'avec elle dans [le manifeste](/fr/guide/manifest/).

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `string` | L'id du plugin. |
| `db` | `PluginDatabase` | Sa propre base SQLite. |
| `settings` | `() => SettingValues` | Ses réglages tels qu'ils sont. |
| `log` | `(message: string) => void` | Une ligne dans le journal de Hodi. |
| `fetchText` | `(url, options?) => Promise<{ url; text }>` | Une page d'un site de `permissions.network`. |
| `http` | `(url, options?) => Promise<{ url; status; contentType; text }>` | Toute requête vers ces sites, comme un échange OAuth. 64 Ko envoyés, 512 Ko reçus au plus. |
| `articles` | `{ get; page }` | Un article lu par Hodi, et sa page. |
| `serverSettings` | `() => Promise<ServerSettings>` | Les durées de Serveur › Contenu et Sauvegardes. |
| `mail` | `{ available; appUrl; send }` | Avec `permissions.mail` : un e-mail par Serveur › E-mail. 50 par heure au plus. |
| `households` | `{ list; get; of; create; suspend; resume; remove }` | Les foyers du serveur. |
| `accounts` | `{ get; findByEmail; create; checkPassword; findByLogin; addLogin }` | Avec `permissions.accounts` : les comptes, jamais de quoi s'y connecter. |
| `notify?` | `(notice) => Promise<void>` | Avec `permissions.notify` : une notification, dix par jour et par profil au plus. |
| `ai?` | `{ ask }` | Avec `permissions.ai`, plugin signé : une question à l'IA du foyer, une fois par clic. |

### PluginDatabase

`ctx.db` : la base du plugin, à lui seul. Un BLOB est un `Uint8Array`, dans les deux sens.

<!-- prettier-ignore -->
| Méthodes | Type | |
| --- | --- | --- |
| `query` | `(sql, params?) => Record<string, SqlValue>[]` | Les lignes d'un SELECT. |
| `get` | `(sql, params?) => Record<string, SqlValue> \| null` | La première ligne, ou null. |
| `run` | `(sql, params?) => { changes; lastInsertRowid }` | Un INSERT, un UPDATE ou un DELETE. |

### PluginRequest

Ce qu'une route reçoit.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `method` | `'GET' \| 'POST' \| 'PUT' \| 'PATCH' \| 'DELETE'` | La méthode. |
| `path` | `string` | Le chemin sous celui du plugin : `/notes/12`. |
| `params` | `Record<string, string>` | Les parties nommées du chemin. |
| `query` | `Record<string, string>` | Les paramètres de l'adresse. |
| `body` | `unknown` | Le JSON envoyé, ou null. Pour une route `raw`, ses octets. |
| `who` | `PluginCaller` | Qui demande. |

### PluginCaller

Qui demande, tel que Hodi l'a vérifié. Aucun cookie, en-tête ni session n'arrive au plugin.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `profileId` | `number \| null` | Le profil ouvert sur l'appareil. null dans l'espace Serveur pour un admin hors du foyer. |
| `householdId` | `number \| null` | Son foyer : il sépare les données des foyers. |
| `kind` | `'adult' \| 'teen' \| 'child'` | Le type du profil. |
| `householdAdmin` | `boolean` | L'admin du foyer. |
| `serverAdmin` | `boolean` | L'admin du serveur. |
| `accountId` | `number \| null` | Le compte connecté sur l'appareil, qui peut différer de celui du profil ouvert. |

### PluginResponse

Ce qu'une route répond : du JSON, ou un zip que Hodi construit et envoie en téléchargement. Hodi ne laisse passer que les statuts 2xx et 4xx.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `status?` | `number` | 200 par défaut. |
| `body?` | `unknown` | Du JSON. |
| `headers?` | `{ 'Cache-Control'?: string }` | Le seul en-tête qu'une route choisit. |
| `moveDevice?` | `number` | Avec `permissions.households` : l'appareil lit dans ce foyer à partir de maintenant. |
| `zip?` | `{ filename; entries: PluginZipEntry[] }` | À la place de tout ça : un zip. Une entrée est un texte, ou la première colonne d'une ligne de sa base (`{ path, blob: { sql, params } }`). |

### PluginRoutes

Une table de routes : `'METHODE /chemin'`, avec `:nom` pour une partie du chemin. Chaque route est une fonction, ou un objet avec des options.

<!-- prettier-ignore -->
| Options | Type | |
| --- | --- | --- |
| `handler` | `(request, ctx) => Promise<PluginResponse>` | La fonction de la route. |
| `proof?` | `boolean` | Une route sensible : elle ne tourne qu'une fois que la personne a tapé son mot de passe dans `askToConfirm`. |
| `raw?` | `true` | Un corps brut au lieu du JSON : une image, un fichier. |
| `maxBody?` | `number` | La taille maximale du corps brut, 10 Mo au plus. |

### PublicRoutes

Les routes ouvertes à tous, avant connexion : du JSON seulement, 64 Ko au plus. Leur requête a `who: null`, et leur réponse peut connecter l'appareil.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `signIn?` | `number` | Avec `permissions.signIn` : connecte l'appareil à ce compte, si l'appel l'a créé ou a vérifié son mot de passe. |

### PluginTask

Un travail de `tasks`. Il ne tourne pour aucun foyer : pas d'IA, pas de connexion.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `every` | `number` | En minutes : de 15 à une semaine. |
| `run` | `(ctx) => Promise<void>` | Le travail. |

### PluginFeedArticle

Un article d'un flux de `feeds`. Il s'ouvre avec son résumé et son lien, jamais dans le lecteur.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `title` | `string` | Son titre. |
| `link` | `string` | Son adresse en https, sur le site du flux. |
| `summary?` | `string` | Son résumé, en texte. |
| `publishedAt?` | `string \| number` | Une date ISO, ou des millisecondes depuis 1970. |
| `image?` | `string` | Une image en https. |

### PluginAiAction

Une action de `aiActions`, lancée par un clic sur un `AiButton`. Sa réponse arrive dans `onAnswer`.

<!-- prettier-ignore -->
| Reçoit | Type | |
| --- | --- | --- |
| `request.input` | `unknown` | Ce que le bouton a reçu, 16 Ko de JSON au plus. |
| `request.who` | `{ householdId; profileId }` | L'adulte qui a cliqué. |

### PluginArticle

Un article de `ctx.articles.get()` ou de `onArticle`.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `string` | Son id. |
| `title` | `string` | Son titre. |
| `url` | `string` | Son adresse sur son site. |
| `sourceId` | `string` | L'id de sa source. |
| `sourceName` | `string` | Le nom de sa source. |
| `publishedAt` | `string \| null` | Sa date. |
| `status` | `'ok' \| 'unreadable' \| 'failed'` | `ok` : le lecteur a son texte. `unreadable` : pas de texte. `failed` : le site n'a pas répondu. |
| `text` | `{ title; byline; contentHtml; textLength } \| null` | Le texte du lecteur, quand il y en a un. |

### PluginHousehold

Ce qu'un plugin sait d'un foyer : jamais ce qu'il contient.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `number` | Son id. |
| `name` | `string` | Son nom. |
| `language` | `'fr' \| 'en'` | Sa langue. |
| `createdAt` | `number` | Sa date de création. |
| `suspended` | `boolean` | Suspendu par le plugin qui l'a créé. |
| `mine` | `boolean` | Créé par ce plugin : le seul qu'il peut suspendre ou retirer. |
| `photo` | `string \| null` | L'adresse de sa photo, pour `HouseholdAvatar`. |

### PluginAccount

Ce qu'un plugin sait d'un compte.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `number` | Son id. |
| `email` | `string` | Son adresse e-mail. |
| `loginOnly` | `boolean` | Créé avec un login seul, sans mot de passe. |
| `serverAdmin` | `boolean` | L'admin du serveur. |

## Le manifeste

### Manifest

`plugin.json`, une fois lu par Hodi. Voir [le manifeste](/fr/guide/manifest/).

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `string` | Lettres minuscules, chiffres et tirets. |
| `name` | `string` | Son nom. |
| `version` | `string` | Sa version. |
| `description` | `string` | Une phrase. |
| `api` | `number` | La version de l'API qu'il attend. |
| `audience` | `'admin' \| 'all'` | L'admin du foyer seulement, ou tous les profils. |
| `provides` | `string[]` | Ce qu'il apporte. |
| `menu` | `{ group; after?; icon? } \| null` | Où sa page se place dans Réglages. |
| `settings` | `SettingSpec[]` | Ses réglages. |
| `permissions` | `Permissions` | Ses pouvoirs. |
| `feeds` | `PluginFeed[]` | Ses flux. |
| `memoryMb` | `number \| null` | Sa mémoire, 16 Mo par défaut, 32 au plus. |
| `publicPages` | `PublicPages \| null` | Les adresses qu'il ouvre aux moteurs de recherche, avec `permissions.publicRoutes`. |

### Permissions

Ce qu'un plugin peut demander en plus de sa base, ses réglages et son journal. Hodi vérifie chaque appel. Les six derniers ne sont donnés qu'à un plugin signé.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `network` | `string[]` | Les sites qu'il peut joindre, par nom d'hôte exact. |
| `articles` | `boolean` | `ctx.articles`. |
| `publicRoutes` | `boolean` | Ses routes publiques. |
| `notify` | `boolean` | `ctx.notify`. |
| `mail` | `boolean` | `ctx.mail`. |
| `accounts` | `boolean` | `ctx.accounts`. |
| `households` | `boolean` | `ctx.households`. |
| `signIn` | `boolean` | `signIn` et `checkSignIn`. |
| `ai` | `boolean` | `ctx.ai`. |

### SettingSpec

Un réglage du manifeste : Hodi dessine sa ligne dans Serveur › Plugins.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `key` | `string` | Sa clé, et celle de son libellé. |
| `type` | `'boolean' \| 'number' \| 'text' \| 'choice'` | Son genre. |
| `default` | `boolean \| number \| string` | Sa valeur par défaut. |
| `min?, max?` | `number` | Pour `number`. |
| `maxLength?` | `number` | Pour `text`. |
| `options?` | `string[]` | Pour `choice`. |

### PluginFeed

Un flux de `plugin.json › feeds`. Voir [ses flux](/fr/guide/slots/feeds/).

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `key` | `string` | Sa clé dans `feeds` de la partie serveur. |
| `name` | `string` | Son nom. |
| `site` | `string` | Son site. |
| `lang` | `'fr' \| 'en'` | Sa langue. |
| `topic` | `string` | Son thème. |

## Partie web

### WebPlugin

Ce que `definePlugin()` reçoit : un champ par emplacement, tous facultatifs. Chacun est expliqué dans [les emplacements](/fr/guide/slots/), avec un exemple.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `settingsPage?` | `ComponentType` | [Ses options](/fr/guide/slots/options/), dans Serveur › Plugins. |
| `page?` | `ComponentType<{ layout }>` | Sa page dans [Réglages](/fr/guide/slots/settings/). |
| `menuIcon?` | `ComponentType<{ size? }>` | L'icône de son entrée, 18 px. |
| `menuHint?` | `ComponentType` | La ligne sous le nom de son entrée. |
| `serverSections?` | `ServerSection[]` | Ses sections de [Serveur](/fr/guide/slots/server/). |
| `overviewCards?` | `OverviewCardSlot[]` | Ses cartes de [Vue d’ensemble](/fr/guide/slots/overview/). |
| `readerAction?` | `ComponentType<{ article: ReaderArticle }>` | Au bout d'un article, dans [le lecteur](/fr/guide/slots/reader/). |
| `signInExtras?` | `ComponentType<{ layout; signedIn }>` | Sous le formulaire de [Connexion](/fr/guide/slots/sign-in/). |
| `signedOutPage?` | `ComponentType<SignedOutPageProps>` | À la place de Connexion, sans foyer. |
| `afterSignIn?` | `ComponentType<AfterSignInProps>` | Une étape après la connexion, avant l'app. |
| `whoIsReadingFooter?` | `ComponentType<{ layout }>` | À côté de « Gérer les profils », sous « Qui lit ? ». |
| `ageConsent?` | `AgeConsent` | Après « J'ai au moins 13 ans ». |
| `setupSteps?` | `SetupStep[]` | Ses étapes dans [l’installation](/fr/guide/slots/setup/). |
| `accountRows?` | `ComponentType<{ layout }>` | Des lignes au bout de « Ton compte ». |
| `avatarMenu?` | `AvatarMenuItem[]` | Des entrées du menu de l'avatar. |

### ServerSection

Une section de `serverSections`.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `string` | Son adresse, `#/server/plugin/<id>/<section>`. |
| `label` | `string` | Son nom, une clé de ses locales. |
| `page` | `ComponentType<{ layout }>` | Sa page, une `SectionPage`. |
| `icon?` | `ComponentType<{ size? }>` | Son icône Lucide. |
| `hint?` | `ComponentType` | La ligne sous son nom sur téléphone. |

### OverviewCardSlot

Une carte de `overviewCards`.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `string` | Lettres minuscules, chiffres et tirets. |
| `size` | `'narrow' \| 'wide' \| 'full'` | Un tiers, deux tiers ou toute la largeur d'un ordinateur. |
| `component` | `ComponentType<{ from; to }>` | Une `OverviewCard`, pour la période montrée. |

### SetupStep

Une étape de `setupSteps`, ou une étape de Hodi que le plugin place (`{ id, core: 'mail' }`).

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `string` | Où l'installation revient après un rechargement. |
| `title` | `string` | Une clé de ses locales. |
| `intro` | `string` | Une clé de ses locales. |
| `page` | `ComponentType<SetupStepProps>` | Le contenu de l'étape. |

### SignedOutPageProps

Ce que reçoit `signedOutPage`.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | La taille de l'écran. |
| `showSignIn` | `() => void` | Ouvre la Connexion de Hodi. |
| `signedIn` | `() => void` | Après un `signIn` : l'app redémarre. |

### AfterSignInProps

Ce que reçoit `afterSignIn`.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | La taille de l'écran. |
| `done` | `() => void` | Laisse entrer la personne. |

### AvatarMenuItem

Une entrée de `avatarMenu`.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `string` | Son id. |
| `label` | `string` | Une clé de ses locales. |
| `onClick` | `() => void` | Ce qu'elle fait. |
| `icon?` | `ComponentType<{ size? }>` | Son icône, 16 px. |

### ReaderArticle

L'article ouvert, pour `readerAction`.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `string` | Son id. |
| `title` | `string` | Son titre. |
| `url` | `string` | Son adresse sur son site. |
| `sourceId` | `string` | L'id de sa source. |
| `sourceName` | `string` | Le nom de sa source. |

### AgeConsent

Une clé de ses locales, ou `{ text, links }` : ses balises `<nom>` deviennent des liens vers `links[nom]`, ouverts dans un nouvel onglet.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `text` | `string` | Une clé de ses locales. |
| `links` | `Record<string, string>` | Les adresses, sur ce serveur ou en https. |

### Confirmation

Ce que reçoit [askToConfirm()](/fr/functions/#asktoconfirm). Avec `proof`, `onConfirm` reçoit une `Proof` : `password` et `code`.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `title` | `string` | La question. |
| `message` | `ReactNode` | Ce qui se passe. |
| `label` | `string` | Le bouton. |
| `onConfirm` | `(proof: Proof) => void \| Promise<void>` | Après le clic. |
| `look?` | `'danger' \| 'primary'` | Rouge par défaut. |
| `proof?` | `{}` | Demande le mot de passe. |
| `onCancel?` | `() => void` | Fermée sans le bouton. |

### PluginLinks

Ce que donne [usePluginLinks()](/fr/hooks/).

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `frontPage` | `string` | La une. |
| `article` | `(id) => string` | Un article. |
| `settings` | `string` | Réglages. |
| `plugins` | `string` | Sa page dans Serveur › Plugins. |
| `page` | `(path?) => string` | Sa page, ou un de ses écrans. |
| `serverPage` | `(section, path?) => string` | Une de ses sections de Serveur. |
