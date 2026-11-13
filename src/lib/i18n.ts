import en from '../i18n/en.json' with { type: 'json' }
import fr from '../i18n/fr.json' with { type: 'json' }

export const langs = ['fr', 'en'] as const
export type Lang = (typeof langs)[number]
export type Key = keyof typeof fr

const strings: Record<Lang, Record<Key, string>> = { fr, en }

export const isLang = (value: string): value is Lang => (langs as readonly string[]).includes(value)

// The language of a content file or an address: the first folder that names one.
export const langOf = (path: string): Lang => path.split(/[/\\]/).find(isLang) ?? 'fr'

export const t = (lang: Lang, key: Key) => strings[lang][key]
