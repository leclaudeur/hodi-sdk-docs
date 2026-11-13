import type { Lang } from './i18n.ts'
import { frenchSpaces } from './rehype-docs.ts'

// _Italic_ between underscores, only at word edges so names such as plugin_id keep theirs.
const underscores = /(^|[\s(>])_([^_\n]+?)_(?=$|[\s.,;:!?)<])/g

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// A front matter text as HTML: `code` between backticks, *italic* between stars or underscores, [links](/…), French spaces in French.
export const inline = (text: string, lang: Lang) => {
  const spaced = lang === 'fr' ? frenchSpaces(text) : text
  return escape(spaced)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
    .replace(underscores, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
}

// The same text for a search engine or a link card: no backticks, no italics marks, a link's words only.
export const plain = (text: string) =>
  text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(underscores, '$1$2')
    .replace(/[`*]/g, '')
