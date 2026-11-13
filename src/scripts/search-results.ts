// Pagefind's results turned into the spotlight's rows: grouped as the sidebar groups them, a page then its titles.

interface SubResult {
  title: string
  url: string
  excerpt: string
}

interface ResultData {
  url: string
  excerpt: string
  meta: { title?: string; group?: string; icon?: string }
  sub_results: SubResult[]
}

interface Pagefind {
  debouncedSearch: (
    query: string,
    options: object,
    wait: number
  ) => Promise<{ results: { data: () => Promise<ResultData> }[] } | null>
}

export interface Row {
  group: string
  title: string
  line: string
  url: string
  icon: string
}

const PAGES = 8
const TITLES_PER_PAGE = 2

let loading: Promise<Pagefind | undefined> | undefined

// The index is built after Astro, so it is loaded by its address and only when the spotlight first opens.
export const loadPagefind = () => {
  const path = '/pagefind/pagefind.js'
  loading ??= import(/* @vite-ignore */ path).then(
    module => module as Pagefind,
    () => undefined
  )
  return loading
}

const rowsOf = (data: ResultData): Row[] => {
  const group = data.meta.group ?? ''
  const title = data.meta.title ?? ''
  const page = { group, title, line: data.excerpt, url: data.url, icon: data.meta.icon ?? 'file-text' }
  const titles = data.sub_results
    .filter(sub => sub.url.includes('#') && sub.title !== title)
    .slice(0, TITLES_PER_PAGE)
    .map(sub => ({ group, title: sub.title, line: sub.excerpt, url: sub.url, icon: 'hash' }))
  return [page, ...titles]
}

// Undefined when a newer query took over, so a slow answer never replaces a fresh one.
export const searchRows = async (query: string): Promise<Row[] | undefined> => {
  const pagefind = await loadPagefind()
  if (!pagefind) return []
  const search = await pagefind.debouncedSearch(query, {}, 120)
  if (!search) return undefined
  const pages = await Promise.all(search.results.slice(0, PAGES).map(result => result.data()))
  return pages.flatMap(rowsOf)
}

const fold = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()

const escape = (text: string) =>
  text.replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char] ?? char)

// The part of a title that matches the query, in rust like Pagefind's own marks in the excerpts.
export const markTitle = (title: string, query: string) => {
  const at = fold(title).indexOf(fold(query))
  if (at < 0 || !query) return escape(title)
  const end = at + query.length
  return `${escape(title.slice(0, at))}<mark>${escape(title.slice(at, end))}</mark>${escape(title.slice(end))}`
}

export const groupRows = (rows: Row[]) => {
  const groups = new Map<string, Row[]>()
  for (const row of rows) groups.set(row.group, [...(groups.get(row.group) ?? []), row])
  return groups
}
