import type { Element, ElementContent } from 'hast'

// Any other Markdown table becomes rows or cards, never a grid: a grid's columns crush or overflow on a phone.
// A table whose first heading is in italics compares things (compareOf). Else each row is a card row: its first cell as the title, a cell that is
// only code beside it, and every other cell under it, after its column's name when the table has three columns or more.

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

const label = (cell: Element | undefined) => (cell?.children ?? []).map(textOf).join('').trim()

const cellsOf = (row: Element) =>
  row.children.filter((c): c is Element => c.type === 'element' && /^t[hd]$/.test(c.tagName))

// Only code spans, commas and spaces: a name, a type or a command, which reads best beside the title.
const isCode = (cell: Element) =>
  cell.children.some(child => child.type === 'element' && child.tagName === 'code') &&
  cell.children.every(
    child =>
      (child.type === 'element' && child.tagName === 'code') ||
      (child.type === 'text' && /^[\s,et]*$/.test(child.value))
  )

// A cell's text, after its column's name in the mono font when it has one.
const line = (cell: Element, name: string) =>
  el('p', [], [...(name ? [el('span', ['row-label', 'mono'], [{ type: 'text', value: name }])] : []), ...cell.children])

const bar = (name: string) => el('div', ['ph', 'mono'], [el('span', [], [{ type: 'text', value: name }])])

const rowOf = (cells: Element[], names: string[]) => {
  const [first, ...rest] = cells
  const beside = rest.filter(isCode)
  const under = rest.filter(cell => !isCode(cell) && label(cell))
  // Code from the table becomes the field list's own name and type, so both read the same.
  const title = first && isCode(first) ? el('span', ['k'], first.children) : el('strong', [], first?.children ?? [])
  const types = beside.map(cell => el('span', ['ty'], cell.children))
  return el(
    'div',
    ['pr'],
    [
      el('div', ['pn'], [title, ...types]),
      ...under.map(cell => line(cell, names.length > 2 ? (names[cells.indexOf(cell)] ?? '') : ''))
    ]
  )
}

// A table whose first heading is in italics compares things: a field list with that heading as its title and, at the
// right of its bar, a switch that picks the thing, each row gives
// the point's name and that thing's value (scripts/compare.ts). Every value is in the page, for search engines too.
const compareOf = (names: string[], rows: Element[][]) => {
  const things = names.slice(1)
  const button = (name: string, index: number) => ({
    ...el('button', [], [{ type: 'text', value: name }]),
    properties: { type: 'button', dataI: String(index), ariaPressed: index === 0 ? 'true' : 'false' }
  })
  const bar = el(
    'div',
    ['ph', 'mono'],
    [el('span', [], [{ type: 'text', value: names[0] ?? '' }]), el('div', ['seg'], things.map(button))]
  )
  const value = (cells: Element[], index: number) => ({
    ...el('p', ['cmp-v'], cells[index + 1]?.children ?? []),
    properties: { className: ['cmp-v'], dataI: String(index) }
  })
  const row = (cells: Element[]) =>
    el(
      'div',
      ['pr'],
      [el('div', ['pn'], [el('strong', [], cells[0]?.children ?? [])]), ...things.map((_, i) => value(cells, i))]
    )
  return {
    ...el('div', ['props', 'rows', 'compare'], [bar, ...rows.map(row)]),
    properties: { className: ['props', 'rows', 'compare'], dataShow: '0' }
  }
}

export const rowsOf = (table: Element): Element => {
  const [head] = elements(table, 'thead').flatMap(part => elements(part, 'tr'))
  const names = head ? cellsOf(head).map(label) : []
  const rows = elements(table, 'tbody')
    .flatMap(part => elements(part, 'tr'))
    .map(cellsOf)
  const first = head ? cellsOf(head)[0] : undefined
  const emphasised = first?.children.some(child => child.type === 'element' && child.tagName === 'em') ?? false
  if (names.length > 2 && emphasised && names.slice(1).every(Boolean)) return compareOf(names, rows)
  return el('div', ['props', 'rows'], [...(names[0] ? [bar(names[0])] : []), ...rows.map(cells => rowOf(cells, names))])
}
