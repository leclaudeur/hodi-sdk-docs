import { createRoot } from 'react-dom/client'
import { languageReady } from '../src/lib/i18n.ts'
import { PluginScope } from '../src/plugins/scope.ts'
import { defaultsOf } from './controls.ts'
import { DRAW } from './draw.tsx'
import { AFTER } from './draw-modals.tsx'
import { KINDS } from './kinds.ts'
import PluginAdmin from './plugin-admin.tsx'
import '../src/styles/index.ts'

// Every component of hodi:sdk on one page, each once, as its playground starts: capture.cjs copies them for the
// docs' renders. The capture draws the page twice: in French, then in English for the English pages.
const lang = navigator.language.startsWith('en') ? 'en' : 'fr'
// The question before deleting covers the page: the capture asks for it on a page of its own.
const confirmOnly = location.search.includes('confirm')

const Demo = () => (
  <PluginScope.Provider value="hello-world">
    {Object.entries(KINDS).map(([name, kind]) =>
      name === 'dialog' && confirmOnly ? null : (
        <section key={name} data-ex={name}>
          {DRAW[name]?.(defaultsOf(kind, lang), lang)}
        </section>
      )
    )}
    <PluginAdmin />
  </PluginScope.Provider>
)

void languageReady.then(() => {
  createRoot(document.getElementById('root')!).render(<Demo />)
  setTimeout(() => {
    const call = confirmOnly ? 'asktoconfirm' : 'toasts'
    AFTER[call]?.(defaultsOf(KINDS[call]!, lang), lang)
  }, 200)
})
