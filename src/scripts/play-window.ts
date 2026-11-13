import { t } from '../lib/i18n.ts'
import type { State } from '../../demo/code.ts'
import { controlOf, lang, loadBundle, segment } from './play.ts'

// « Personnaliser » draws the component again inside its render's own root: the same ground, the same CSS, the same
// place, so the render never changes until a control does.
const goLive = async (term: HTMLElement, list: HTMLElement) => {
  const kind = term.dataset.play ?? ''
  const host = term.querySelector('.cmp-render')?.shadowRoot?.querySelector('.in')
  const { codeOf, controlsOf } = await import('./play-code.ts')
  const player = await loadBundle(term.dataset.playJs ?? '')
  if (!host || !player) return false
  host.replaceChildren()
  const controls = controlsOf(kind)
  const state: State = Object.fromEntries(Object.values(controls).map(control => [control.key, control.value]))
  const code = term.querySelector('pre code') ?? term.querySelector('pre')
  const redraw = () => {
    player.draw(kind, host, state, lang)
    if (code) code.innerHTML = codeOf(kind, state)
  }
  for (const row of list.querySelectorAll<HTMLElement>('.pr')) {
    const name = row.querySelector('code.k')?.textContent ?? ''
    const cell = document.createElement('div')
    cell.className = 'pc'
    const control = controls[name]
    if (control) cell.append(controlOf(control, name, state, redraw))
    row.append(cell)
  }
  redraw()
  return true
}

// The component's name: the title its section opens with.
const titleOf = (term: HTMLElement) => {
  let node = term.previousElementSibling
  while (node && !/^H[23]$/.test(node.tagName)) node = node.previousElementSibling
  return node?.textContent?.trim() ?? ''
}

// Under the render, always in its place: three tabs, Code, Props and Personnaliser, which show one panel at a time. A
// phone has no Personnaliser: there is no room to change a prop and see it change.
const tabsOf = (term: HTMLElement, list: HTMLElement) => {
  const phone = matchMedia('(max-width: 600px)').matches
  const code = term.querySelector<HTMLElement>('.cmp-code')
  let live = false
  const tabs: [string, string][] = [
    ['code', t(lang, 'playCode')],
    ['props', t(lang, 'playProps')],
    ...(phone ? [] : ([['play', t(lang, 'playEdit')]] as [string, string][]))
  ]
  const show = async (tab: string) => {
    if (tab === 'play' && !live) live = await goLive(term, list)
    if (code) code.hidden = tab !== 'code'
    list.hidden = tab === 'code'
    list.classList.toggle('playing', tab === 'play' && live)
  }
  // The bar is a field list's: the component's name at the left, the tabs at the right.
  const bar = document.createElement('div')
  bar.className = 'cmp-tabs mono'
  const name = document.createElement('span')
  name.textContent = titleOf(term)
  bar.append(
    name,
    segment(t(lang, 'playView'), tabs, 'code', tab => void show(tab))
  )
  return { bar, show }
}

export const wirePlay = () => {
  for (const term of document.querySelectorAll<HTMLElement>('.term.cmp[data-play]')) {
    const list = term.nextElementSibling
    if (!(list instanceof HTMLElement) || !list.classList.contains('props')) continue
    const { bar, show } = tabsOf(term, list)
    // The tabs and the props move into the window, under the render and the code's place.
    term.querySelector('.cmp-code')?.before(bar)
    term.append(list)
    list.classList.add('in-tabs')
    void show('code')
  }
}
