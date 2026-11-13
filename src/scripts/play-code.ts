// What a playground needs from the components' descriptions (demo/kinds.ts): its controls in the page's language,
// and the code under the render, coloured like the site's code windows. Loaded with « Personnaliser » only.

import { snippetLines, type State, type Tok } from '../../demo/code.ts'
import { say } from '../../demo/controls.ts'
import { KINDS } from '../../demo/kinds.ts'
import { langOf } from '../lib/i18n.ts'
import type { Control } from './play.ts'

const lang = langOf(location.pathname)

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;')
const span = ([kind, text]: Tok) =>
  `<span style="color:var(--astro-code-${kind ? `token-${kind}` : 'foreground'})">${escape(text)}</span>`

// Each prop of the list that a control drives, by its name in the list.
export const controlsOf = (kind: string): Record<string, Control> =>
  Object.fromEntries(
    Object.entries(KINDS[kind]?.controls ?? {}).map(([name, control]): [string, Control] => {
      if (control.kind === 'text') return [name, { ...control, value: say(control.value, lang) }]
      if (control.kind === 'seg')
        return [name, { ...control, options: control.options.map(([key, label]) => [key, say(label, lang)]) }]
      return [name, control]
    })
  )

export const codeOf = (kind: string, state: State) => {
  const spec = KINDS[kind]
  return spec
    ? snippetLines(spec.code(state, lang))
        .map(line => line.map(span).join(''))
        .join('\n')
    : ''
}

export type { State }
