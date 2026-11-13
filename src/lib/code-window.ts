import type { Element, ElementContent } from 'hast'
import type { ShikiTransformer } from 'shiki'
import { iconNode, svgAttributes } from './icons.ts'

const el = (tagName: string, properties: Element['properties'], children: ElementContent[] = []): Element => ({
  type: 'element',
  tagName,
  properties,
  children
})

const icon = (name: string): Element =>
  el(
    'svg',
    svgAttributes(15),
    iconNode(name).map(([tag, attributes]) => el(tag, attributes))
  )

// title="web/index.tsx" after the fence's language names the window; without one, the language does.
const titleOf = (meta: string | undefined, lang: string) => /title="([^"]+)"/.exec(meta ?? '')?.[1] ?? lang

// Every code block becomes the site's window: three dots, the file's name, a Copier button, then the code.
export const codeWindow = (): ShikiTransformer => ({
  name: 'hodi-code-window',
  root(root) {
    const pre = root.children.find((node): node is Element => node.type === 'element' && node.tagName === 'pre')
    if (!pre) return
    const dots = [0, 1, 2].map(() => el('i', { className: ['d'] }))
    const name = el('span', { className: ['mono'] }, [
      { type: 'text', value: titleOf(this.options.meta?.__raw, this.options.lang) }
    ])
    const copy = el('button', { type: 'button', className: ['btn', 'compact', 'icon', 'copy'], 'data-copy': '' }, [
      icon('copy'),
      el('span', { className: ['lb'] }, [{ type: 'text', value: 'Copier' }])
    ])
    root.children = [el('div', { className: ['term'] }, [el('div', { className: ['tb'] }, [...dots, name, copy]), pre])]
  }
})
