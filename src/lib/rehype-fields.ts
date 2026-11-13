import type { Element, ElementContent, Root } from 'hast'
import { langOf, t } from './i18n.ts'
import { rowsOf } from './rehype-rows.ts'

// A Markdown table whose columns are a name, « Type » and a text becomes a field list: each name with its type on
// one line, the text under it, as in the app's settings rows. Any other table becomes rows (rehype-rows.ts).

const el = (tagName: string, className: string[], children: ElementContent[]): Element => ({
  type: 'element',
  tagName,
  properties: { className },
  children
})

const elements = (node: Element, tagName: string) =>
  node.children.filter((child): child is Element => child.type === 'element' && child.tagName === tagName)

const textOf = (node: ElementContent): string => {
  if (node.type === 'text') return node.value
  return node.type === 'element' ? node.children.map(textOf).join('') : ''
}

const text = (node: Element | undefined) => (node?.children ?? []).map(textOf).join('')

const cellsOf = (row: Element) => [...elements(row, 'th'), ...elements(row, 'td')]

// The code span's text, or the cell's when Markdown had none.
const codeOf = (cell: Element | undefined, className: string) =>
  el('code', [className], [{ type: 'text', value: text(cell).trim() }])

const fieldOf = (row: Element) => {
  const [name, type, about] = cellsOf(row)
  return el(
    'div',
    ['pr'],
    [
      el(
        'div',
        ['pm'],
        [el('div', ['pn'], [codeOf(name, 'k'), codeOf(type, 'ty')]), el('p', [], about?.children ?? [])]
      )
    ]
  )
}

const fieldsOf = (table: Element, lang: ReturnType<typeof langOf>): Element | undefined => {
  const [head] = elements(table, 'thead').flatMap(part => elements(part, 'tr'))
  const headCells = head ? cellsOf(head) : []
  if (headCells.length !== 3 || text(headCells[1]).trim() !== 'Type') return undefined
  const rows = elements(table, 'tbody').flatMap(part => elements(part, 'tr'))
  const bar = el(
    'div',
    ['ph', 'mono'],
    [
      el('span', [], [{ type: 'text', value: text(headCells[0]).trim() }]),
      el('span', [], [{ type: 'text', value: t(lang, 'optional') }])
    ]
  )
  return el('div', ['props'], [bar, ...rows.map(fieldOf)])
}

export const rehypeFields = () => (tree: Root, file: { path?: string }) => {
  const lang = langOf(file.path ?? '')
  tree.children = tree.children.map(node =>
    node.type === 'element' && node.tagName === 'table' ? (fieldsOf(node, lang) ?? rowsOf(node)) : node
  )
}
