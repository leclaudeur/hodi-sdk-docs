import { langOf } from '../lib/i18n.ts'
import type { State } from '../../demo/code.ts'

// « Personnaliser »: the props list turns into controls, and the window above draws Hodi's real component again
// with each change. Its bundle loads on that first click only, so the page stays light.

export type Control =
  | { kind: 'text'; key: string; value: string }
  | { kind: 'seg'; key: string; value: string; options: [string, string][] }
  | { kind: 'switch'; key: string; value: boolean }

interface Player {
  draw: (kind: string, host: Element, state: State, lang: 'fr' | 'en') => void
}

const lang = langOf(location.pathname)

const segment = (label: string, options: [string, string][], value: string, onPick: (value: string) => void) => {
  const group = document.createElement('div')
  group.className = 'seg'
  group.setAttribute('role', 'group')
  group.setAttribute('aria-label', label)
  for (const [key, name] of options) {
    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = name
    button.setAttribute('aria-pressed', String(key === value))
    button.addEventListener('click', () => {
      for (const other of group.children) other.setAttribute('aria-pressed', String(other === button))
      onPick(key)
    })
    group.append(button)
  }
  return group
}

const controlOf = (control: Control, label: string, state: State, redraw: () => void): HTMLElement => {
  const change = (value: string | boolean) => {
    state[control.key] = value
    redraw()
  }
  if (control.kind === 'seg') return segment(label, control.options, control.value, change)
  const input = document.createElement('input')
  input.setAttribute('aria-label', label)
  if (control.kind === 'switch') {
    const wrap = document.createElement('label')
    wrap.className = 'pl-sw'
    input.type = 'checkbox'
    input.checked = control.value
    input.addEventListener('change', () => change(input.checked))
    wrap.append(input, Object.assign(document.createElement('span'), { className: 'tr' }))
    return wrap
  }
  input.className = 'pl-in'
  input.value = control.value
  input.maxLength = 140
  input.addEventListener('input', () => change(input.value))
  return input
}

let bundle: Promise<Player | undefined> | undefined
const loadBundle = (url: string) =>
  (bundle ??= new Promise(resolve => {
    const script = document.createElement('script')
    script.type = 'module'
    script.src = url
    script.onload = () => resolve((window as unknown as { HodiPlay?: Player }).HodiPlay)
    script.onerror = () => resolve(undefined)
    document.head.append(script)
  }))

export { controlOf, lang, loadBundle, segment }
export type { Player }
