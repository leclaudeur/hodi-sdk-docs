import { Bell, ExternalLink, Hand, Inbox, Info, Mail, Search } from 'lucide-react'
import Button from '../src/ui/Button.tsx'
import Checkbox from '../src/ui/Checkbox.tsx'
import ChoiceField from '../src/ui/ChoiceField.tsx'
import Chip from '../src/ui/Chip.tsx'
import EmptyState from '../src/ui/EmptyState.tsx'
import FilterChip from '../src/ui/FilterChip.tsx'
import Notice from '../src/ui/Notice.tsx'
import PasswordField from '../src/ui/PasswordField.tsx'
import { PasswordHint, PasswordRing } from '../src/ui/PasswordGauge.tsx'
import PinField from '../src/ui/PinField.tsx'
import Segmented from '../src/ui/Segmented.tsx'
import SourceAvatar from '../src/ui/SourceAvatar.tsx'
import Stepper from '../src/ui/Stepper.tsx'
import StatusLine from '../src/ui/StatusLine.tsx'
import TextField from '../src/ui/TextField.tsx'
import Toggle from '../src/ui/Toggle.tsx'
import AgeCheckbox from '../src/plugins/AgeCheckbox.tsx'
import fieldStyles from '../src/views/household/Household.module.css'
import { no, tr, type Draw } from './draw-buttons.tsx'
import { FIELD_ERRORS, issuesOf, momentsOf } from './kinds-fields.ts'

// Fields, messages and small elements drawn by Hodi's own components from a state.

const FIELD_ICONS = { Mail, Search, Hand } as const
const s = (state: Record<string, unknown>, key: string) => String(state[key] ?? '')

export const DRAW_FIELDS: Record<string, Draw> = {
  // A refused field takes the danger colours, and the line saying why goes under it.
  textfield: (state, lang, set) => (
    <div className={fieldStyles.field}>
      <TextField
        icon={FIELD_ICONS[s(state, 'icon') as keyof typeof FIELD_ICONS] ?? Mail}
        aria-label={s(state, 'label')}
        placeholder={s(state, 'placeholder')}
        value={String(state.email ?? (state.clear === true ? tr(lang)('bonjour', 'hello') : ''))}
        onChange={event => set?.('email', event.target.value)}
        onClear={state.clear === true ? () => set?.('email', '') : undefined}
        aria-invalid={state.invalid === true}
      />
      {state.invalid === true && <StatusLine tone="error">{FIELD_ERRORS.email[lang]}</StatusLine>}
    </div>
  ),
  // The field and its hint as Hodi lays them out where an account picks its password (NewPasswordFields).
  passwordfield: (state, lang, set) => (
    <div className={fieldStyles.field}>
      <PasswordField
        aria-label={s(state, 'label')}
        value={s(state, 'password')}
        onChange={event => set?.('password', event.target.value)}
        invalid={state.invalid === true}
        lead={state.ring === true ? <PasswordRing password={s(state, 'password')} /> : undefined}
      />
      {state.invalid === true ? (
        <StatusLine tone="error">{FIELD_ERRORS.password[lang]}</StatusLine>
      ) : (
        <PasswordHint password={s(state, 'password')} />
      )}
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
  // Under a field, the check lines up with the field's icon: the render shows the field it sits under.
  checkbox: (state, lang, set) => {
    const box = (
      <Checkbox
        checked={state.checked === true}
        onChange={checked => set?.('checked', checked)}
        disabled={state.disabled === true}
        underField={state.under === true}
      >
        {s(state, 'label')}
      </Checkbox>
    )
    if (state.under !== true) return box
    return (
      <div className={fieldStyles.field}>
        <TextField icon={Mail} aria-label="E-mail" placeholder={tr(lang)('toi@exemple.be', 'you@example.com')} />
        {box}
      </div>
    )
  },
  choicefield: (state, lang, set) => (
    <ChoiceField
      choices={issuesOf(lang)}
      selected={String(state.picked ?? 'cut')
        .split(',')
        .filter(Boolean)}
      onChange={ids => set?.('picked', ids.join(','))}
      label={s(state, 'label')}
      placeholder={s(state, 'placeholder')}
      morePlaceholder={s(state, 'more') || undefined}
      disabled={state.disabled === true}
    />
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
  stepper: (state, lang, set) => {
    const days = Number(state.count ?? 7)
    return (
      <Stepper
        label={s(state, 'label')}
        lessLabel={tr(lang)('Un jour de moins', 'One day fewer')}
        moreLabel={tr(lang)('Un jour de plus', 'One day more')}
        value={days}
        min={1}
        max={365}
        step={1}
        fastSteps={[7, 30]}
        editable={state.editable === true}
        onChange={value => set?.('count', String(value))}
      >
        {tr(lang)(`${days} jours`, `${days} days`)}
      </Stepper>
    )
  },
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
  )
}
