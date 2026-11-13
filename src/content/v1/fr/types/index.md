---
title: "Types"
description: "Tous les types du SDK, partie par partie, avec chacun de leurs champs."
intro: "Le SDK donne un type à chaque objet qu'un plugin écrit ou reçoit. L'éditeur montre ces types pendant l'écriture, avec leurs commentaires. Cette page les rassemble tous, rangés par partie du plugin, et la sidebar mène droit à chacun."
order: 4
icon: "type"
---

## Où les trouver

Les types viennent de trois chemins, un par partie du plugin :

- `@hodi-app/plugin-sdk/server` : les types de la partie serveur et du manifeste.
- `hodi:sdk` : les types de la partie web. Le fichier `tsconfig.json` du plugin fait pointer `hodi:sdk` vers `@hodi-app/plugin-sdk/hodi-sdk`.
- `@hodi-app/plugin-sdk/testing` : les types du kit de test.

```ts title="server/index.ts"
import type { PluginContext, PluginRequest, ServerPlugin } from '@hodi-app/plugin-sdk/server'
```

## Partie serveur

### ServerPlugin

L'objet que `server/index.ts` exporte par défaut. Tous ses champs sont facultatifs : un plugin n'écrit que ceux dont il a besoin. [Le contexte serveur](/fr/guide/server-context/) explique chacun avec un exemple.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `migrations?` | `readonly string[]` | Les instructions SQL qui construisent la base du plugin, dans l'ordre. Une migration publiée ne change plus jamais. |
| `routes?` | `PluginRoutes` | Les routes que la partie web appelle pour les profils du foyer. Hodi les sert sous `/api/plugins/<id>/`, aux seuls profils prévus par `audience`. |
| `serverRoutes?` | `PluginRoutes` | Les routes de l'espace Serveur. Hodi les sert sous `/api/server/plugins/<id>/`, à l'admin du serveur seulement. |
| `publicRoutes?` | `PublicRoutes` | Les routes ouvertes à tout le monde, même sans être connecté. Hodi les sert sous `/api/public/plugins/<id>/`, avec la permission `publicRoutes`, à 30 requêtes par minute et par adresse. |
| `tasks?` | `Record<string, PluginTask>` | Les travaux que Hodi lance tout seul, à intervalle régulier, comme effacer chaque nuit ce qui a expiré. |
| `feeds?` | `Record<string, (ctx) => Promise<PluginFeedArticle[]>>` | Pour chaque flux déclaré dans `plugin.json`, la fonction qui donne ses articles. La clé est celle du flux. |
| `aiActions?` | `Record<string, PluginAiAction>` | Ce que fait chaque `AiButton` du plugin, rangé par le nom de son action. C'est le seul endroit où `ctx.ai` répond. |
| `onArticle?` | `(article: PluginArticle, ctx) => Promise<void>` | Hodi l'appelle pour chaque article qu'il lit pour la première fois. |
| `checkSignIn?` | `(who, ctx) => Promise<string \| null>` | Hodi l'appelle à chaque connexion, avec la permission `signIn`. `null` laisse entrer la personne ; une clé des locales du plugin refuse la connexion avec ce message. |
| `onProfileDeleted?` | `(deleted, ctx) => Promise<void>` | Hodi l'appelle quand un profil est supprimé. Le plugin y efface ce qu'il gardait de ce profil. |
| `onAccountDeleted?` | `(deleted, ctx) => Promise<void>` | Hodi l'appelle quand un compte est supprimé. Le plugin y efface ce qu'il gardait de ce compte. |
| `onHouseholdRemoved?` | `(removed, ctx) => Promise<void>` | Hodi l'appelle quand un foyer est retiré du serveur. Le plugin y efface ce qu'il gardait de ce foyer. |
| `exportData?` | `(who, ctx) => Promise<unknown>` | Ce que le plugin garde d'une personne, en JSON. Hodi l'ajoute à la copie que cette personne télécharge dans _Réglages › Compte et données_. |

### PluginContext

Le `ctx` que Hodi donne à chaque route, tâche et hook. C'est par lui seul que le plugin lit sa base, ses réglages ou un site. Un champ lié à une permission ne marche que si [le manifeste](/fr/guide/manifest/#les-permissions) demande cette permission.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `string` | L'id du plugin, tel que `plugin.json` le donne. |
| `db` | `PluginDatabase` | La base SQLite du plugin, que lui seul voit. |
| `settings` | `() => SettingValues` | Les réglages du plugin, avec la valeur que l'admin du serveur a choisie à cet instant. |
| `log` | `(message: string) => void` | Écrit une ligne dans le journal de Hodi. `hodi-plugin dev` affiche aussi ces lignes. |
| `fetchText` | `(url, options?) => Promise<{ url; text }>` | Lit une page d'un site listé dans `permissions.network`, et renvoie son adresse finale et son texte. |
| `http` | `(url, options?) => Promise<{ url; status; contentType; text }>` | Envoie n'importe quelle requête à un site listé dans `permissions.network`, comme un échange OAuth. Elle envoie 64 Ko et reçoit 512 Ko au plus. |
| `articles` | `{ get; page }` | Avec la permission `articles` : retrouve un article que Hodi a lu, et la page de cet article. |
| `serverSettings` | `() => Promise<ServerSettings>` | Les durées choisies dans _Serveur › Contenu_ et _Sauvegardes_ : combien de jours Hodi garde un article, une vidéo et une copie de sauvegarde. |
| `mail` | `{ available; appUrl; send }` | Avec la permission `mail` : envoie un e-mail par le serveur réglé dans _Serveur › E-mail_, 50 par heure au plus. `available` dit si ce serveur est réglé. |
| `households` | `{ list; get; of; create; suspend; resume; remove }` | Avec la permission `households` : liste, crée, suspend et retire les foyers du serveur. |
| `accounts` | `{ get; findByEmail; create; checkPassword; findByLogin; addLogin }` | Avec la permission `accounts` : retrouve, crée et vérifie des comptes. Le plugin n'obtient jamais de quoi se connecter à un compte. |
| `notify?` | `(notice) => Promise<void>` | Avec la permission `notify` : envoie une notification à un profil, dix par jour et par profil au plus. |
| `ai?` | `{ ask }` | Avec la permission `ai`, pour un plugin signé : pose une question à l'IA du foyer, une seule fois par clic sur un `AiButton`. |

### PluginDatabase

Le type de `ctx.db`, la base SQLite du plugin. Chaque fonction prend une requête SQL et ses paramètres, écrits `?` dans la requête. Une colonne BLOB se lit et s'écrit en `Uint8Array`.

<!-- prettier-ignore -->
| Méthodes | Type | |
| --- | --- | --- |
| `query` | `(sql, params?) => Record<string, SqlValue>[]` | Pour un `SELECT` qui renvoie plusieurs lignes. Elle renvoie toutes les lignes, un objet par ligne. |
| `get` | `(sql, params?) => Record<string, SqlValue> \| null` | Pour un `SELECT` qui renvoie une seule ligne. Elle renvoie la première ligne, ou `null` s'il n'y en a pas. |
| `run` | `(sql, params?) => { changes; lastInsertRowid }` | Pour un `INSERT`, un `UPDATE` ou un `DELETE`. Elle renvoie le nombre de lignes changées et l'id de la dernière ligne ajoutée. |

### PluginRequest

Ce qu'une route reçoit en premier argument : la requête de la partie web, déjà lue et vérifiée par Hodi.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `method` | `'GET' \| 'POST' \| 'PUT' \| 'PATCH' \| 'DELETE'` | La méthode HTTP de la requête. |
| `path` | `string` | Le chemin sous celui du plugin, comme `/notes/12`. |
| `params` | `Record<string, string>` | Les parties variables du chemin. Pour la route `/notes/:id` appelée sur `/notes/12`, `params.id` vaut `'12'`. |
| `query` | `Record<string, string>` | Les paramètres écrits après le `?` de l'adresse. |
| `body` | `unknown` | Le JSON envoyé par la partie web, ou `null`. Pour une route `raw`, les octets reçus. |
| `who` | `PluginCaller` | La personne qui appelle la route, telle que Hodi l'a vérifiée. |

### PluginCaller

La personne qui appelle une route, telle que Hodi l'a vérifiée. La route peut s'y fier sans rien contrôler elle-même. Aucun cookie, aucun en-tête et aucune session n'arrive jusqu'au plugin : il ne peut pas réutiliser la session de quelqu'un.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `profileId` | `number \| null` | Le profil ouvert sur l'appareil. Il vaut `null` dans l'espace Serveur, quand l'admin du serveur n'a pas de profil dans le foyer. |
| `householdId` | `number \| null` | Le foyer pour lequel la personne demande. Chaque requête qui lit les données d'un foyer filtre sur cet id. |
| `kind` | `'adult' \| 'teen' \| 'child'` | Le profil ouvert est celui d'un adulte, d'un ado ou d'un enfant. |
| `householdAdmin` | `boolean` | `true` quand la personne est l'admin de son foyer. |
| `serverAdmin` | `boolean` | `true` quand la personne est l'admin du serveur. |
| `accountId` | `number \| null` | Le compte connecté sur l'appareil. Il peut être différent du compte du profil ouvert, par exemple quand un parent ouvre le profil de son enfant. |

### PluginResponse

Ce qu'une route renvoie : du JSON, ou un zip que Hodi construit et envoie en téléchargement. Hodi ne laisse passer que les codes 2xx et 4xx : si la route plante ou répond un autre code, la partie web reçoit 500.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `status?` | `number` | Le code HTTP de la réponse. Il vaut 200 par défaut. |
| `body?` | `unknown` | N'importe quelle valeur JSON, que la partie web lit avec `answer.json()`. |
| `headers?` | `{ 'Cache-Control'?: string }` | Le seul en-tête qu'une route peut choisir : combien de temps le navigateur garde la réponse. |
| `moveDevice?` | `number` | Avec la permission `households` : l'id d'un foyer. À partir de cette réponse, l'appareil lit dans ce foyer. |
| `zip?` | `{ filename; entries: PluginZipEntry[] }` | Un zip à télécharger, à la place de `body`. Chaque entrée est un texte, ou la première colonne d'une ligne de la base (`{ path, blob: { sql, params } }`). |

### PluginRoutes

Un objet de routes. Chaque clé a la forme `'MÉTHODE /chemin'`, et une partie du chemin qui commence par `:` est variable, comme `:id`. La valeur est soit la fonction de la route, soit un objet avec ces options :

<!-- prettier-ignore -->
| Options | Type | |
| --- | --- | --- |
| `handler` | `(request, ctx) => Promise<PluginResponse>` | La fonction de la route. |
| `proof?` | `boolean` | Marque une route sensible. Hodi ne la lance qu'après que la personne a retapé son mot de passe dans `askToConfirm()`. Sans ce mot de passe, la route répond 403 sans avoir tourné. |
| `raw?` | `true` | La route reçoit des octets au lieu du JSON, comme une image ou un fichier. |
| `maxBody?` | `number` | La taille maximale de ces octets, en octets, jusqu'à 10 Mo. |

### PublicRoutes

Les routes ouvertes à tout le monde, avant toute connexion. Elles ont la même forme que `PluginRoutes`, avec trois différences : elles ne reçoivent que du JSON, de 64 Ko au plus ; `request.who` y vaut `null` ; et leur réponse peut connecter l'appareil avec ce champ en plus :

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `signIn?` | `number` | Avec la permission `signIn` : l'id d'un compte. Hodi connecte l'appareil à ce compte, à condition que cet appel vienne de créer le compte ou de vérifier son mot de passe. |

### PluginTask

Un travail de `tasks`, que Hodi lance tout seul à intervalle régulier. Une tâche ne tourne pour aucun foyer ni aucune personne : `ctx` y refuse donc ce qui en demande un, comme l'IA ou une notification.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `every` | `number` | Le nombre de minutes entre deux lancements, de 15 à une semaine (10 080). |
| `run` | `(ctx) => Promise<void>` | Le travail lui-même. |

### PluginFeedArticle

Un article qu'un flux de `feeds` renvoie. Dans Hodi, cet article s'ouvre avec son résumé et un lien vers son site, jamais dans le lecteur.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `title` | `string` | Le titre de l'article. |
| `link` | `string` | L'adresse de l'article, en https, sur le site du flux. |
| `summary?` | `string` | Le résumé de l'article, en texte simple. |
| `publishedAt?` | `string \| number` | La date de publication : une date ISO, ou un nombre de millisecondes depuis 1970. |
| `image?` | `string` | L'adresse d'une image, en https. |

### PluginAiAction

Une action de `aiActions`. Hodi la lance quand quelqu'un clique sur l'`AiButton` qui porte son nom, et renvoie sa réponse à la fonction `onAnswer` de ce bouton. L'action reçoit ces champs :

<!-- prettier-ignore -->
| Reçoit | Type | |
| --- | --- | --- |
| `request.input` | `unknown` | La valeur que le bouton a envoyée avec le clic, 16 Ko de JSON au plus. |
| `request.who` | `{ householdId; profileId }` | L'adulte qui a cliqué, et son foyer. |

### PluginArticle

Un article lu par Hodi, tel que `ctx.articles.get()` le renvoie ou que `onArticle` le reçoit.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `string` | L'id de l'article dans Hodi. |
| `title` | `string` | Le titre de l'article. |
| `url` | `string` | L'adresse de l'article sur son site. |
| `sourceId` | `string` | L'id de la source qui a publié l'article. |
| `sourceName` | `string` | Le nom de cette source, comme « RTL info ». |
| `publishedAt` | `string \| null` | La date de publication, ou `null` quand le site ne la donne pas. |
| `status` | `'ok' \| 'unreadable' \| 'failed'` | `ok` : le lecteur a le texte de l'article. `unreadable` : la page n'a pas de texte à lire. `failed` : le site n'a pas répondu. |
| `text` | `{ title; byline; contentHtml; textLength } \| null` | Le texte que le lecteur montre, quand `status` vaut `ok`. Sinon, `null`. |

### PluginHousehold

Ce qu'un plugin peut savoir d'un foyer, avec la permission `households`. Il ne voit jamais ce que le foyer contient : ni ses profils, ni ses sources, ni ses lectures.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `number` | L'id du foyer. |
| `name` | `string` | Le nom du foyer. |
| `language` | `'fr' \| 'en'` | La langue du foyer. |
| `createdAt` | `number` | La date de création du foyer, en millisecondes depuis 1970. |
| `suspended` | `boolean` | `true` quand le plugin qui a créé le foyer l'a suspendu. |
| `mine` | `boolean` | `true` quand ce plugin a créé le foyer. Un plugin ne peut suspendre ou retirer que ses propres foyers. |
| `photo` | `string \| null` | L'adresse de la photo du foyer, à passer à `HouseholdAvatar`. |

### PluginAccount

Ce qu'un plugin peut savoir d'un compte, avec la permission `accounts`.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `number` | L'id du compte. |
| `email` | `string` | L'adresse e-mail du compte. |
| `loginOnly` | `boolean` | `true` quand le compte n'a pas de mot de passe : il a été créé avec un login du plugin, comme `google:<id>`, et la personne entre par le plugin. |
| `serverAdmin` | `boolean` | `true` quand ce compte est celui de l'admin du serveur. |

## Le manifeste

### Manifest

`plugin.json`, tel que Hodi le lit. [Le manifeste](/fr/guide/manifest/) explique chaque champ avec un exemple.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `string` | L'id du plugin : des lettres minuscules, des chiffres et des tirets. Il ne change plus une fois le plugin publié. |
| `name` | `string` | Le nom du plugin, 60 caractères au plus. |
| `version` | `string` | La version du plugin, comme `1.2.0`. |
| `description` | `string` | Une phrase qui dit ce que fait le plugin, 280 caractères au plus. |
| `api` | `number` | La version de l'API des plugins pour laquelle le plugin est écrit. |
| `audience` | `'admin' \| 'all'` | Qui voit le plugin dans un foyer : l'admin du foyer seulement, ou tous les profils. |
| `provides` | `string[]` | Ce que le plugin apporte à Hodi : un genre de profil (`profile-kind:child`), une interface (`shell:child`) ou la voix (`speech`). |
| `menu` | `{ group; after?; icon? } \| null` | Où se place l'entrée du plugin dans Réglages : son groupe, l'entrée après laquelle elle vient, et son icône. |
| `settings` | `SettingSpec[]` | Les réglages du plugin, que l'admin du serveur change dans _Serveur › Plugins_. |
| `permissions` | `Permissions` | Ce que le plugin demande à pouvoir faire en plus de l'essentiel. |
| `feeds` | `PluginFeed[]` | Les flux d'articles que le plugin ajoute à Hodi. |
| `memoryMb` | `number \| null` | La mémoire de la partie serveur, en Mo : 16 par défaut, 32 au plus. |
| `publicPages` | `PublicPages \| null` | Avec la permission `publicRoutes` : les adresses que le plugin ouvre aux moteurs de recherche. |

### Permissions

Ce qu'un plugin peut demander en plus de l'essentiel : sans permission, il ne peut que garder ses données dans sa base, lire ses réglages et écrire dans le journal. Hodi vérifie chaque appel. Les six dernières permissions ne sont accordées qu'à un plugin signé.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `network` | `string[]` | Les sites que le plugin peut joindre avec `ctx.fetchText()` et `ctx.http()`, écrits par leur nom d'hôte exact. |
| `articles` | `boolean` | Ouvre `ctx.articles` : retrouver un article lu par Hodi. |
| `publicRoutes` | `boolean` | Ouvre les routes publiques et les écrans d'avant la connexion. |
| `notify` | `boolean` | Ouvre `ctx.notify` : envoyer une notification. |
| `mail` | `boolean` | Ouvre `ctx.mail` : envoyer un e-mail. |
| `accounts` | `boolean` | Ouvre `ctx.accounts` : retrouver, créer et vérifier des comptes. |
| `households` | `boolean` | Ouvre `ctx.households` : gérer les foyers du serveur. |
| `signIn` | `boolean` | Ouvre la réponse `signIn` d'une route publique et le hook `checkSignIn`. |
| `ai` | `boolean` | Ouvre `ctx.ai` : poser une question à l'IA du foyer, sur un clic. |

### SettingSpec

Un réglage déclaré dans `settings`. Hodi dessine sa ligne dans _Serveur › Plugins_, et le plugin lit sa valeur avec `ctx.settings()`.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `key` | `string` | La clé du réglage. Elle sert aussi de clé à son libellé dans les locales du plugin. |
| `type` | `'boolean' \| 'number' \| 'text' \| 'choice'` | Le genre de valeur : un interrupteur, un nombre, un texte ou un choix dans une liste. |
| `default` | `boolean \| number \| string` | La valeur du réglage tant que l'admin du serveur ne l'a pas changée. |
| `min?, max?` | `number` | Pour un `number` : la plus petite et la plus grande valeur acceptées. |
| `maxLength?` | `number` | Pour un `text` : le nombre de caractères au plus. |
| `options?` | `string[]` | Pour un `choice` : les valeurs possibles. |

### PluginFeed

Un flux déclaré dans le champ `feeds` de `plugin.json`. [`feeds`](/fr/guide/slots/feeds/) explique comment le remplir.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `key` | `string` | La clé du flux. La partie serveur donne ses articles sous la même clé, dans `feeds`. |
| `name` | `string` | Le nom du flux, que Hodi montre comme nom de source. |
| `site` | `string` | L'adresse du site dont viennent les articles. |
| `lang` | `'fr' \| 'en'` | La langue des articles. |
| `topic` | `string` | Le thème de l'actu où les articles s'affichent, comme `tech`. |

## Partie web

### WebPlugin

L'objet que `definePlugin()` reçoit : un champ par emplacement, tous facultatifs. [Les emplacements](/fr/guide/slots/) expliquent chacun avec un exemple.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `settingsPage?` | `ComponentType` | Les [options](/fr/guide/slots/options/) du plugin, dans _Serveur › Plugins_, sous les réglages que Hodi dessine. |
| `page?` | `ComponentType<{ layout }>` | La [page du plugin dans Réglages](/fr/guide/slots/settings/). |
| `menuIcon?` | `ComponentType<{ size? }>` | L'icône de l'entrée du plugin dans Réglages, à 18 px. |
| `menuHint?` | `ComponentType` | La ligne grise sous le nom de cette entrée. |
| `serverSections?` | `ServerSection[]` | Les [sections du plugin dans l'espace Serveur](/fr/guide/slots/server/). |
| `overviewCards?` | `OverviewCardSlot[]` | Les [cartes du plugin dans Vue d'ensemble](/fr/guide/slots/overview/). |
| `readerAction?` | `ComponentType<{ article: ReaderArticle }>` | Un composant au bout de chaque article, dans [le lecteur](/fr/guide/slots/reader/). |
| `signInExtras?` | `ComponentType<{ layout; signedIn }>` | Un composant sous le formulaire de [Connexion](/fr/guide/slots/sign-in/). |
| `signedOutPage?` | `ComponentType<SignedOutPageProps>` | Une [page à la place de Connexion](/fr/guide/slots/signed-out-page/), quand l'appareil n'a pas de foyer. |
| `afterSignIn?` | `ComponentType<AfterSignInProps>` | Une [étape juste après la connexion](/fr/guide/slots/after-sign-in/), avant d'entrer dans l'app. |
| `whoIsReadingFooter?` | `ComponentType<{ layout }>` | Un composant [sous « Qui lit ? »](/fr/guide/slots/who-is-reading-footer/), à côté de « Gérer les profils ». |
| `ageConsent?` | `AgeConsent` | Un [texte après « J'ai au moins 13 ans »](/fr/guide/slots/age-consent/). |
| `setupSteps?` | `SetupStep[]` | Les [étapes du plugin dans l'installation](/fr/guide/slots/setup/) de Hodi. |
| `accountRows?` | `ComponentType<{ layout }>` | Des [lignes au bout de « Ton compte »](/fr/guide/slots/account-rows/). |
| `avatarMenu?` | `AvatarMenuItem[]` | Des [entrées dans le menu de l'avatar](/fr/guide/slots/avatar-menu/). |

### ServerSection

Une section de `serverSections` : une entrée dans la colonne de l'espace Serveur, et la page qu'elle ouvre.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `string` | L'id de la section. Son adresse est `#/server/plugin/<id du plugin>/<id>`. |
| `label` | `string` | Le nom de la section : une clé des locales du plugin. |
| `page` | `ComponentType<{ layout }>` | La page de la section, construite avec `SectionPage`. |
| `icon?` | `ComponentType<{ size? }>` | L'icône de l'entrée, une icône Lucide. |
| `hint?` | `ComponentType` | La ligne grise sous le nom de l'entrée, sur un téléphone. |

### OverviewCardSlot

Une carte de `overviewCards`, dans _Serveur › Vue d'ensemble_.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `string` | L'id de la carte : des lettres minuscules, des chiffres et des tirets. |
| `size` | `'narrow' \| 'wide' \| 'full'` | La largeur de la carte sur un ordinateur : un tiers, deux tiers ou toute la largeur. |
| `component` | `ComponentType<{ from; to }>` | Le contenu de la carte, construit avec `OverviewCard`. Il reçoit le début et la fin de la période choisie. |

### SetupStep

Une étape de `setupSteps`. Pour placer une étape de Hodi parmi celles du plugin, une entrée peut aussi être `{ id, core: 'mail' }`.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `string` | L'id de l'étape. Après un rechargement, l'installation reprend à l'étape qui porte cet id. |
| `title` | `string` | Le titre de l'étape : une clé des locales du plugin. |
| `intro` | `string` | La phrase sous le titre : une clé des locales du plugin. |
| `page` | `ComponentType<SetupStepProps>` | Le contenu de l'étape. |

### SignedOutPageProps

Les props que reçoit le composant de `signedOutPage`.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | La taille de l'écran. |
| `showSignIn` | `() => void` | Ouvre l'écran de Connexion de Hodi. |
| `signedIn` | `() => void` | Redémarre l'app, connectée, après une route publique qui a répondu `signIn`. |

### AfterSignInProps

Les props que reçoit le composant de `afterSignIn`.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `layout` | `'desktop' \| 'phone'` | La taille de l'écran. |
| `done` | `() => void` | Termine l'étape et fait entrer la personne dans l'app. |

### AvatarMenuItem

Une entrée de `avatarMenu`, dans le menu qui s'ouvre sous l'avatar.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `string` | L'id de l'entrée. |
| `label` | `string` | Le texte de l'entrée : une clé des locales du plugin. |
| `onClick` | `() => void` | Ce que fait un clic sur l'entrée. |
| `icon?` | `ComponentType<{ size? }>` | L'icône de l'entrée, à 16 px. |

### ReaderArticle

L'article ouvert dans le lecteur, que reçoit le composant de `readerAction`. Pour en savoir plus sur cet article, la partie serveur le retrouve par son `id` avec `ctx.articles.get()`.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `id` | `string` | L'id de l'article dans Hodi. |
| `title` | `string` | Le titre de l'article. |
| `url` | `string` | L'adresse de l'article sur son site. |
| `sourceId` | `string` | L'id de la source qui a publié l'article. |
| `sourceName` | `string` | Le nom de cette source, comme « RTL info ». |

### AgeConsent

Le texte de `ageConsent`. C'est soit une clé des locales du plugin, soit un objet `{ text, links }` : dans le texte, chaque balise `<nom>` devient un lien vers `links[nom]`, ouvert dans un nouvel onglet.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `text` | `string` | Le texte : une clé des locales du plugin. |
| `links` | `Record<string, string>` | L'adresse de chaque lien, par le nom de sa balise. Une adresse est sur ce serveur, ou en https. |

### Confirmation

Ce que reçoit [askToConfirm()](/fr/functions/#asktoconfirm). Avec `proof`, la fenêtre demande aussi le mot de passe, et `onConfirm` reçoit une `Proof` qui contient `password` et `code`.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `title` | `string` | La question posée, comme « Effacer l'historique ? ». |
| `message` | `ReactNode` | Ce qui se passera après le clic, en une phrase. |
| `label` | `string` | Le texte du bouton qui confirme. |
| `onConfirm` | `(proof: Proof) => void \| Promise<void>` | Ce que fait le clic sur ce bouton. |
| `look?` | `'danger' \| 'primary'` | La couleur du bouton : rouge par défaut, pour une chose qui efface. |
| `proof?` | `{}` | Demande le mot de passe de la personne avant de confirmer, pour une route avec `proof: true`. |
| `onCancel?` | `() => void` | Ce qui se passe quand la fenêtre se ferme sans le bouton. |

### PluginLinks

Ce que renvoie [usePluginLinks()](/fr/hooks/) : les adresses des écrans de Hodi et du plugin, à mettre dans un lien.

<!-- prettier-ignore -->
| Champs | Type | |
| --- | --- | --- |
| `frontPage` | `string` | L'adresse de la une. |
| `article` | `(id) => string` | L'adresse d'un article dans le lecteur, par son id. |
| `settings` | `string` | L'adresse de Réglages. |
| `plugins` | `string` | L'adresse de la page du plugin dans _Serveur › Plugins_. |
| `page` | `(path?) => string` | L'adresse de la page du plugin dans Réglages, ou d'un de ses écrans avec `path`. |
| `serverPage` | `(section, path?) => string` | L'adresse d'une section du plugin dans l'espace Serveur, ou d'un de ses écrans avec `path`. |
