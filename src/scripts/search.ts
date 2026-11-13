import { groupRows, loadPagefind, markTitle, searchRows, type Row } from './search-results.ts'

// The spotlight: a native dialog for focus and Escape, rows picked with the arrows or the mouse, ⌘K from anywhere.

const dialog = document.querySelector<HTMLDialogElement>('dialog.sx')
const input = dialog?.querySelector('input')
const suggestions = dialog?.querySelector<HTMLElement>('.sx-sugg')
const results = dialog?.querySelector<HTMLElement>('.sx-res')
const empty = dialog?.querySelector<HTMLElement>('.sx-empty')
const icons = dialog?.querySelector('template')

let rows: HTMLAnchorElement[] = []
let chosen = 0

const iconOf = (name: string) =>
  icons?.content.querySelector(`[data-icon-name="${name}"] svg`) ??
  icons?.content.querySelector('[data-icon-name="file-text"] svg')

const pick = (index: number) => {
  chosen = Math.max(0, Math.min(index, rows.length - 1))
  rows.forEach((row, at) => row.setAttribute('aria-selected', String(at === chosen)))
  const row = rows[chosen]
  input?.setAttribute('aria-activedescendant', row?.id ?? '')
  row?.scrollIntoView({ block: 'nearest' })
}

const rowElement = (row: Row, query: string, at: number) => {
  const link = document.createElement('a')
  link.className = 'sx-r'
  link.id = `sx-r${at}`
  link.href = row.url
  link.setAttribute('role', 'option')
  link.innerHTML = `<span class="sq"></span><span class="tx"><b>${markTitle(row.title, query)}</b><span>${row.line}</span></span>`
  const square = iconOf(row.icon)
  const enter = icons?.content.querySelector('[data-icon-name="enter"] svg')
  if (square) link.firstElementChild?.append(square.cloneNode(true))
  if (enter) link.append(enter.cloneNode(true))
  return link
}

const groupElement = (name: string) => {
  const label = document.createElement('div')
  label.className = 'sx-g'
  label.textContent = name
  return label
}

const show = (pane: 'suggestions' | 'results' | 'empty') => {
  if (suggestions) suggestions.hidden = pane !== 'suggestions'
  if (results) results.hidden = pane !== 'results'
  if (empty) empty.hidden = pane !== 'empty'
  const visible = pane === 'suggestions' ? suggestions : results
  rows = pane === 'empty' ? [] : [...(visible?.querySelectorAll<HTMLAnchorElement>('.sx-r') ?? [])]
  rows.forEach((row, at) => (row.id ||= `sx-s${at}`))
  pick(0)
}

const render = async () => {
  const query = input?.value.trim() ?? ''
  if (!query) return show('suggestions')
  const found = await searchRows(query)
  if (found === undefined || query !== input?.value.trim()) return
  if (found.length === 0) return show('empty')
  let at = 0
  const nodes = [...groupRows(found)].flatMap(([name, list]) => [
    groupElement(name),
    ...list.map(row => rowElement(row, query, at++))
  ])
  results?.replaceChildren(...nodes)
  show('results')
}

const open = () => {
  if (!dialog || !input) return
  input.value = ''
  show('suggestions')
  dialog.showModal()
  input.focus()
  void loadPagefind()
}

const onKey = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    if (dialog?.open) dialog.close()
    else open()
    return
  }
  if (!dialog?.open) return
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    pick(chosen + (event.key === 'ArrowDown' ? 1 : -1))
    return
  }
  const row = rows[chosen]
  if (event.key === 'Enter' && row) {
    event.preventDefault()
    row.click()
  }
}

export const wireSearch = () => {
  if (!dialog) return
  // ⌘ on a Mac, Ctrl elsewhere: the hint shows the key this keyboard has.
  if (!/Mac|iPhone|iPad/.test(navigator.userAgent)) {
    for (const hint of document.querySelectorAll('.sdk-search kbd')) hint.textContent = 'Ctrl K'
  }
  for (const button of document.querySelectorAll('.sdk-search')) button.addEventListener('click', open)
  for (const button of dialog.querySelectorAll('[data-sx-close]'))
    button.addEventListener('click', () => dialog.close())
  dialog.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : undefined
    if (target === dialog || target?.closest('.sx-r')) dialog.close()
  })
  dialog.addEventListener('mousemove', event => {
    const row = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('.sx-r') : null
    if (row && rows.includes(row) && rows.indexOf(row) !== chosen) pick(rows.indexOf(row))
  })
  input?.addEventListener('input', () => void render())
  addEventListener('keydown', onKey)
}
