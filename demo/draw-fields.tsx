import { Bell, ExternalLink, Hand, Inbox, Info, Mail, Search } from 'lucide-react'
import Button from '../src/ui/Button.tsx'
import Checkbox from '../src/ui/Checkbox.tsx'
import Chip from '../src/ui/Chip.tsx'
import EmptyState from '../src/ui/EmptyState.tsx'
import FilterChip from '../src/ui/FilterChip.tsx'
import HouseholdAvatar from '../src/ui/HouseholdAvatar.tsx'
import Notice from '../src/ui/Notice.tsx'
import PasswordField from '../src/ui/PasswordField.tsx'
import { PasswordHint, PasswordRing } from '../src/ui/PasswordGauge.tsx'
import PinField from '../src/ui/PinField.tsx'
import Segmented from '../src/ui/Segmented.tsx'
import SourceAvatar from '../src/ui/SourceAvatar.tsx'
import StatusLine from '../src/ui/StatusLine.tsx'
import TextField from '../src/ui/TextField.tsx'
import Toggle from '../src/ui/Toggle.tsx'
import AgeCheckbox from '../src/plugins/AgeCheckbox.tsx'
import householdStyles from '../src/views/household/Household.module.css'
import { no, tr, type Draw } from './draw-buttons.tsx'
import { momentsOf } from './kinds-fields.ts'

// Fields, messages and small elements drawn by Hodi's own components from a state.

const FIELD_ICONS = { Mail, Search, Hand } as const
const s = (state: Record<string, unknown>, key: string) => String(state[key] ?? '')

export const DRAW_FIELDS: Record<string, Draw> = {
  textfield: (state, lang, set) => (
    <TextField
      icon={FIELD_ICONS[s(state, 'icon') as keyof typeof FIELD_ICONS] ?? Mail}
      aria-label={s(state, 'label')}
      placeholder={s(state, 'placeholder')}
      value={String(state.email ?? (state.clear === true ? tr(lang)('bonjour', 'hello') : ''))}
      onChange={event => set?.('email', event.target.value)}
      onClear={state.clear === true ? () => set?.('email', '') : undefined}
    />
  ),
  // The field and its hint as Hodi lays them out where an account picks its password (NewPasswordFields).
  passwordfield: (state, _lang, set) => (
    <div className={householdStyles.field}>
      <PasswordField
        aria-label={s(state, 'label')}
        value={s(state, 'password')}
        onChange={event => set?.('password', event.target.value)}
        invalid={state.invalid === true}
        lead={state.ring === true ? <PasswordRing password={s(state, 'password')} /> : undefined}
      />
      <PasswordHint password={s(state, 'password')} />
    </div>
  ),
  pinfield: (state, _lang, set) => (
    <PinField
      label={s(state, 'label')}
      value={String(state.code ?? '482')}
      onChange={code => set?.('code', code)}
      length={Number(state.length)}
      state={s(state, 'state') as 'idle'}
      align={s(state, 'align') as 'start'}
      masked={state.masked === true}
      disabled={state.disabled === true}
    />
  ),
  toggle: (state, _lang, set) => (
    <Toggle
      checked={state.checked === true}
      label={s(state, 'label')}
      onChange={checked => set?.('checked', checked)}
      disabled={state.disabled === true}
    />
  ),
  checkbox: (state, _lang, set) => (
    <Checkbox
      checked={state.checked === true}
      onChange={checked => set?.('checked', checked)}
      disabled={state.disabled === true}
    >
      {s(state, 'label')}
    </Checkbox>
  ),
  agecheckbox: (state, _lang, set) => (
    <AgeCheckbox checked={state.checked === true} onChange={checked => set?.('checked', checked)} />
  ),
  segmented: (state, lang, set) => (
    <Segmented
      label={s(state, 'label')}
      value={s(state, 'value')}
      options={momentsOf(lang)}
      onChange={value => set?.('value', value)}
      wide={state.wide === true}
    />
  ),
  statusline: state => <StatusLine tone={s(state, 'tone') as 'info'}>{s(state, 'message')}</StatusLine>,
  notice: (state, lang) => (
    <Notice
      title={s(state, 'title')}
      icon={Info}
      tone={s(state, 'tone') as 'info'}
      action={state.action === true ? { label: tr(lang)('Voir', 'See'), icon: ExternalLink, onClick: no } : undefined}
    >
      {s(state, 'body')}
    </Notice>
  ),
  emptystate: (state, lang) => (
    <EmptyState
      icon={<Inbox size={28} />}
      title={s(state, 'title')}
      tone={s(state, 'tone') as 'default'}
      compact={state.compact === true}
      actions={state.actions === true ? <Button>{tr(lang)('Ajouter', 'Add')}</Button> : undefined}
    >
      {s(state, 'body') || undefined}
    </EmptyState>
  ),
  chip: state => (
    <Chip
      tone={state.tone === 'none' ? undefined : (s(state, 'tone') as 'success')}
      size={s(state, 'size') as 'capsule'}
    >
      {s(state, 'label') || ' '}
    </Chip>
  ),
  filterchip: (state, _lang, set) => (
    <FilterChip
      selected={state.selected === true}
      count={state.count === true ? 12 : undefined}
      icon={state.icon === true ? Bell : undefined}
      disabled={state.disabled === true}
      onClick={() => set?.('selected', state.selected !== true)}
    >
      {s(state, 'label') || ' '}
    </FilterChip>
  ),
  sourceavatar: state => (
    <SourceAvatar sourceId="" sourceName={s(state, 'name') || ' '} size={Number(state.size) as 44} />
  ),
  householdavatar: state => <HouseholdAvatar name={s(state, 'name') || ' '} photo={null} size={Number(state.size)} />
}
