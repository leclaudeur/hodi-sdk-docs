import { t } from '../lib/i18n.ts'
import type { State } from '../../demo/code.ts'
import { controlOf, lang, loadBundle, segment, type Control } from './play.ts'

type Sync = (value: unknown) => void
interface Live {
  controls: Record<string, Control>
  state: State
  set: (key: string, value: unknown) => void
  syncs: Map<string, Sync[]>
}

// A render drawn in a second step (a toast, once Sonner has loaded) keeps its picture until it shows something, so the
// first hover never flashes an empty render.
const keepUntilDrawn = (host: Element, still: Node[]) => {
  const drawn = () =>
    [...host.children].some(child => !still.includes(child) && child.getBoundingClientRect().height > 0)
  if (drawn()) return
  host.append(...still)
  const watch = new MutationObserver(() => {
    if (!drawn()) return
    watch.disconnect()
    for (const node of still) node.parentNode?.removeChild(node)
  })
  watch.observe(host, { childList: true, subtree: true, attributes: true })
}

// A render comes alive as soon as the pointer or the focus reaches it: Hodi's real component is drawn again inside
// the render's own root, with the same ground and CSS, so nothing moves, and a click in it works as in the app.
const start = async (term: HTMLElement): Promise<Live | undefined> => {
  const kind = term.dataset.play ?? ''
  const host = term.querySelector('.cmp-render')?.shadowRoot?.querySelector('.in')
  const { codeOf, controlsOf } = await import('./play-code.ts')
  const player = await loadBundle(term.dataset.playJs ?? '')
  if (!host || !player) return undefined
  await player.ready(lang)
  const still = [...host.childNodes]
  host.replaceChildren()
  const controls = controlsOf(kind)
  const state: State = Object.fromEntries(Object.values(controls).map(control => [control.key, control.value]))
  const code = term.querySelector('pre code') ?? term.querySelector('pre')
  const syncs = new Map<string, Sync[]>()
  // A control and a click in the component both go through set, so the render, the controls and the code agree.
  const set = (key: string, value: unknown) => {
    state[key] = value as State[string]
    for (const sync of syncs.get(key) ?? []) sync(value)
    player.draw(kind, host, state, lang, set)
    if (code) code.innerHTML = codeOf(kind, state)
  }
  player.draw(kind, host, state, lang, set)
  keepUntilDrawn(host, still)
  return { controls, state, set, syncs }
}

const lives = new WeakMap<HTMLElement, Promise<Live | undefined>>()
const liveOf = (term: HTMLElement) => {
  let live = lives.get(term)
  if (!live) lives.set(term, (live = start(term)))
  return live
}

// « Personnaliser »: the props list turns into controls, each showing the state as it is now.
const withControls = async (term: HTMLElement, list: HTMLElement) => {
  const live = await liveOf(term)
  if (!live) return false
  if (list.querySelector('.pc')) return true
  for (const row of list.querySelectorAll<HTMLElement>('.pr')) {
    const name = row.querySelector('code.k')?.textContent ?? ''
    const cell = document.createElement('div')
    cell.className = 'pc'
    const control = live.controls[name]
    if (control) {
      const now = { ...control, value: live.state[control.key] } as Control
      const synced: Sync[] = []
      cell.append(controlOf(now, name, live.set, synced))
      live.syncs.set(control.key, [...(live.syncs.get(control.key) ?? []), ...synced])
    }
    row.append(cell)
  }
  return true
}

// The component's name: the title its section opens with.
const titleOf = (term: HTMLElement) => {
  let node = term.previousElementSibling
  while (node && !/^H[23]$/.test(node.tagName)) node = node.previousElementSibling
  return node?.textContent?.trim() ?? ''
}

// Under the render, always in its place: three tabs, Code, Props and Personnaliser, which show one panel at a time. A
// phone has no Personnaliser, with no room to change a prop and see it change; nor has a page, a dialog or a toast.
const tabsOf = (term: HTMLElement, list: HTMLElement) => {
  const noPlay = matchMedia('(max-width: 600px)').matches || term.dataset.fixed !== undefined
  const code = term.querySelector<HTMLElement>('.cmp-code')
  let live = false
  const tabs: [string, string][] = [
    ['code', t(lang, 'playCode')],
    ['props', t(lang, 'playProps')],
    ...(noPlay ? [] : ([['play', t(lang, 'playEdit')]] as [string, string][]))
  ]
  // The list's own note, « ? : facultatif », follows the name while the props show.
  const note = document.createElement('span')
  note.className = 'cmp-note'
  note.textContent = list.querySelector('.ph span:last-child')?.textContent ?? ''
  const show = async (tab: string) => {
    if (tab === 'play' && !live) live = await withControls(term, list)
    note.hidden = tab === 'code'
    if (code) code.hidden = tab !== 'code'
    list.hidden = tab === 'code'
    list.classList.toggle('playing', tab === 'play' && live)
  }
  // The bar is a field list's: the component's name at the left, the tabs at the right.
  const bar = document.createElement('div')
  bar.className = 'cmp-tabs mono'
  const name = document.createElement('span')
  name.className = 'cmp-name'
  name.textContent = titleOf(term)
  const left = document.createElement('span')
  left.className = 'cmp-head'
  left.append(name, note)
  bar.append(
    left,
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
    const render = term.querySelector('.cmp-render')
    for (const type of ['pointerenter', 'focusin', 'touchstart'])
      render?.addEventListener(type, () => void liveOf(term), { once: true, passive: true })
  }
}
