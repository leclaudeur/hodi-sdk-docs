import i18next from 'i18next'
import { createRoot, type Root } from 'react-dom/client'
import { setChosenLanguage } from '../src/lib/i18n.ts'
import { PluginScope } from '../src/plugins/scope.ts'
import type { Lang, State } from './code.ts'
import { DRAW } from './draw.tsx'
import { AFTER } from './draw-modals.tsx'
import '../src/styles/index.ts'

// The docs' playground: Hodi's real component, drawn again each time a control changes.

// A dialog or the toasts drawn in a render stay in its window, as the render shows them: in the browser's top layer,
// they would cover the docs' page and take its focus.
const inRender = (element: Element) => element.getRootNode() instanceof ShadowRoot
const { showModal } = HTMLDialogElement.prototype
HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
  if (inRender(this)) this.setAttribute('open', '')
  else showModal.call(this)
}
const { showPopover } = HTMLElement.prototype
HTMLElement.prototype.showPopover = function (this: HTMLElement) {
  if (inRender(this)) this.removeAttribute('popover')
  else showPopover.call(this)
}

const roots = new WeakMap<Element, Root>()

// Hodi's own words (Annuler, J'ai au moins 13 ans) follow the docs page, not the browser; a dialog or a toast asks
// for them once they are loaded.
const shown = (lang: Lang) =>
  i18next.language === lang
    ? Promise.resolve()
    : new Promise<void>(resolve => {
        const changed = (language: string) => {
          if (language !== lang) return
          i18next.off('languageChanged', changed)
          resolve()
        }
        i18next.on('languageChanged', changed)
      })

const draw = (kind: string, el: Element, state: State, lang: Lang) => {
  setChosenLanguage(lang)
  let root = roots.get(el)
  if (!root) roots.set(el, (root = createRoot(el)))
  root.render(<PluginScope.Provider value="hello-world">{DRAW[kind]?.(state, lang)}</PluginScope.Provider>)
  const after = AFTER[kind]
  if (after) void shown(lang).then(() => after(state, lang))
}

;(window as unknown as { HodiPlay: unknown }).HodiPlay = { draw }
