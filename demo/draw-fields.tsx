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
import { no, tr, type Draw } from './draw-buttons.tsx'
import { momentsOf } from './kinds-fields.ts'

// Fields, messages and small elements drawn by Hodi's own components from a state.

const FIELD_ICONS = { Mail, Search, Hand } as const
const s = (state: Record<string, unknown>, key: string) => String(state[key] ?? '')

export const DRAW_FIELDS: Record<string, Draw> = {
  textfield: (state, lang) => (
    <TextField
      icon={FIELD_ICONS[s(state, 'icon') as keyof typeof FIELD_ICONS] ?? Mail}
      aria-label={s(state, 'label')}
      placeholder={s(state, 'placeholder')}
      defaultValue={state.clear === true ? tr(lang)('bonjour', 'hello') : undefined}
      onClear={state.clear === true ? no : undefined}
    />
  ),
  passwordfield: state => (
    <>
      <PasswordField
        aria-label={s(state, 'label')}
        value={s(state, 'password')}
        onChange={no}
        invalid={state.invalid === true}
        lead={state.ring === true ? <PasswordRing password={s(state, 'password')} /> : undefined}
      />
      <PasswordHint password={s(state, 'password')} />
    </>
  ),
  pinfield: state => (
    <PinField
      label={s(state, 'label')}
      value="482"
      onChange={no}
      length={Number(state.length)}
      state={s(state, 'state') as 'idle'}
      align={s(state, 'align') as 'start'}
      masked={state.masked === true}
      disabled={state.disabled === true}
    />
  ),
  toggle: state => (
    <Toggle
      checked={state.checked === true}
      label={s(state, 'label')}
      onChange={no}
      disabled={state.disabled === true}
    />
  ),
  checkbox: state => (
    <Checkbox checked={state.checked === true} onChange={no} disabled={state.disabled === true}>
      {s(state, 'label')}
    </Checkbox>
  ),
  agecheckbox: state => <AgeCheckbox checked={state.checked === true} onChange={no} />,
  segmented: (state, lang) => (
    <Segmented
      label={s(state, 'label')}
      value={s(state, 'value')}
      options={momentsOf(lang)}
      onChange={no}
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
  filterchip: state => (
    <FilterChip
      selected={state.selected === true}
      count={state.count === true ? 12 : undefined}
      icon={state.icon === true ? Bell : undefined}
      disabled={state.disabled === true}
      onClick={no}
    >
      {s(state, 'label') || ' '}
    </FilterChip>
  ),
  sourceavatar: state => (
    <SourceAvatar sourceId="" sourceName={s(state, 'name') || ' '} size={Number(state.size) as 44} />
  ),
  householdavatar: state => <HouseholdAvatar name={s(state, 'name') || ' '} photo={null} size={Number(state.size)} />
}
