// The code shown under a component, written from the same description as its render: the playground rewrites it
// at each change, and `node demo/sync-docs.ts` writes it into the Markdown. Formatted like Prettier at 120.

export type Lang = 'fr' | 'en'
export type State = Record<string, string | boolean>
// A token: its colour (a Shiki css-variables token, or null for plain text) and its text.
export type Tok = [string | null, string]
type Line = Tok[]

// A value inside an object or a call: a string in single quotes, or code as it is.
export type Val = { s: string } | { e: string }
export type Obj = [string, Val][]
export type AttrValue = { s: string } | { e: string } | { el: El } | { o: Obj } | { a: Obj[] } | true
export interface El {
  tag: string
  attrs: [string, AttrValue][]
  children: (El | string)[]
}
export interface Call {
  call: string
  args: (Val | { o: Obj })[]
}
export interface Snippet {
  body: (El | Call)[]
  lucide?: string[]
  uses?: string[]
  // The plugin's own components, by name and file: imported from there, never from hodi:sdk.
  own?: [string, string][]
  pre?: string[]
}

const WIDTH = 120

export const h = (tag: string, attrs: [string, AttrValue | false | undefined][], ...children: (El | string)[]): El => ({
  tag,
  attrs: attrs.filter((attr): attr is [string, AttrValue] => attr[1] !== false && attr[1] !== undefined),
  children
})
export const s = (text: string) => ({ s: text })
export const e = (code: string) => ({ e: code })

const plain = (text: string): Tok => [null, text]
const punct = (text: string): Tok => ['punctuation', text]
const width = (line: Line) => line.reduce((sum, [, text]) => sum + text.length, 0)
const pad = (indent: number) => plain(' '.repeat(indent))

const valTokens = (val: Val): Line => ('s' in val ? [['string-expression', `'${val.s}'`]] : [plain(val.e)])
const objInline = (obj: Obj): Line => [
  punct('{ '),
  ...obj.flatMap(([key, val], index) => [
    ...(index > 0 ? [punct(', ')] : []),
    plain(key),
    punct(': '),
    ...valTokens(val)
  ]),
  punct(' }')
]
// An object with more than one entry goes one entry per line, as the docs' code blocks do.
const objLines = (obj: Obj, indent: number, open: Line, close: string): Line[] => {
  if (obj.length < 2) return [[...open, ...objInline(obj), punct(close.replace(/^}/, ''))]]
  const entries = obj.map(([key, val], index) => [
    pad(indent + 2),
    plain(key),
    punct(': '),
    ...valTokens(val),
    ...(index < obj.length - 1 ? [punct(',')] : [])
  ])
  return [[...open, punct('{')], ...entries, [pad(indent), punct(close)]]
}

const attrLines = (name: string, value: AttrValue, indent: number): Line[] | null => {
  const head: Line = [['function', name]]
  if (value === true) return [head]
  if ('s' in value) return [[...head, punct('='), ['string-expression', `"${value.s}"`]]]
  if ('e' in value) return [[...head, punct('={'), plain(value.e), punct('}')]]
  if ('el' in value) {
    const inner = elLines(value.el, 0)
    return inner.length === 1 ? [[...head, punct('={'), ...inner[0]!, punct('}')]] : null
  }
  if ('o' in value) return objLines(value.o, indent, [...head, punct('={')], '}}')
  const items = value.a.map((obj, index) => [
    pad(indent + 2),
    ...objInline(obj),
    ...(index < value.a.length - 1 ? [punct(',')] : [])
  ])
  return [[...head, punct('={[')], ...items, [pad(indent), punct(']}')]]
}

const closeTag = (tag: string): Line => [punct('</'), tagTok(tag), punct('>')]
const tagTok = (tag: string): Tok => ['constant', tag]

const childLines = (children: (El | string)[], indent: number): Line[] =>
  children.flatMap(child => (typeof child === 'string' ? [[pad(indent), plain(child)]] : elLines(child, indent)))

export const elLines = (el: El, indent: number): Line[] => {
  const attrs = el.attrs.map(([name, value]) => attrLines(name, value, indent + 2))
  // Three props or more always go one per line, whatever the width: the same rule for every component.
  const inline = attrs.every(lines => lines?.length === 1) && attrs.filter(Boolean).length < 3
  const end = el.children.length === 0 ? ' />' : '>'
  const open: Line = [punct('<'), tagTok(el.tag), ...attrs.flatMap(lines => [plain(' '), ...(lines?.[0] ?? [])])]
  if (inline && indent + width(open) + end.length <= WIDTH) {
    const first: Line = [pad(indent), ...open, punct(end)]
    if (el.children.length === 0) return [first]
    const only = el.children[0]
    if (el.children.length === 1 && typeof only === 'string') {
      const one: Line = [...first, plain(only), ...closeTag(el.tag)]
      if (width(one) <= WIDTH) return [one]
    }
    return [first, ...childLines(el.children, indent + 2), [pad(indent), ...closeTag(el.tag)]]
  }
  const broken = el.attrs.flatMap(
    ([name, value]) =>
      attrLines(name, value, indent + 2)?.map((line, index) => (index === 0 ? [pad(indent + 2), ...line] : line)) ?? []
  )
  const lines: Line[] = [[pad(indent), punct('<'), tagTok(el.tag)], ...broken, [pad(indent), punct(end.trim())]]
  if (el.children.length === 0) return lines
  return [...lines, ...childLines(el.children, indent + 2), [pad(indent), ...closeTag(el.tag)]]
}

const callLines = (call: Call): Line[] => {
  const head: Line = [['function', call.call], punct('(')]
  const [first] = call.args
  if (first && 'o' in first) return objLines(first.o, 0, head, '})')
  const args = call.args.flatMap((arg, index) => [...(index > 0 ? [punct(', ')] : []), ...valTokens(arg as Val)])
  return [[...head, ...args, punct(')')]]
}

const importLine = (names: string[], from: string): Line => [
  ['keyword', 'import'],
  plain(` { ${[...names].sort((a, b) => a.localeCompare(b)).join(', ')} } `),
  ['keyword', 'from'],
  plain(' '),
  ['string-expression', `'${from}'`]
]

// The names a snippet takes from hodi:sdk: its components (not its icons), its calls and what it uses besides.
const sdkNames = (snippet: Snippet) => {
  const names = new Set(snippet.uses ?? [])
  const icons = new Set([...(snippet.lucide ?? []), ...(snippet.own ?? []).map(([name]) => name)])
  const walk = (node: El | string) => {
    if (typeof node === 'string') return
    if (/^[A-Z]/.test(node.tag) && !icons.has(node.tag)) names.add(node.tag)
    for (const [, value] of node.attrs) if (typeof value === 'object' && 'el' in value) walk(value.el)
    node.children.forEach(walk)
  }
  for (const node of snippet.body) {
    if ('call' in node) names.add(node.call)
    else walk(node)
  }
  return [...names]
}

export const snippetLines = (snippet: Snippet): Line[] => [
  importLine(sdkNames(snippet), 'hodi:sdk'),
  ...(snippet.lucide?.length ? [importLine([...new Set(snippet.lucide)], 'lucide-react')] : []),
  ...(snippet.own ?? []).map(([name, file]): Line => [
    ['keyword', 'import'],
    plain(` ${name} `),
    ['keyword', 'from'],
    plain(' '),
    ['string-expression', `'${file}'`]
  ]),
  [],
  ...(snippet.pre ?? []).map(line => [plain(line)]),
  ...snippet.body.flatMap(node => ('call' in node ? callLines(node) : elLines(node, 0)))
]

export const toText = (lines: Line[]) => lines.map(line => line.map(([, text]) => text).join('')).join('\n')
