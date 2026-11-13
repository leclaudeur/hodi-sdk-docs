import type { Element, ElementContent } from 'hast'

// Any other Markdown table becomes rows or cards, never a grid: a grid's columns crush or overflow on a phone.
// A table whose first heading is empty and whose others are named compares those: one card per column, side by side
// on a wide screen and stacked on a phone. Else each row is a card row: its first cell as the title, a cell that is
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

// One card, one row per point compared: its name, then each thing's value side by side, so the rows line up. The
// things' names head the columns; on a phone, where the values stack, each value carries its thing's name.
const compareOf = (names: string[], rows: Element[][]) => {
  const things = names.slice(1)
  const head = el(
    'div',
    ['ph', 'mono', 'cmp-head'],
    things.map(name => el('span', [], [{ type: 'text', value: name }]))
  )
  const rowOfPoint = (cells: Element[]) =>
    el(
      'div',
      ['pr'],
      [
        el('span', ['row-label', 'mono'], [{ type: 'text', value: label(cells[0]) }]),
        el(
          'div',
          ['cmp-vals'],
          things.map((name, index) =>
            el(
              'div',
              ['cmp-val'],
              [
                el('span', ['cmp-thing', 'mono'], [{ type: 'text', value: name }]),
                el('p', [], cells[index + 1]?.children ?? [])
              ]
            )
          )
        )
      ]
    )
  return el('div', ['props', 'rows', 'compare'], [head, ...rows.map(rowOfPoint)])
}

export const rowsOf = (table: Element): Element => {
  const [head] = elements(table, 'thead').flatMap(part => elements(part, 'tr'))
  const names = head ? cellsOf(head).map(label) : []
  const rows = elements(table, 'tbody')
    .flatMap(part => elements(part, 'tr'))
    .map(cellsOf)
  if (names.length > 2 && !names[0] && names.slice(1).every(Boolean)) return compareOf(names, rows)
  return el('div', ['props', 'rows'], [...(names[0] ? [bar(names[0])] : []), ...rows.map(cells => rowOf(cells, names))])
}
