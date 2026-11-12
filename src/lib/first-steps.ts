import type { ElementContent } from 'hast'
import { codeToHtml, createCssVariablesTheme, type ShikiTransformer } from 'shiki'
import type { Doc } from './docs.ts'

// The same variables as the site's code windows, so the editor takes their colours.
const theme = createCssVariablesTheme({ name: 'hodi-first-steps', variablePrefix: '--astro-code-' })

const textOf = (node: ElementContent): string => {
  if (node.type === 'text') return node.value
  return 'children' in node ? node.children.map(textOf).join('') : ''
}

// Every line gets its number; the step's line is marked, with the caret at its end; a terminal's ✓ is green.
const editor = (edit: number): ShikiTransformer => ({
  name: 'hodi-first-steps-editor',
  line(node, line) {
    const text = textOf(node)
    const classes = ['ln', line === edit ? 'edit' : '', /^\s*✓/.test(text) ? 'ok' : ''].filter(Boolean)
    node.properties.class = classes.join(' ')
    node.children.unshift({
      type: 'element',
      tagName: 'i',
      properties: {},
      children: [{ type: 'text', value: String(line) }]
    })
    if (line === edit)
      node.children.push({ type: 'element', tagName: 'span', properties: { className: ['caret'] }, children: [] })
  }
})

// The step's code as the editor draws it: highlighted, numbered, without the newlines between lines.
export const highlight = async (code: string, lang: string, edit: number) => {
  const html = await codeToHtml(code.trimEnd(), {
    lang: lang === 'text' ? 'text' : lang,
    theme,
    transformers: [editor(edit)]
  })
  return html.replace(/<\/span>\n<span class="ln/g, '</span><span class="ln')
}

// The pages of Premiers pas: one per step, then the last step again with the dialog that ends it.
export const firstStepsPages = (doc: Doc) => {
  const count = doc.entry.data.steps?.length ?? 0
  const steps = Array.from({ length: count }, (_, index) => ({ slug: index === 0 ? '' : String(index + 1), index }))
  return [...steps, { slug: 'done', index: count - 1 }]
}

// The address of one of its pages: the first step is the page itself.
export const firstStepsUrl = (doc: Doc, slug: string) => (slug ? `${doc.url}${slug}/` : doc.url)

// The static pages a document makes: one, or Premiers pas's steps and end.
export const pagesOf = (doc: Doc) =>
  doc.entry.data.steps
    ? firstStepsPages(doc).map(({ slug, index }) => ({
        params: { path: `${doc.url.slice(1)}${slug}`.replace(/\/$/, '') },
        props: { doc, current: index, done: slug === 'done' }
      }))
    : [{ params: { path: doc.url.slice(1, -1) }, props: { doc, current: 0, done: false } }]
