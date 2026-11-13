import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { snippetLines, toText } from './code.ts'
import { defaultsOf } from './controls.ts'
import { KINDS } from './kinds.ts'

// Writes each component's first code, the one its « Personnaliser » starts from, into the blocks of the Markdown
// pages that draw it, in French and in English:
//   node demo/sync-docs.ts

for (const lang of ['fr', 'en'] as const) {
  const dirs = ['components', 'functions'].map(section => `src/content/v1/${lang}/${section}`)
  for (const path of dirs.flatMap(dir => readdirSync(dir).map(file => `${dir}/${file}`))) {
    const md = readFileSync(path, 'utf8')
    const out = md.replace(/```tsx([^\n]*)render="([a-z]+)"([^\n]*)\n[\s\S]*?\n```/g, (all, a, name, b) => {
      const kind = KINDS[name]
      if (!kind) return all
      const meta = `${a}render="${name}"${b}`.replace(/\s*play="[^"]*"/, '') + ` play="${name}"`
      const code = toText(snippetLines(kind.code(defaultsOf(kind, lang), lang)))
      return '```tsx' + meta + '\n' + code.trimEnd() + '\n```'
    })
    if (out !== md) writeFileSync(path, out)
  }
}
