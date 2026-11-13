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

const metaOf = (meta: string | undefined, name: string) => new RegExp(`${name}="([^"]+)"`).exec(meta ?? '')?.[1]

const copyButton = () =>
  el('button', { type: 'button', className: ['btn', 'compact', 'icon', 'copy'], 'data-copy': '' }, [
    icon('copy'),
    el('span', { className: ['lb'] }, [{ type: 'text', value: 'Copier' }])
  ])

// render="button" draws that component above its code (rehype-renders fills it); kind="page" sizes the frame and
// play="button" lets its props drive it.
const componentWindow = (pre: Element, meta: string | undefined) =>
  el('div', { className: ['term', 'cmp'], dataPlay: metaOf(meta, 'play') }, [
    el('div', {
      className: ['cmp-render', metaOf(meta, 'kind') ?? 'plain'],
      dataRender: metaOf(meta, 'render'),
      dataPagefindIgnore: ''
    }),
    el('div', { className: ['cmp-code'] }, [copyButton(), pre])
  ])

// Every code block becomes the site's window: three dots, the file's name, a Copier button, then the code.
export const codeWindow = (): ShikiTransformer => ({
  name: 'hodi-code-window',
  root(root) {
    const pre = root.children.find((node): node is Element => node.type === 'element' && node.tagName === 'pre')
    if (!pre) return
    const meta = this.options.meta?.__raw
    if (metaOf(meta, 'render')) {
      root.children = [componentWindow(pre, meta)]
      return
    }
    const dots = [0, 1, 2].map(() => el('i', { className: ['d'] }))
    // title="web/index.tsx" after the fence's language names the window; without one, the language does.
    const name = el('span', { className: ['mono'] }, [
      { type: 'text', value: metaOf(meta, 'title') ?? this.options.lang }
    ])
    root.children = [
      el('div', { className: ['term'] }, [
        el('div', { className: ['tb'], 'data-pagefind-ignore': '' }, [...dots, name, copyButton()]),
        pre
      ])
    ]
  }
})
