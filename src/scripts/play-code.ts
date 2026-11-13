// The code a playground shows: only what differs from the defaults, coloured like the site's code windows.

import { langOf, t } from '../lib/i18n.ts'

export type State = Record<string, string | boolean>

const lang = langOf(location.pathname)

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;')
const token = (kind: string, text: string) =>
  `<span style="color:var(--astro-code-token-${kind})">${escape(text)}</span>`
const plain = (text: string) => `<span style="color:var(--astro-code-foreground)">${escape(text)}</span>`
const punct = (text: string) => token('punctuation', text)
const tag = (name: string) => token('constant', name)
const prop = (name: string) => token('function', name)
const quoted = (text: string) => token('string-expression', `"${text}"`)
const braces = (inner: string) => `${punct('{')}${inner}${punct('}')}`

const imports = (names: string[], from: string) =>
  `${token('keyword', 'import')}${plain(` { ${names.join(', ')} } `)}${token('keyword', 'from')} ${token('string-expression', `'${from}'`)}`

const button = (state: State) => {
  const icon = String(state.icon)
  const lines = [imports(['Button'], 'hodi:sdk')]
  if (icon !== 'none') lines.push(imports([icon], 'lucide-react'))
  let attributes = ''
  if (state.look !== 'neutral') attributes += ` ${prop('look')}${punct('=')}${quoted(String(state.look))}`
  if (icon !== 'none') attributes += ` ${prop('icon')}${punct('=')}${braces(plain(icon))}`
  for (const flag of ['compact', 'busy', 'wide']) if (state[flag]) attributes += ` ${prop(flag)}`
  const open = `${punct('<')}${tag('Button')}${attributes}${punct('>')}`
  lines.push('', `${open}${plain(String(state.label))}${punct('</')}${tag('Button')}${punct('>')}`)
  return lines.join('\n')
}

const attribute = (name: string, value: string) => `\n  ${prop(name)}${punct('=')}${value}`
const element = (name: string, inner = '') => `${punct('<')}${tag(name)}${inner}`

const stepBody = (body: unknown) => {
  if (body === 'field')
    return `\n  ${element('TextField', ` ${prop('icon')}${punct('=')}${braces(plain('Hand'))} ${prop('aria-label')}${punct('=')}${quoted(t(lang, 'playSampleField'))}`)}${punct(' />')}`
  if (body === 'toggle')
    return `\n  ${element('Toggle', ` ${prop('checked')}${punct('=')}${braces(plain('on'))} ${prop('onChange')}${punct('=')}${braces(plain('setOn'))}`)}${punct(' />')}`
  return ''
}

const stepPage = (state: State) => {
  const extra = { field: ['TextField'], toggle: ['Toggle'] }[String(state.body)] ?? []
  let code = `${imports(['Button', 'StepPage', ...extra].sort(), 'hodi:sdk')}\n\n${element('StepPage')}`
  if (state.progress) code += attribute('step', braces(tag('2'))) + attribute('total', braces(tag('3')))
  code += attribute('title', quoted(String(state.title))) + attribute('intro', quoted(String(state.intro)))
  if (state.back) code += attribute('onBack', braces(plain('back')))
  if (state.later)
    code += attribute(
      'start',
      braces(
        `${element('Button')}${punct('>')}${plain(t(lang, 'playSampleLater'))}${punct('</')}${tag('Button')}${punct('>')}`
      )
    )
  const primary = `${element('Button', ` ${prop('look')}${punct('=')}${quoted('primary')}`)}${punct('>')}${plain(t(lang, 'playSampleNext'))}${punct('</')}${tag('Button')}${punct('>')}`
  code += attribute('actions', braces(primary))
  return `${code}\n${punct('>')}${stepBody(state.body)}\n${punct('</')}${tag('StepPage')}${punct('>')}`
}

export const codeOf: Record<string, (state: State) => string> = { button, stepPage }
