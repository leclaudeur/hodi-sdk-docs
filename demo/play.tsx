import { createRoot, type Root } from 'react-dom/client'
import { ArrowRight, Check, Download, Hand, Pencil, Plus, Trash2 } from 'lucide-react'
import Button from '../src/ui/Button.tsx'
import SparkleIcon from '../src/ui/SparkleIcon.tsx'
import StepPage from '../src/plugins/StepPage.tsx'
import TextField from '../src/ui/TextField.tsx'
import Toggle from '../src/ui/Toggle.tsx'
import '../src/styles/index.ts'

// The real Button, drawn again each time a control of the docs' playground changes.
const ICONS = { none: undefined, Check, Download, Pencil, Plus, Trash2, SparkleIcon } as const
type Props = {
  label: string
  look: 'neutral' | 'primary' | 'danger' | 'ai'
  icon: keyof typeof ICONS
  compact: boolean
  busy: boolean
  wide: boolean
  disabled: boolean
}

const roots = new WeakMap<Element, Root>()
const button = (el: Element, p: Props) => {
  let root = roots.get(el)
  if (!root) roots.set(el, (root = createRoot(el)))
  root.render(
    <Button look={p.look} icon={ICONS[p.icon]} compact={p.compact} busy={p.busy} wide={p.wide} disabled={p.disabled}>
      {p.label || ' '}
    </Button>
  )
}

type StepProps = {
  title: string
  intro: string
  progress: boolean
  back: boolean
  later: boolean
  body: 'none' | 'field' | 'toggle'
}
const noop = () => {}
// The docs page's language: the sample words match the page around the playground.
const w = (french: string, other: string) => (document.documentElement.lang === 'en' ? other : french)
const stepPage = (el: Element, p: StepProps) => {
  let root = roots.get(el)
  if (!root) roots.set(el, (root = createRoot(el)))
  root.render(
    <StepPage
      step={p.progress ? 2 : undefined}
      total={p.progress ? 3 : undefined}
      title={p.title || ' '}
      intro={p.intro}
      onBack={p.back ? noop : undefined}
      start={p.later ? <Button>{w('Plus tard', 'Later')}</Button> : undefined}
      actions={
        <Button look="primary">
          {w('Continuer', 'Continue')}
          <ArrowRight size={16} aria-hidden="true" />
        </Button>
      }
    >
      {p.body === 'field' && <TextField icon={Hand} aria-label={w('Prénom', 'First name')} placeholder="Anna" />}
      {p.body === 'toggle' && (
        <Toggle checked label={w('Saluer le matin', 'Say hello in the morning')} onChange={noop} />
      )}
    </StepPage>
  )
}

;(window as unknown as { HodiPlay: unknown }).HodiPlay = { button, stepPage }
