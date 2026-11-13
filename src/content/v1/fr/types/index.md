---
title: "Types"
description: "Le SDK donne les types de chaque partie."
intro: "Le SDK donne les types de chaque partie. Chaque option et chaque limite y est commentée : ton éditeur les montre pendant que tu écris."
order: 2
icon: "type"
---

## Où les trouver

- `@hodi-app/plugin-sdk/server` : la partie serveur.
- `hodi:sdk` : la partie web, si `tsconfig.json` liste `@hodi-app/plugin-sdk/hodi-sdk` dans ses types.
- `@hodi-app/plugin-sdk/testing` : le kit de test.

## ServerPlugin

Ce que `server/index.ts` exporte par défaut.

```tsx title="ServerPlugin"
interface ServerPlugin {
  migrations?: readonly string[]
  routes?: PluginRoutes
  serverRoutes?: PluginRoutes
  publicRoutes?: PublicRoutes
  tasks?: Record<string, PluginTask>
  feeds?: Record<string, (ctx) => Promise<PluginFeedArticle[]>>
  aiActions?: Record<string, PluginAiAction>
  onArticle?: (article, ctx) => Promise<void>
  checkSignIn?: (who, ctx) => Promise<string | null>
  onProfileDeleted?: (deleted, ctx) => Promise<void>
  onAccountDeleted?: (deleted, ctx) => Promise<void>
  onHouseholdRemoved?: (removed, ctx) => Promise<void>
  exportData?: (who, ctx) => Promise<unknown>
}
```

## PluginRequest

Ce qu'une route reçoit.

```tsx title="PluginRequest"
interface PluginRequest {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path: string
  params: Record<string, string>
  query: Record<string, string>
  body: unknown
  who: PluginCaller
}
```

## PluginCaller

Qui demande, tel que Hodi l'a vérifié.

```tsx title="PluginCaller"
interface PluginCaller {
  profileId: number | null
  householdId: number | null
  kind: 'adult' | 'teen' | 'child'
  householdAdmin: boolean
  serverAdmin: boolean
  accountId: number | null
}
```

## PluginResponse

Ce qu'une route répond : du JSON, ou un zip que Hodi construit et envoie en téléchargement. Hodi ne laisse passer que les statuts 2xx et 4xx.

```tsx title="PluginResponse"
type PluginResponse =
  | {
      status?: number
      body?: unknown
      headers?: { 'Cache-Control'?: string }
    }
  | {
      zip: { filename: string; entries: PluginZipEntry[] }
    }
```

## WebPlugin

Ce que `definePlugin()` reçoit : un champ par emplacement, tous facultatifs.

```tsx title="WebPlugin"
interface WebPlugin {
  settingsPage?: ComponentType
  page?: ComponentType<{ layout: 'desktop' | 'phone' }>
  serverSections?: ServerSection[]
  overviewCards?: OverviewCardSlot[]
  readerAction?: ComponentType<{ article: ReaderArticle }>
  signInExtras?: ComponentType
  signedOutPage?: ComponentType<SignedOutPageProps>
  afterSignIn?: ComponentType<AfterSignInProps>
  setupSteps?: SetupStep[]
  accountRows?: ComponentType
  avatarMenu?: AvatarMenuItem[]
}
```
