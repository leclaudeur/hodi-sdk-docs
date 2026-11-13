import type { Element, ElementContent, Root } from 'hast'
import { iconNode, svgAttributes } from './icons.ts'

// A Markdown quote becomes the app's info notice: the blue square with its icon, a title, the text beside it. A quote
// that opens on bold text takes that text as its title; « > **Un plugin a 32 réglages au plus.** ».

const el = (tagName: string, properties: Element['properties'], children: ElementContent[]): Element => ({
  type: 'element',
  tagName,
  properties,
  children
})

const icon = () =>
  el(
    'svg',
    svgAttributes(20),
    iconNode('info').map(([tag, attributes]) => el(tag, attributes, []))
  )

const isElement = (node: ElementContent | undefined, tagName: string): node is Element =>
  node?.type === 'element' && node.tagName === tagName

// The bold opening as the title, and what follows it in that paragraph as the start of the text.
const split = (paragraphs: Element[]) => {
  const [first, ...rest] = paragraphs
  const lead = first?.children.find(child => child.type !== 'text' || child.value.trim())
  if (!first || !isElement(lead, 'strong')) return { title: [], text: paragraphs }
  const after = first.children.slice(first.children.indexOf(lead) + 1)
  const hasMore = after.some(child => child.type !== 'text' || child.value.trim())
  return { title: lead.children, text: hasMore ? [{ ...first, children: after }, ...rest] : rest }
}

const noticeOf = (quote: Element): Element => {
  const paragraphs = quote.children.filter((child): child is Element => child.type === 'element')
  const { title, text } = split(paragraphs)
  return el('aside', { className: ['notice'] }, [
    el('span', { className: ['notice-mark'] }, [icon()]),
    el('div', { className: ['notice-main'] }, [
      ...(title.length ? [el('p', { className: ['notice-title'] }, title)] : []),
      ...(text.length ? [el('div', { className: ['notice-text'] }, text)] : [])
    ])
  ])
}

export const rehypeNotice = () => (tree: Root) => {
  tree.children = tree.children.map(node =>
    node.type === 'element' && node.tagName === 'blockquote' ? noticeOf(node) : node
  )
}
