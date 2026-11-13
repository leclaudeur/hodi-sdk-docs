import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import {
  Bell,
  Check,
  Download,
  Flag,
  Hand,
  House,
  Inbox,
  Mail,
  Pencil,
  Plus,
  Search,
  Trash2,
  Info,
  ExternalLink,
  Sparkles
} from 'lucide-react'
import { languageReady } from '../src/lib/i18n.ts'
import { PluginScope } from '../src/plugins/scope.ts'
import Button from '../src/ui/Button.tsx'
import RoundButton from '../src/ui/RoundButton.tsx'
import SparkleIcon from '../src/ui/SparkleIcon.tsx'
import ReaderButton from '../src/views/reader/ReaderButton.tsx'
import SectionPage from '../src/views/settings/SectionPage.tsx'
import SettingsCard from '../src/views/settings/SettingsCard.tsx'
import SettingRow from '../src/views/settings/SettingRow.tsx'
import MoreRow from '../src/ui/MoreRow.tsx'
import OverviewCard from '../src/plugins/OverviewCard.tsx'
import StepPage from '../src/plugins/StepPage.tsx'
import TilesPage from '../src/plugins/TilesPage.tsx'
import SetupActions from '../src/plugins/SetupActions.tsx'
import TextField from '../src/ui/TextField.tsx'
import PasswordField from '../src/ui/PasswordField.tsx'
import { PasswordHint, PasswordRing } from '../src/ui/PasswordGauge.tsx'
import PinField from '../src/ui/PinField.tsx'
import Toggle from '../src/ui/Toggle.tsx'
import Checkbox from '../src/ui/Checkbox.tsx'
import AgeCheckbox from '../src/plugins/AgeCheckbox.tsx'
import Segmented from '../src/ui/Segmented.tsx'
import Dialog from '../src/ui/Dialog.tsx'
import DialogActions from '../src/ui/DialogActions.tsx'
import ConfirmDialog from '../src/ui/ConfirmDialog.tsx'
import Toaster from '../src/ui/Toaster.tsx'
import { askToConfirm } from '../src/lib/confirm.ts'
import { showDone } from '../src/lib/toast.ts'
import StatusLine from '../src/ui/StatusLine.tsx'
import Notice from '../src/ui/Notice.tsx'
import EmptyState from '../src/ui/EmptyState.tsx'
import Chip from '../src/ui/Chip.tsx'
import FilterChip from '../src/ui/FilterChip.tsx'
import SourceAvatar from '../src/ui/SourceAvatar.tsx'
import HouseholdAvatar from '../src/ui/HouseholdAvatar.tsx'
import '../src/styles/index.ts'

const no = () => {}
// The capture draws each component twice: in French, then in English for the English pages.
const english = navigator.language.startsWith('en')
const w = (french: string, other: string) => (english ? other : french)
const confirmOnly = location.search.includes('confirm')

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>{children}</div>
)

const Fields = () => {
  const [on, setOn] = useState(true)
  return (
    <>
      <section data-ex="textfield">
        <TextField icon={Mail} aria-label="E-mail" placeholder={w('toi@exemple.be', 'you@example.com')} />
      </section>
      <section data-ex="passwordfield">
        <PasswordField
          aria-label={w('Mot de passe', 'Password')}
          defaultValue={w('soleil', 'sunshine')}
          lead={<PasswordRing password={w('soleil', 'sunshine')} />}
        />
        <PasswordHint password={w('soleil', 'sunshine')} />
      </section>
      <section data-ex="pinfield">
        <PinField label="Code" value="482" onChange={no} length={6} align="start" />
      </section>
      <section data-ex="toggle">
        <Toggle checked={on} label={w('Saluer le matin', 'Say hello in the morning')} onChange={setOn} />
        <Toggle checked={false} label={w('Saluer le soir', 'Say hello in the evening')} onChange={no} />
      </section>
      <section data-ex="checkbox">
        <Checkbox checked onChange={no}>
          {w('Garder mes salutations', 'Keep my greetings')}
        </Checkbox>
      </section>
      <section data-ex="agecheckbox">
        <AgeCheckbox checked={false} onChange={no} />
      </section>
      <section data-ex="segmented">
        <Segmented
          label="Moment"
          value="morning"
          options={[
            { value: 'morning', label: w('Matin', 'Morning') },
            { value: 'noon', label: w('Midi', 'Noon') },
            { value: 'evening', label: w('Soir', 'Evening') }
          ]}
          onChange={no}
        />
      </section>
    </>
  )
}

const Demo = () => (
  <PluginScope.Provider value="hello-world">
    <section data-ex="button">
      <Row>
        <Button look="primary" icon={Check}>
          {w('Enregistrer', 'Save')}
        </Button>
        <Button icon={Download}>{w('Exporter', 'Export')}</Button>
        <Button look="danger" icon={Trash2}>
          {w('Supprimer', 'Delete')}
        </Button>
        <Button compact icon={Plus}>
          {w('Ajouter', 'Add')}
        </Button>
      </Row>
    </section>
    <section data-ex="roundbutton">
      <Row>
        <RoundButton icon={Pencil} label={w('Modifier', 'Edit')} size={28} />
        <RoundButton icon={Pencil} label={w('Modifier', 'Edit')} size={34} />
        <RoundButton icon={Pencil} label={w('Modifier', 'Edit')} size={38} />
        <RoundButton icon={Pencil} label={w('Modifier', 'Edit')} size={44} />
        <RoundButton icon={Trash2} label={w('Supprimer', 'Delete')} size={38} variant="danger" />
      </Row>
    </section>
    <section data-ex="aibutton">
      <Row>
        <Button look="ai" icon={SparkleIcon}>
          {w('Résumer', 'Summarise')}
        </Button>
        <Button look="ai" icon={SparkleIcon} compact>
          {w('Résumer', 'Summarise')}
        </Button>
      </Row>
    </section>
    <section data-ex="readerbutton">
      <Row>
        <ReaderButton icon={<Flag size={12} />} onClick={no}>
          {w('Signaler', 'Report')}
        </ReaderButton>
        <ReaderButton icon={<Check size={12} />} onClick={no} done>
          {w('Signalé', 'Reported')}
        </ReaderButton>
      </Row>
    </section>
    <section data-ex="sectionpage">
      <SectionPage
        title="Hello world"
        intro={w('Une salutation, chaque fois que tu ouvres Hodi.', 'A greeting, every time you open Hodi.')}
        layout="desktop"
      >
        <SettingsCard>
          <SettingRow
            label={w('Salutation', 'Greeting')}
            value={w('Salut', 'Hi')}
            action={{ label: w('Changer', 'Change'), icon: Pencil }}
          />
        </SettingsCard>
      </SectionPage>
    </section>
    <section data-ex="settingscard">
      <SettingsCard label={w('Salutation', 'Greeting')}>
        <SettingRow
          label={w('Texte', 'Text')}
          value={w('Salut', 'Hi')}
          action={{ label: w('Changer', 'Change'), icon: Pencil }}
        />
        <SettingRow label="Notifications" hint={w('Un rappel le matin.', 'A reminder in the morning.')}>
          <Toggle checked label="Notifications" onChange={no} />
        </SettingRow>
      </SettingsCard>
    </section>
    <section data-ex="settingrow">
      <SettingsCard>
        <SettingRow
          label={w('Texte', 'Text')}
          value={w('Salut', 'Hi')}
          action={{ label: w('Changer', 'Change'), icon: Pencil }}
        />
        <SettingRow
          label={w('Historique', 'History')}
          hint={w('Les 30 derniers bonjours.', 'The last 30 hellos.')}
          action={[
            { label: w('Exporter', 'Export'), icon: Download },
            { label: w('Vider', 'Clear'), icon: Trash2, look: 'danger' }
          ]}
        />
        <SettingRow
          label="Moment"
          hint={w('Quand dire bonjour.', 'When to say hello.')}
          choice={
            <Segmented
              label="Moment"
              value="morning"
              options={[
                { value: 'morning', label: w('Matin', 'Morning') },
                { value: 'evening', label: w('Soir', 'Evening') }
              ]}
              onChange={no}
            />
          }
        />
      </SettingsCard>
    </section>
    <section data-ex="morerow">
      <SettingsCard>
        <SettingRow label="Anna" value={w('Salut !', 'Hi!')} />
        <SettingRow label="Bruno" value={w('Bonjour !', 'Hello!')} />
        <SettingRow label="Chloé" value={w('Hello !', 'Hey!')} />
        <MoreRow label={w('Voir les 4 autres', 'See the 4 others')} onClick={no} />
      </SettingsCard>
    </section>
    <section data-ex="overviewcard">
      <OverviewCard
        title={w('Bonjours', 'Hellos')}
        count={128}
        aside={<Chip tone="success">{w('Actif', 'Active')}</Chip>}
      >
        <p className="mono">{w("34 aujourd'hui", '34 today')}</p>
      </OverviewCard>
    </section>
    <section data-ex="steppage">
      <StepPage
        step={2}
        total={3}
        title={w('Ton prénom', 'Your first name')}
        intro={w('Hodi le met dans chaque salutation.', 'Hodi puts it in every greeting.')}
        onBack={no}
        actions={<Button look="primary">{w('Continuer', 'Continue')}</Button>}
      >
        <TextField icon={Hand} aria-label={w('Prénom', 'First name')} placeholder="Anna" />
      </StepPage>
    </section>
    <section data-ex="setupstep">
      <StepPage
        step={4}
        total={6}
        title={w('Quel mot pour saluer ?', 'Which word to greet with?')}
        intro={w(
          'Hello world le dit à chaque profil qui ouvre Hodi. Tu pourras le changer dans Serveur › Plugins.',
          'Hello world says it to every profile that opens Hodi. You can change it in Server › Plugins.'
        )}
        onBack={no}
        actions={<Button look="primary">{w('Continuer', 'Continue')}</Button>}
      >
        <TextField icon={Hand} aria-label={w('Salutation', 'Greeting')} defaultValue={w('Salut', 'Hi')} />
      </StepPage>
    </section>
    <section data-ex="tilespage">
      <TilesPage
        title={w('Quel foyer ?', 'Which household?')}
        intro={w('Choisis le foyer à ouvrir.', 'Pick the household to open.')}
        tiles={[
          { key: 'a', label: w('Les Dupont', 'The Smiths'), icon: House, onClick: no },
          { key: 'b', label: w('Mamie', 'Grandma'), onClick: no }
        ]}
        onBack={no}
      />
    </section>
    <section data-ex="setupactions">
      <SetupActions start={<Button>{w('Plus tard', 'Later')}</Button>}>
        <Button look="primary">{w('Continuer', 'Continue')}</Button>
      </SetupActions>
    </section>
    <Fields />
    <section data-ex="dialog">
      <Dialog
        open={!confirmOnly}
        onClose={no}
        size="compact"
        title={w('Nouvelle salutation', 'New greeting')}
        intro={w('Elle remplace « Salut ».', 'It replaces "Hi".')}
      >
        <TextField icon={Hand} aria-label={w('Salutation', 'Greeting')} placeholder={w('Coucou', 'Hey')} />
        <DialogActions>
          <Button>{w('Annuler', 'Cancel')}</Button>
          <Button look="primary">{w('Enregistrer', 'Save')}</Button>
        </DialogActions>
      </Dialog>
    </section>
    <section data-ex="asktoconfirm">
      <ConfirmDialog />
    </section>
    <section data-ex="toasts">
      <Toaster />
    </section>
    <section data-ex="statusline">
      <StatusLine tone="info">{w('Enregistré il y a 2 min.', 'Saved 2 min ago.')}</StatusLine>
      <StatusLine tone="error">{w('Le serveur n’a pas répondu.', 'The server did not answer.')}</StatusLine>
    </section>
    <section data-ex="notice">
      <Notice
        title={w('Nouvelle version', 'New version')}
        icon={Info}
        action={{ label: w('Voir', 'See'), icon: ExternalLink, onClick: no }}
      >
        {w('Hello world 0.2 dit bonjour en néerlandais.', 'Hello world 0.2 says hello in Dutch.')}
      </Notice>
    </section>
    <section data-ex="emptystate">
      <EmptyState icon={<Inbox size={28} />} title={w('Aucun bonjour', 'No hellos')} compact>
        {w('Les salutations du foyer arrivent ici.', 'The household’s greetings arrive here.')}
      </EmptyState>
    </section>
    <section data-ex="chip">
      <Row>
        <Chip>EN</Chip>
        <Chip tone="success">{w('Actif', 'Active')}</Chip>
        <Chip tone="warning">{w('Peu ouvert', 'Rarely opened')}</Chip>
        <Chip tone="danger">{w('Erreur', 'Error')}</Chip>
        <Chip tone="accent">{w('Cet appareil', 'This device')}</Chip>
      </Row>
    </section>
    <section data-ex="filterchip">
      <Row>
        <FilterChip selected count={12} onClick={no}>
          {w('Tout', 'All')}
        </FilterChip>
        <FilterChip selected={false} icon={Bell} onClick={no}>
          {w('Matin', 'Morning')}
        </FilterChip>
        <FilterChip selected={false} onClick={no}>
          {w('Soir', 'Evening')}
        </FilterChip>
      </Row>
    </section>
    <section data-ex="sourceavatar">
      <Row>
        <SourceAvatar sourceId="" sourceName="Le Monde" size={26} />
        <SourceAvatar sourceId="" sourceName="The Verge" size={44} />
      </Row>
    </section>
    <section data-ex="householdavatar">
      <Row>
        <HouseholdAvatar name={w('Dupont', 'Smith')} photo={null} size={44} />
        <HouseholdAvatar name={w('Mamie', 'Grandma')} photo={null} size={64} />
      </Row>
    </section>
  </PluginScope.Provider>
)

void languageReady.then(() => {
  createRoot(document.getElementById('root')!).render(<Demo />)
  setTimeout(() => {
    if (confirmOnly)
      askToConfirm({
        title: w('Vider l’historique ?', 'Clear the history?'),
        message: w(
          'Les 30 derniers bonjours de ce foyer seront effacés.',
          'The last 30 hellos of this household will be deleted.'
        ),
        label: w('Vider', 'Clear'),
        onConfirm: no
      })
    showDone(w('Salutation enregistrée', 'Greeting saved'))
  }, 200)
})
void [Search, Sparkles]
