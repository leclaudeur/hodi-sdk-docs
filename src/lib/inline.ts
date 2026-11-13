import type { Lang } from './i18n.ts'
import { frenchSpaces } from './rehype-docs.ts'

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// A front matter text as HTML: `code` between backticks, French spaces in French.
export const inline = (text: string, lang: Lang) => {
  const spaced = lang === 'fr' ? frenchSpaces(text) : text
  return escape(spaced).replace(/`([^`]+)`/g, '<code>$1</code>')
}

// The same text for a search engine or a link card: no backticks.
export const plain = (text: string) => text.replace(/`/g, '')
