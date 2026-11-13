import type { Element, ElementContent, Root, RootContent } from 'hast'
import { KINDS } from '../../demo/kinds.ts'
import { demoAssets, renders } from './demo.ts'
import { langOf, type Lang } from './i18n.ts'

// A component's frame gets the component itself, drawn by Hodi's code at build time, in a declarative shadow root:
// the app's CSS stays inside it and the docs' styles stay out, with no script. It is the playground's own CSS, so
// « Personnaliser » draws the component again in the same root, exactly as it was.

export const shadowOf = (key: string, lang: Lang, extra = '') => {
  const desktop = renders[lang].d[key] ?? ''
  const phone = renders[lang].p[key] ?? desktop
  const inner = desktop === phone ? desktop : `<div class="rv-d">${desktop}</div><div class="rv-p">${phone}</div>`
  return `<template shadowrootmode="open"><link rel="stylesheet" href="${demoAssets.playCss.url}">${extra}<div class="in">${inner}</div></template>`
}

const visit = (node: Root | Element, lang: Lang) => {
  for (const child of node.children as RootContent[]) {
    if (child.type !== 'element') continue
    const key = child.properties.dataRender
    if (child.properties.dataPlay) {
      child.properties.dataPlayJs = demoAssets.playJs.url
    }
    if (typeof key === 'string') {
      // A card, a row or a field spans its window, as it spans the playground's stage.
      if (KINDS[key]?.wide) child.properties.className = [...((child.properties.className as string[]) ?? []), 'wide']
      // A raw node: the serializer writes it as is, and Astro allows raw HTML in Markdown.
      child.children = [{ type: 'raw', value: shadowOf(key, lang) } as unknown as ElementContent]
    } else visit(child, lang)
  }
}

// Its options only name the files, so that a new render invalidates the pages Astro keeps (see astro.config.ts).
export const rehypeRenders = (_options?: { files: string[] }) => (tree: Root, file: { path?: string }) =>
  visit(tree, langOf(file.path ?? ''))
