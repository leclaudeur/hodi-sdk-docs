import type { ReactNode } from 'react'
import { ArrowRight, Bookmark, Check, Download, Flag, Hand, House, Pencil, Plus, Trash2 } from 'lucide-react'
import Button from '../src/ui/Button.tsx'
import Chip from '../src/ui/Chip.tsx'
import MoreRow from '../src/ui/MoreRow.tsx'
import RoundButton from '../src/ui/RoundButton.tsx'
import Segmented from '../src/ui/Segmented.tsx'
import SparkleIcon from '../src/ui/SparkleIcon.tsx'
import TextField from '../src/ui/TextField.tsx'
import Toggle from '../src/ui/Toggle.tsx'
import ReaderButton from '../src/views/reader/ReaderButton.tsx'
import SectionPage from '../src/views/settings/SectionPage.tsx'
import SettingsCard from '../src/views/settings/SettingsCard.tsx'
import SettingRow from '../src/views/settings/SettingRow.tsx'
import OverviewCard from '../src/plugins/OverviewCard.tsx'
import StepPage from '../src/plugins/StepPage.tsx'
import TilesPage from '../src/plugins/TilesPage.tsx'
import SetupActions from '../src/plugins/SetupActions.tsx'
import type { Lang, State } from './code.ts'
import { momentsOf } from './kinds-fields.ts'
import WeekChart from './week-chart.tsx'

// Buttons, settings and step pages drawn by Hodi's own components from a state: the docs' render, then the
// playground at each change.

// In the playground, a click in the component changes the state as a control would: set keeps both in step.
export type Set = (key: string, value: unknown) => void
export type Draw = (state: State, lang: Lang, set?: Set) => ReactNode
export const no = () => {}
export const tr = (lang: Lang) => (fr: string, en: string) => (lang === 'en' ? en : fr)
const ICONS = { Check, Download, Trash2, Plus, Pencil, Bookmark, Flag } as const
const iconOf = (name: unknown) => ICONS[name as keyof typeof ICONS]
const s = (state: State, key: string) => String(state[key] ?? '')

const changeRow = (lang: Lang, label: string) => (
  <SettingRow
    label={label}
    value={tr(lang)('Salut', 'Hi')}
    action={{ label: tr(lang)('Changer', 'Change'), icon: Pencil, onClick: no }}
  />
)

const rowAction = (state: State, lang: Lang) => {
  const w = tr(lang)
  if (state.action === 'one') return { label: w('Changer', 'Change'), icon: Pencil, onClick: no }
  if (state.action === 'two')
    return [
      { label: w('Exporter', 'Export'), icon: Download, onClick: no },
      { label: w('Vider', 'Clear'), icon: Trash2, look: 'danger' as const, onClick: no }
    ]
  return undefined
}

const settingRow: Draw = (state, lang, set) => (
  <SettingsCard>
    <SettingRow
      label={s(state, 'label')}
      value={s(state, 'value') || undefined}
      hint={s(state, 'hint') || undefined}
      action={rowAction(state, lang)}
      choice={
        state.choice === true ? (
          <Segmented
            label="Moment"
            value={String(state.moment ?? 'morning')}
            options={momentsOf(lang)}
            onChange={value => set?.('moment', value)}
          />
        ) : undefined
      }
    >
      {state.toggle === true && (
        <Toggle checked={state.on !== false} label={s(state, 'label')} onChange={on => set?.('on', on)} />
      )}
    </SettingRow>
  </SettingsCard>
)

const stepPage: Draw = (state, lang, set) => {
  const w = tr(lang)
  return (
    <StepPage
      step={state.progress === true ? 2 : undefined}
      total={state.progress === true ? 3 : undefined}
      title={s(state, 'title') || ' '}
      intro={s(state, 'intro')}
      onBack={state.back === true ? no : undefined}
      start={state.later === true ? <Button>{w('Plus tard', 'Later')}</Button> : undefined}
      actions={
        <Button look="primary">
          {w('Continuer', 'Continue')}
          <ArrowRight size={16} aria-hidden="true" />
        </Button>
      }
    >
      {state.body === 'field' && <TextField icon={Hand} aria-label={w('Prénom', 'First name')} placeholder="Anna" />}
      {state.body === 'toggle' && (
        <Toggle
          checked={state.on !== false}
          label={w('Saluer le matin', 'Say hello in the morning')}
          onChange={on => set?.('on', on)}
        />
      )}
    </StepPage>
  )
}

export const DRAW_BUTTONS: Record<string, Draw> = {
  button: state => (
    <Button
      look={s(state, 'look') as 'primary'}
      icon={iconOf(state.icon)}
      compact={state.compact === true}
      busy={state.busy === true}
      wide={state.wide === true}
    >
      {s(state, 'label') || ' '}
    </Button>
  ),
  roundbutton: state => (
    <RoundButton
      icon={iconOf(state.icon) ?? Pencil}
      label={s(state, 'label')}
      size={Number(state.size) as 44}
      variant={s(state, 'variant') as 'default'}
      filled={state.filled === true}
    />
  ),
  aibutton: state => (
    <Button
      look="ai"
      icon={SparkleIcon}
      compact={state.compact === true}
      wide={state.wide === true}
      disabled={state.disabled === true}
    >
      {s(state, 'label') || ' '}
    </Button>
  ),
  readerbutton: (state, _lang, set) => {
    const Icon = iconOf(state.icon)
    return (
      <ReaderButton
        icon={Icon ? <Icon size={12} /> : undefined}
        onClick={() => set?.('done', state.done !== true)}
        done={state.done === true}
      >
        {s(state, 'label') || ' '}
      </ReaderButton>
    )
  },
  sectionpage: (state, lang) => (
    <SectionPage
      title={s(state, 'title')}
      intro={s(state, 'intro') || undefined}
      layout={s(state, 'layout') as 'desktop'}
      aside={state.aside === true ? <Chip tone="success">{tr(lang)('Actif', 'Active')}</Chip> : undefined}
    >
      <SettingsCard>{changeRow(lang, tr(lang)('Salutation', 'Greeting'))}</SettingsCard>
    </SectionPage>
  ),
  settingscard: (state, lang) => (
    <SettingsCard label={s(state, 'label') || undefined}>{changeRow(lang, tr(lang)('Texte', 'Text'))}</SettingsCard>
  ),
  settingrow: settingRow,
  morerow: (state, lang) => (
    <SettingsCard>
      <SettingRow label="Anna" value={tr(lang)('Salut !', 'Hi!')} />
      <MoreRow label={s(state, 'label')} onClick={no} />
    </SettingsCard>
  ),
  overviewcard: (state, lang) => (
    <OverviewCard
      title={s(state, 'title')}
      count={state.count === true ? 128 : undefined}
      aside={
        state.aside === true ? <Chip tone="success">{tr(lang)('+12 cette semaine', '+12 this week')}</Chip> : undefined
      }
    >
      {state.chart === true && <WeekChart lang={lang} />}
    </OverviewCard>
  ),
  steppage: stepPage,
  tilespage: (state, lang) => (
    <TilesPage
      title={s(state, 'title')}
      intro={s(state, 'intro') || undefined}
      tiles={[
        { key: 'a', label: tr(lang)('Les Dupont', 'The Smiths'), icon: House, onClick: no },
        { key: 'b', label: tr(lang)('Mamie', 'Grandma'), onClick: no }
      ]}
      opening={state.opening === true ? 'a' : null}
      error={state.error === true ? tr(lang)('Ce foyer ne répond pas.', 'This household does not answer.') : null}
      onBack={state.back === true ? no : undefined}
    />
  ),
  setupactions: (state, lang) => (
    <SetupActions start={state.later === true ? <Button>{tr(lang)('Plus tard', 'Later')}</Button> : undefined}>
      <Button look="primary">{s(state, 'label') || ' '}</Button>
    </SetupActions>
  )
}
