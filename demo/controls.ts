import type { Lang, Snippet, State } from './code.ts'

// What « Personnaliser » offers for each prop of a component's list, and its first value: the render and the code
// under it both start from these values.

export type Words = string | { fr: string; en: string }
export type Control =
  | { kind: 'text'; key: string; value: Words }
  | { kind: 'switch'; key: string; value: boolean }
  | { kind: 'seg'; key: string; value: string; options: [string, Words][] }

export interface Kind {
  // A card, a row or a field fills the stage, as it fills its render; a button or a chip sits in its middle.
  wide?: true
  // A page, a dialog or a toast shows its example as it is: its props list, without « Personnaliser ».
  fixed?: true
  // By the prop's name in the list, such as `look?`. A name the list does not show only gives its first value.
  controls: Record<string, Control>
  code: (state: State, lang: Lang) => Snippet
}

export const words = (fr: string, en: string): Words => ({ fr, en })
export const say = (value: Words, lang: Lang) => (typeof value === 'string' ? value : value[lang])
export const tr = (lang: Lang) => (fr: string, en: string) => (lang === 'en' ? en : fr)

export const text = (key: string, value: Words): Control => ({ kind: 'text', key, value })
export const toggle = (key: string, value = false): Control => ({ kind: 'switch', key, value })
export const seg = (key: string, options: (string | [string, Words])[], value?: string): Control => {
  const list = options.map((option): [string, Words] => (typeof option === 'string' ? [option, option] : option))
  return { kind: 'seg', key, options: list, value: value ?? list[0]![0] }
}

export const NONE: [string, Words] = ['none', words('Aucune', 'None')]

export const defaultsOf = (kind: Kind, lang: Lang): State =>
  Object.fromEntries(
    Object.values(kind.controls).map(control => [
      control.key,
      control.kind === 'text' ? say(control.value, lang) : control.value
    ])
  )

export const str = (state: State, key: string) => String(state[key] ?? '')
