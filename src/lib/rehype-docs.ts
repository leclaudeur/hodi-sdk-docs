import type { Element, ElementContent, Root, RootContent } from 'hast'
import { iconNode, svgAttributes } from './icons.ts'
import { langOf, t } from './i18n.ts'

type Parent = Root | Element

const el = (tagName: string, properties: Element['properties'], children: ElementContent[] = []): Element => ({
  type: 'element',
  tagName,
  properties,
  children
})

export const iconElement = (name: string, size: number): Element =>
  el(
    'svg',
    { ...svgAttributes(size), className: ['lucide', `lucide-${name}`] },
    iconNode(name).map(([tag, attributes]) => el(tag, attributes))
  )

const classes = (node: Element) => (Array.isArray(node.properties.className) ? node.properties.className : [])

// French typography: a non-breaking space before : ; ! ? » and after «, so they never start a line.
export const frenchSpaces = (text: string) => text.replace(/ ([:;!?»])/g, ' $1').replace(/« /g, '« ')

const walk = (node: Parent, visit: (child: RootContent, parent: Parent) => void) => {
  for (const child of [...node.children]) {
    visit(child, node)
    if (child.type === 'element' && child.tagName !== 'code' && child.tagName !== 'pre') walk(child, visit)
  }
}

// Each title gets its link: an icon in the margin on hover, the address of that title when clicked.
const addAnchor = (node: Element, label: string) => {
  const id = node.properties.id
  if (typeof id !== 'string') return
  node.children.unshift(el('a', { className: ['anchor'], href: `#${id}`, ariaLabel: label }, [iconElement('link', 16)]))
}

// What Markdown cannot say on its own: the window's Copier in the page's language, lucide icons asked by
// data-icon, titles' links and French spaces.
const textOf = (node: Element): string =>
  node.children
    .map(child => (child.type === 'text' ? child.value : child.type === 'element' ? textOf(child) : ''))
    .join('')

// A title that is a name from the code (a component, a hook, a type, h2 or h3) keeps its case: the display font only has capitals.
const isCodeName = (node: Element, path: string) =>
  (/\/(components|hooks|functions|types)\//.test(path) ||
    (node.children.length === 1 && node.children[0]?.type === 'element' && node.children[0].tagName === 'code')) &&
  /^[A-Za-z_$][\w$.]*(\(\))?$/.test(textOf(node).trim())

export const rehypeDocs = () => (tree: Root, file: { path?: string }) => {
  const lang = langOf(file.path ?? '')
  walk(tree, node => {
    if (node.type === 'text' && lang === 'fr') node.value = frenchSpaces(node.value)
    if (node.type !== 'element') return
    if ((node.tagName === 'h2' || node.tagName === 'h3') && isCodeName(node, file.path ?? ''))
      node.properties.className = [...classes(node), 'code-title']
    if (node.tagName === 'h2' || node.tagName === 'h3') addAnchor(node, t(lang, 'anchor'))
    const icon = node.properties.dataIcon
    if (typeof icon === 'string') node.children = [iconElement(icon, 16)]
    if (classes(node).includes('copy')) node.properties.dataDone = t(lang, 'copied')
    if (classes(node).includes('lb') && node.children[0]?.type === 'text') node.children[0].value = t(lang, 'copy')
  })
}
