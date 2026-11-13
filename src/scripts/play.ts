import { langOf, t } from '../lib/i18n.ts'
import type { State } from './play-code.ts'

// « Personnaliser »: the props list turns into controls, and the window above draws Hodi's real component again
// with each change. Its bundle loads on that first click only, so the page stays light.

type Control =
  | { kind: 'text'; key: string; value: string }
  | { kind: 'seg'; key: string; value: string; options: [string, string][] }
  | { kind: 'switch'; key: string; value: boolean }

interface Player {
  draw: (host: Element, state: State) => void
}

const lang = langOf(location.pathname)
const text = (key: string, value: string): Control => ({ kind: 'text', key, value })
const toggle = (key: string, value = false): Control => ({ kind: 'switch', key, value })
const seg = (key: string, options: (string | [string, string])[], value: string): Control => ({
  kind: 'seg',
  key,
  value,
  options: options.map(option => (typeof option === 'string' ? [option, option] : option))
})

// Each prop of the list that a control drives, by its name in the list.
const CONTROLS: Record<string, Record<string, Control>> = {
  button: {
    children: text('label', 'Enregistrer'),
    'look?': seg('look', ['neutral', 'primary', 'danger', 'ai'], 'primary'),
    'icon?': seg('icon', [['none', t(lang, 'playNone')], 'Check', 'Download', 'Trash2'], 'Check'),
    'busy?': toggle('busy'),
    'compact?': toggle('compact'),
    'wide?': toggle('wide')
  },
  stepPage: {
    title: text('title', 'Ton prénom'),
    intro: text('intro', 'Hodi le met dans chaque salutation.'),
    'step?': toggle('progress', true),
    'onBack?': toggle('back', true),
    'start?': toggle('later'),
    'children?': seg(
      'body',
      [
        ['none', t(lang, 'playNothing')],
        ['field', 'TextField'],
        ['toggle', 'Toggle']
      ],
      'field'
    )
  }
}

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
    script.src = url
    script.onload = () => resolve((window as unknown as { HodiPlay?: Player }).HodiPlay)
    script.onerror = () => resolve(undefined)
    document.head.append(script)
  }))

// The page's own font faces, for a frame that has none.
const fontFaces = () =>
  [...document.styleSheets]
    .flatMap(sheet => {
      try {
        return [...sheet.cssRules]
      } catch {
        return []
      }
    })
    .filter(rule => rule instanceof CSSFontFaceRule)
    .map(rule => rule.cssText)
    .join('\n')

export { CONTROLS, controlOf, fontFaces, lang, loadBundle, segment }
export type { Player }
