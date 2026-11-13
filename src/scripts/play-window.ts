import { t } from '../lib/i18n.ts'
import type { State } from '../../demo/code.ts'
import { controlOf, fontFaces, lang, loadBundle, segment, type Player } from './play.ts'

// The window of a component with a playground: its stage, and for a page-sized one a frame with its own viewport.

const theme = () => document.documentElement.dataset.theme ?? ''

// A page reads the viewport (its media queries, 100dvh): it gets a frame of its own, phone-wide on demand.
const frameStage = (stage: HTMLElement, css: string, js: string) => {
  const frame = document.createElement('iframe')
  frame.className = 'pl-frame'
  frame.title = t(lang, 'playRender')
  frame.srcdoc = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style>${fontFaces()}</style><link rel="stylesheet" href="${css}"><style>html,body{margin:0;height:100%;background:var(--bg)}#h{height:100%}</style></head><body><div id="h"></div><script type="module" src="${js}"></script></body></html>`
  stage.append(frame)
  const ready = new Promise<void>(resolve => frame.addEventListener('load', () => resolve()))
  return async (kind: string, state: State) => {
    await ready
    const inner = frame.contentWindow as (Window & { HodiPlay?: Player }) | null
    const root = frame.contentDocument?.documentElement
    if (root) {
      if (theme()) root.dataset.theme = theme()
      else delete root.dataset.theme
    }
    const host = frame.contentDocument?.getElementById('h')
    if (host) inner?.HodiPlay?.draw(kind, host, state, lang)
  }
}

const shadowStage = (stage: HTMLElement, css: string, player: Player, wide: boolean) => {
  const root = stage.attachShadow({ mode: 'open' })
  root.innerHTML = `<link rel="stylesheet" href="${css}"><style>:host{display:grid!important;place-items:center}.host{display:flex;justify-content:center;width:100%}.host.wide{display:block}</style><div class="host${wide ? ' wide' : ''}"></div>`
  const host = root.querySelector('.host')
  return async (kind: string, state: State) => {
    if (host) player.draw(kind, host, state, lang)
  }
}

// Ordinateur / Téléphone and Agrandir, above a page-sized stage.
const pageBar = (term: HTMLElement) => {
  const bar = document.createElement('div')
  bar.className = 'pl-bar'
  const devices: [string, string][] = [
    ['desktop', t(lang, 'playDesktop')],
    ['phone', t(lang, 'playPhone')]
  ]
  bar.append(
    segment(t(lang, 'playView'), devices, 'desktop', value => term.classList.toggle('as-phone', value === 'phone'))
  )
  const full = document.createElement('button')
  full.type = 'button'
  full.className = 'btn compact pl-full'
  full.textContent = t(lang, 'playBigger')
  const setFull = (on: boolean) => {
    term.classList.toggle('full', on)
    document.documentElement.classList.toggle('pl-locked', on)
    full.textContent = t(lang, on ? 'playSmaller' : 'playBigger')
  }
  full.addEventListener('click', () => setFull(!term.classList.contains('full')))
  addEventListener('keydown', event => {
    if (event.key === 'Escape' && term.classList.contains('full')) setFull(false)
  })
  bar.append(full)
  term.prepend(bar)
}

const goLive = async (term: HTMLElement, list: HTMLElement) => {
  const kind = term.dataset.play ?? ''
  const css = term.dataset.playCss ?? ''
  const js = term.dataset.playJs ?? ''
  // A page, a dialog or a toast reads the viewport: it gets a frame of its own.
  const frame = term.querySelector('.cmp-render')?.classList
  const big = ['page', 'modal', 'toast'].some(name => frame?.contains(name))
  const { codeOf, controlsOf, isWide } = await import('./play-code.ts')
  const player = big ? undefined : await loadBundle(js)
  if (!big && !player) return false
  const stage = document.createElement('div')
  stage.className = `pl-stage${big ? ' pl-big' : ''}`
  term.querySelector('.cmp-render')?.replaceWith(stage)
  const draw = big ? frameStage(stage, css, js) : shadowStage(stage, css, player as Player, isWide(kind))
  if (big) pageBar(term)
  const controls = controlsOf(kind)
  const state: State = Object.fromEntries(Object.values(controls).map(control => [control.key, control.value]))
  const code = term.querySelector('pre code') ?? term.querySelector('pre')
  const redraw = () => {
    void draw(kind, state)
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
  new MutationObserver(redraw).observe(document.documentElement, { attributeFilter: ['data-theme'] })
  redraw()
  return true
}

export const wirePlay = () => {
  for (const term of document.querySelectorAll<HTMLElement>('.term.cmp[data-play]')) {
    const list = term.nextElementSibling
    if (!(list instanceof HTMLElement) || !list.classList.contains('props')) continue
    let live = false
    const modes: [string, string][] = [
      ['list', t(lang, 'playList')],
      ['play', t(lang, 'playEdit')]
    ]
    const pick = segment(t(lang, 'playView'), modes, 'list', async mode => {
      if (mode === 'play' && !live) live = await goLive(term, list)
      list.classList.toggle('playing', mode === 'play' && live)
    })
    list.querySelector('.ph span:last-child')?.replaceWith(pick)
  }
}
