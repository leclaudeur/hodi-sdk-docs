import type { Doc } from './docs.ts'
import { plain } from './inline.ts'

// The card of the page a redirect sends to, for a link shared at the redirect's address.
export const cardOf = (doc: Doc | undefined) =>
  doc && {
    lang: doc.lang,
    title: `${doc.entry.data.title} · Hodi SDK`,
    description: plain(doc.entry.data.description),
    url: doc.url
  }

// The root's own card: a link to the site is a link to the whole documentation, not to its first page.
export const siteCard = {
  lang: 'fr' as const,
  title: 'Hodi SDK',
  description:
    'La documentation pour créer des plugins Hodi : le guide, les composants, les hooks et les fonctions du SDK.',
  url: '/'
}
