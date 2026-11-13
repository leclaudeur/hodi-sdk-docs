import type { Element, ElementContent, Root } from 'hast'

// On the Tokens page, each row named after a token gets a sample drawn with that very token: a colour swatch, or
// « Aa » in a font. The page's CSS defines the tokens, so the sample follows the theme chosen at the top of the site.

const textOf = (node: ElementContent): string => {
  if (node.type === 'text') return node.value
  return node.type === 'element' ? node.children.map(textOf).join('') : ''
}

const hasClass = (node: Element, name: string) => {
  const className = node.properties.className
  return Array.isArray(className) && className.includes(name)
}

const sampleOf = (token: string): Element | undefined => {
  if (/^--(radius|duration|ease)/.test(token)) return undefined
  const font = token.startsWith('--font-')
  // The topic tokens only exist under data-topic: the sample shows the « tech » topic, as the page says.
  const topic = token.startsWith('--topic') ? { dataTopic: 'tech' } : {}
  return {
    type: 'element',
    tagName: 'span',
    properties: {
      className: ['tok', font ? 'tok-font' : 'tok-swatch'],
      style: font ? `font-family: var(${token})` : `background: var(${token})`,
      ariaHidden: 'true',
      ...topic
    },
    children: font ? [{ type: 'text', value: 'Aa' }] : []
  }
}

const walk = (node: Root | Element, visit: (element: Element) => void) => {
  for (const child of node.children) {
    if (child.type !== 'element') continue
    visit(child)
    walk(child, visit)
  }
}

export const rehypeTokens = () => (tree: Root, file: { path?: string }) => {
  if (!/\/tokens\//.test(file.path ?? '')) return
  walk(tree, node => {
    if (!hasClass(node, 'pn')) return
    const name = node.children.find((child): child is Element => child.type === 'element' && hasClass(child, 'k'))
    const token = name ? textOf(name).trim() : ''
    const sample = token.startsWith('--') ? sampleOf(token) : undefined
    if (sample) node.children.unshift(sample)
  })
}
