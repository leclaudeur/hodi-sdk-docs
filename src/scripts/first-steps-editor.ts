import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { EditorState, StateEffect, StateField, type Extension } from '@codemirror/state'
import { Decoration, EditorView, keymap, lineNumbers } from '@codemirror/view'
import { isDone, liveRow, readCode } from '../lib/live.ts'
import { editorTheme } from './editor-theme.ts'

// Premiers pas: the step's file becomes an editor. Each key the person types updates the preview, and the step is
// done once the code says what the to-do list asks.

interface Setup {
  file: string
  lang: string
  edit: number
  start: string
  finished: string
  label: string
}

const panel = document.querySelector<HTMLElement>('.tz-file[data-editor]')
const setup = panel ? (JSON.parse(panel.dataset.editor ?? '{}') as Setup) : undefined
const key = `hodi-first-steps:${location.pathname}`

const languageOf = (lang: string): Extension[] => {
  if (lang === 'json') return [json()]
  if (lang === 'ts' || lang === 'tsx') return [javascript({ typescript: true, jsx: lang === 'tsx' })]
  return []
}

// The step's line stays marked while the person types around it; it turns green once the step is done.
const finish = StateEffect.define<null>()
const marked = (line: number) =>
  StateField.define({
    create: state => markOf(state.doc.line(line).from, false),
    update: (marks, transaction) => {
      const done = transaction.effects.some(effect => effect.is(finish))
      const moved = marks.map(transaction.changes)
      if (!done) return moved
      let from = 0
      moved.between(0, transaction.state.doc.length, start => {
        from = start
      })
      return markOf(from, true)
    },
    provide: field => EditorView.decorations.from(field)
  })
const markOf = (from: number, ok: boolean) =>
  Decoration.set([Decoration.line({ class: ok ? 'cm-edit ok' : 'cm-edit' }).range(from)])

const read = (key: string) => {
  try {
    return sessionStorage.getItem(key)
  } catch {
    return null
  }
}
const keep = (key: string, value: string) => {
  try {
    sessionStorage.setItem(key, value)
  } catch {
    // A private window keeps nothing: the step simply starts again next time.
  }
}

// The live row follows the code: the setting's value, the route's answer, or the button's look.
const showLive = (file: string, code: string) => {
  const row = document.querySelector<HTMLElement>('.s-row[data-live]')
  if (!row) return
  const live = liveRow(file, readCode(file, code), row.dataset.greeting ?? '')
  const text = row.querySelector<HTMLElement>('.t > span')
  if (text && live.value !== undefined) {
    text.textContent = live.value
    text.className = live.value ? 'flash' : 'h'
  }
  if (text && live.answer !== undefined) {
    text.dataset.answer = live.answer
    if (text.classList.contains('flash')) text.textContent = live.answer
  }
  if (live.primary !== undefined) row.querySelector('.btn')?.classList.toggle('primary', live.primary)
}

// Done: every to-do is ticked, what the step brings shows, and the way on opens.
const showDone = () => {
  for (const item of document.querySelectorAll<HTMLElement>('.v-list li')) {
    item.className = 'done'
    const tick = document.querySelector<HTMLTemplateElement>('template[data-tick]')?.content.cloneNode(true)
    if (tick) item.querySelector('.b')?.replaceChildren(tick)
  }
  for (const element of document.querySelectorAll<HTMLElement>('[data-after]')) element.hidden = false
  const next = document.querySelector<HTMLElement>('[data-next]')
  next?.removeAttribute('aria-disabled')
  next?.classList.remove('locked')
}

const mount = (host: HTMLElement, config: Setup) => {
  let done = false
  const check = (view: EditorView) => {
    const code = view.state.doc.toString()
    keep(key, code)
    showLive(config.file, code)
    if (done || !isDone(config.file, code, config.finished)) return
    done = true
    view.dispatch({ effects: finish.of(null) })
    showDone()
  }
  const view = new EditorView({
    state: EditorState.create({
      doc: read(key) ?? config.start,
      extensions: [
        lineNumbers(),
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
        languageOf(config.lang),
        editorTheme,
        marked(config.edit),
        EditorView.contentAttributes.of({ 'aria-label': config.label, spellcheck: 'false' }),
        EditorView.updateListener.of(update => {
          if (update.docChanged) check(update.view)
        })
      ]
    })
  })
  host.querySelector('pre')?.remove()
  host.prepend(view.dom)
  check(view)
  // The click that loaded the editor puts the caret where it landed.
  const [x, y] = (host.dataset.at ?? '').split(',').map(Number)
  const at = x !== undefined && y !== undefined ? view.posAtCoords({ x, y }) : null
  if (at !== null) {
    view.focus()
    view.dispatch({ selection: { anchor: at } })
  }
}

if (panel && setup) mount(panel, setup)
