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
const confirmOnly = location.search.includes('confirm')

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>{children}</div>
)

const Fields = () => {
  const [on, setOn] = useState(true)
  return (
    <>
      <section data-ex="textfield">
        <TextField icon={Mail} aria-label="E-mail" placeholder="toi@exemple.be" />
      </section>
      <section data-ex="passwordfield">
        <PasswordField aria-label="Mot de passe" defaultValue="soleil" lead={<PasswordRing password="soleil" />} />
        <PasswordHint password="soleil" />
      </section>
      <section data-ex="pinfield">
        <PinField label="Code" value="482" onChange={no} length={6} align="start" />
      </section>
      <section data-ex="toggle">
        <Toggle checked={on} label="Saluer le matin" onChange={setOn} />
        <Toggle checked={false} label="Saluer le soir" onChange={no} />
      </section>
      <section data-ex="checkbox">
        <Checkbox checked onChange={no}>
          Garder mes salutations
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
            { value: 'morning', label: 'Matin' },
            { value: 'noon', label: 'Midi' },
            { value: 'evening', label: 'Soir' }
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
          Enregistrer
        </Button>
        <Button icon={Download}>Exporter</Button>
        <Button look="danger" icon={Trash2}>
          Supprimer
        </Button>
        <Button compact icon={Plus}>
          Ajouter
        </Button>
      </Row>
    </section>
    <section data-ex="roundbutton">
      <Row>
        <RoundButton icon={Pencil} label="Modifier" size={28} />
        <RoundButton icon={Pencil} label="Modifier" size={34} />
        <RoundButton icon={Pencil} label="Modifier" size={38} />
        <RoundButton icon={Pencil} label="Modifier" size={44} />
        <RoundButton icon={Trash2} label="Supprimer" size={38} variant="danger" />
      </Row>
    </section>
    <section data-ex="aibutton">
      <Row>
        <Button look="ai" icon={SparkleIcon}>
          Résumer
        </Button>
        <Button look="ai" icon={SparkleIcon} compact>
          Résumer
        </Button>
      </Row>
    </section>
    <section data-ex="readerbutton">
      <Row>
        <ReaderButton icon={<Flag size={12} />} onClick={no}>
          Signaler
        </ReaderButton>
        <ReaderButton icon={<Check size={12} />} onClick={no} done>
          Signalé
        </ReaderButton>
      </Row>
    </section>
    <section data-ex="sectionpage">
      <SectionPage title="Hello world" intro="Une salutation, chaque fois que tu ouvres Hodi." layout="desktop">
        <SettingsCard>
          <SettingRow label="Salutation" value="Salut" action={{ label: 'Changer', icon: Pencil }} />
        </SettingsCard>
      </SectionPage>
    </section>
    <section data-ex="settingscard">
      <SettingsCard label="Salutation">
        <SettingRow label="Texte" value="Salut" action={{ label: 'Changer', icon: Pencil }} />
        <SettingRow label="Notifications" hint="Un rappel le matin.">
          <Toggle checked label="Notifications" onChange={no} />
        </SettingRow>
      </SettingsCard>
    </section>
    <section data-ex="settingrow">
      <SettingsCard>
        <SettingRow label="Texte" value="Salut" action={{ label: 'Changer', icon: Pencil }} />
        <SettingRow
          label="Historique"
          hint="Les 30 derniers bonjours."
          action={[
            { label: 'Exporter', icon: Download },
            { label: 'Vider', icon: Trash2, look: 'danger' }
          ]}
        />
        <SettingRow
          label="Moment"
          hint="Quand dire bonjour."
          choice={
            <Segmented
              label="Moment"
              value="morning"
              options={[
                { value: 'morning', label: 'Matin' },
                { value: 'evening', label: 'Soir' }
              ]}
              onChange={no}
            />
          }
        />
      </SettingsCard>
    </section>
    <section data-ex="morerow">
      <SettingsCard>
        <SettingRow label="Anna" value="Salut !" />
        <SettingRow label="Bruno" value="Bonjour !" />
        <SettingRow label="Chloé" value="Hello !" />
        <MoreRow label="Voir les 4 autres" onClick={no} />
      </SettingsCard>
    </section>
    <section data-ex="overviewcard">
      <OverviewCard title="Bonjours" count={128} aside={<Chip tone="success">Actif</Chip>}>
        <p className="mono">34 aujourd'hui</p>
      </OverviewCard>
    </section>
    <section data-ex="steppage">
      <StepPage
        step={2}
        total={3}
        title="Ton prénom"
        intro="Hodi le met dans chaque salutation."
        onBack={no}
        actions={<Button look="primary">Continuer</Button>}
      >
        <TextField icon={Hand} aria-label="Prénom" placeholder="Anna" />
      </StepPage>
    </section>
    <section data-ex="setupstep">
      <StepPage
        step={4}
        total={6}
        title="Quel mot pour saluer ?"
        intro="Hello world le dit à chaque profil qui ouvre Hodi. Tu pourras le changer dans Serveur › Plugins."
        onBack={no}
        actions={<Button look="primary">Continuer</Button>}
      >
        <TextField icon={Hand} aria-label="Salutation" defaultValue="Salut" />
      </StepPage>
    </section>
    <section data-ex="tilespage">
      <TilesPage
        title="Quel foyer ?"
        intro="Choisis le foyer à ouvrir."
        tiles={[
          { key: 'a', label: 'Les Dupont', icon: House, onClick: no },
          { key: 'b', label: 'Mamie', onClick: no }
        ]}
        onBack={no}
      />
    </section>
    <section data-ex="setupactions">
      <SetupActions start={<Button>Plus tard</Button>}>
        <Button look="primary">Continuer</Button>
      </SetupActions>
    </section>
    <Fields />
    <section data-ex="dialog">
      <Dialog
        open={!confirmOnly}
        onClose={no}
        size="compact"
        title="Nouvelle salutation"
        intro="Elle remplace « Salut »."
      >
        <TextField icon={Hand} aria-label="Salutation" placeholder="Coucou" />
        <DialogActions>
          <Button>Annuler</Button>
          <Button look="primary">Enregistrer</Button>
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
      <StatusLine tone="info">Enregistré il y a 2 min.</StatusLine>
      <StatusLine tone="error">Le serveur n’a pas répondu.</StatusLine>
    </section>
    <section data-ex="notice">
      <Notice title="Nouvelle version" icon={Info} action={{ label: 'Voir', icon: ExternalLink, onClick: no }}>
        Hello world 0.2 dit bonjour en néerlandais.
      </Notice>
    </section>
    <section data-ex="emptystate">
      <EmptyState icon={<Inbox size={28} />} title="Aucun bonjour" compact>
        Les salutations du foyer arrivent ici.
      </EmptyState>
    </section>
    <section data-ex="chip">
      <Row>
        <Chip>EN</Chip>
        <Chip tone="success">Actif</Chip>
        <Chip tone="warning">Peu ouvert</Chip>
        <Chip tone="danger">Erreur</Chip>
        <Chip tone="accent">Cet appareil</Chip>
      </Row>
    </section>
    <section data-ex="filterchip">
      <Row>
        <FilterChip selected count={12} onClick={no}>
          Tout
        </FilterChip>
        <FilterChip selected={false} icon={Bell} onClick={no}>
          Matin
        </FilterChip>
        <FilterChip selected={false} onClick={no}>
          Soir
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
        <HouseholdAvatar name="Dupont" photo={null} size={44} />
        <HouseholdAvatar name="Mamie" photo={null} size={64} />
      </Row>
    </section>
  </PluginScope.Provider>
)

void languageReady.then(() => {
  createRoot(document.getElementById('root')!).render(<Demo />)
  setTimeout(() => {
    if (confirmOnly)
      askToConfirm({
        title: 'Vider l’historique ?',
        message: 'Les 30 derniers bonjours de ce foyer seront effacés.',
        label: 'Vider',
        onConfirm: no
      })
    showDone('Salutation enregistrée')
  }, 200)
})
void [Search, Sparkles]
