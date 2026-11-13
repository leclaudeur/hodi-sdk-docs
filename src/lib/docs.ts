import { getCollection, type CollectionEntry } from 'astro:content'
import { isLang, type Lang } from './i18n.ts'

export type Entry = CollectionEntry<'docs'>

export interface Doc {
  entry: Entry
  version: string
  lang: Lang
  // The page's place in its version and language: guide/slots/options.
  path: string
  url: string
  // The page it sits under in the sidebar, as its path: guide/slots for a slot.
  parent: string | undefined
}

export interface Group {
  key: 'guide' | 'reference'
  docs: { doc: Doc; children: Doc[] }[]
}

const all = await getCollection('docs')

const major = (version: string) => Number(version.slice(1))

// Every major the content has a folder for, newest first.
export const versions = [...new Set(all.map(entry => entry.id.split('/')[0] ?? ''))].sort((a, b) => major(b) - major(a))
export const latest = versions[0] ?? 'v1'

// The latest major lives at the site's root; an older one under its own folder, /v1/fr/….
export const urlOf = (version: string, lang: Lang, path: string) =>
  `${version === latest ? '' : `/${version}`}/${lang}/${path}/`

const toDoc = (entry: Entry): Doc => {
  const [version = latest, lang = 'fr', ...rest] = entry.id.replace(/\/index$/, '').split('/')
  if (!isLang(lang)) throw new Error(`${entry.id}: the folder after the version must be a language`)
  const path = rest.join('/')
  // The page one folder up, when there is one: guide/slots/options under guide/slots, components/buttons under
  // components. The guide's folder itself is no page.
  const up = rest.slice(0, -1).join('/')
  const parent =
    up && all.some(other => other.id.replace(/\/index$/, '') === `${version}/${lang}/${up}`) ? up : undefined
  return { entry, version, lang, path, url: urlOf(version, lang, path), parent }
}

export const docs = all.map(toDoc)

const byOrder = (a: Doc, b: Doc) => a.entry.data.order - b.entry.data.order

// The sidebar: the guide's pages, each with the pages under it, then the reference: Composants, Hooks, Fonctions and
// Types, each a section of its own in the bar too.
export const groupsOf = (version: string, lang: Lang): Group[] => {
  const mine = docs.filter(doc => doc.version === version && doc.lang === lang)
  const top = (section: string) => mine.filter(doc => doc.path.split('/')[0] === section && !doc.parent).sort(byOrder)
  const withChildren = (doc: Doc) => ({ doc, children: mine.filter(child => child.parent === doc.path).sort(byOrder) })
  const guide = mine.filter(doc => doc.path.startsWith('guide/') && !doc.parent).sort(byOrder)
  const reference = [...top('components'), ...top('hooks'), ...top('functions'), ...top('types')]
  return [
    { key: 'guide' as const, docs: guide.map(withChildren) },
    { key: 'reference' as const, docs: reference.map(withChildren) }
  ].filter(group => group.docs.length > 0)
}

// The reading order, for the links at the foot of each page.
export const orderOf = (version: string, lang: Lang) =>
  groupsOf(version, lang).flatMap(group => group.docs.flatMap(({ doc, children }) => [doc, ...children]))

// The same page in another version or language, or that version's first page when it has none.
export const counterpart = (doc: Doc, version: string, lang: Lang) =>
  docs.find(other => other.version === version && other.lang === lang && other.path === doc.path) ??
  orderOf(version, lang)[0]

export const languagesOf = (doc: Doc) => docs.filter(other => other.version === doc.version && other.path === doc.path)

// « Premiers pas »: the tutorial's page, once this version and language have one.
export const firstStepsOf = (version: string, lang: Lang) =>
  docs.find(doc => doc.version === version && doc.lang === lang && doc.path === 'getting-started')
