import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { EditorView } from '@codemirror/view'
import { tags } from '@lezer/highlight'

// The editor takes the colours of the site's code windows, from the theme's variables, so it follows light and dark.
const colours = HighlightStyle.define([
  { tag: [tags.keyword, tags.modifier, tags.controlKeyword, tags.moduleKeyword], color: 'var(--rust)' },
  { tag: [tags.string, tags.special(tags.string)], color: 'var(--topic-science)' },
  { tag: [tags.function(tags.variableName), tags.function(tags.propertyName)], color: 'var(--topic-travel)' },
  { tag: [tags.number, tags.bool, tags.null, tags.atom], color: 'var(--topic-belgium)' },
  { tag: [tags.typeName, tags.tagName, tags.className], color: 'var(--topic-culture)' },
  { tag: [tags.propertyName, tags.attributeName], color: 'var(--text)' },
  { tag: [tags.punctuation, tags.bracket, tags.separator, tags.comment], color: 'var(--text-3)' }
])

const look = EditorView.theme({
  '&': { flex: '1', minHeight: '0', background: 'transparent', color: 'var(--text)' },
  '&.cm-focused': { outline: 'none' },
  '.cm-scroller': { padding: '24px 0', font: '400 14px/2 var(--font-mono)', overflow: 'auto' },
  '.cm-content': { padding: '0', caretColor: 'var(--rust)' },
  '.cm-line': { padding: '0 24px 0 0' },
  '.cm-gutters': { border: '0', background: 'transparent', color: 'var(--text-faint)' },
  '.cm-lineNumbers .cm-gutterElement': { minWidth: '56px', padding: '0 20px 0 0', boxSizing: 'border-box' },
  '.cm-cursor': { borderLeft: '2px solid var(--rust)' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': {
    background: 'color-mix(in srgb, var(--rust) 22%, transparent) !important'
  },
  '.cm-edit': {
    background: 'color-mix(in srgb, var(--rust) 12%, transparent)',
    boxShadow: 'inset 2px 0 var(--rust)'
  },
  '.cm-edit.ok': {
    background: 'color-mix(in srgb, var(--approve-border) 14%, transparent)',
    boxShadow: 'inset 2px 0 var(--approve-border)'
  }
})

export const editorTheme = [look, syntaxHighlighting(colours)]
