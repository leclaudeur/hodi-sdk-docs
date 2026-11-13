import type { Lang } from './i18n.ts'
import { frenchSpaces } from './rehype-docs.ts'

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// A front matter text as HTML: `code` between backticks, *italic* between stars, French spaces in French.
export const inline = (text: string, lang: Lang) => {
  const spaced = lang === 'fr' ? frenchSpaces(text) : text
  return escape(spaced)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
}

// The same text for a search engine or a link card: no backticks, no stars.
export const plain = (text: string) => text.replace(/[`*]/g, '')
