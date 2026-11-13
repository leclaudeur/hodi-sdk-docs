import { Hand } from 'lucide-react'
import Button from '../src/ui/Button.tsx'
import ConfirmDialog from '../src/ui/ConfirmDialog.tsx'
import Dialog from '../src/ui/Dialog.tsx'
import DialogActions from '../src/ui/DialogActions.tsx'
import TextField from '../src/ui/TextField.tsx'
import Toaster from '../src/ui/Toaster.tsx'
import { askToConfirm } from '../src/lib/confirm.ts'
import { loadSonner } from '../src/lib/deferred.ts'
import { showDone, showError, showSaved } from '../src/lib/toast.ts'
import type { Lang, State } from './code.ts'
import { no, tr, type Draw } from './draw-buttons.tsx'

// What opens over the page: a dialog, the question before deleting, a toast. The last two are calls, not elements:
// their host is drawn, then AFTER makes the call.

const s = (state: State, key: string) => String(state[key] ?? '')

export const DRAW_MODALS: Record<string, Draw> = {
  dialog: (state, lang) => {
    const w = tr(lang)
    return (
      <Dialog
        open
        onClose={no}
        size={s(state, 'size') as 'compact'}
        title={s(state, 'title') || undefined}
        intro={s(state, 'intro') || undefined}
        onBack={state.back === true ? no : undefined}
      >
        <TextField icon={Hand} aria-label={w('Salutation', 'Greeting')} placeholder={w('Coucou', 'Hey')} />
        <DialogActions>
          <Button>{w('Annuler', 'Cancel')}</Button>
          <Button look="primary">{w('Enregistrer', 'Save')}</Button>
        </DialogActions>
      </Dialog>
    )
  },
  asktoconfirm: () => <ConfirmDialog />,
  toasts: () => <Toaster />
}

export const AFTER: Record<string, (state: State, lang: Lang) => void> = {
  asktoconfirm: state =>
    askToConfirm({
      title: s(state, 'title'),
      message: s(state, 'message'),
      label: s(state, 'label') || ' ',
      look: s(state, 'look') as 'danger',
      onConfirm: no
    }),
  toasts: state => {
    // One toast at a time: each change replaces the last one.
    void loadSonner().then(({ toast }) => {
      toast.dismiss()
      if (state.error === true) showError(s(state, 'message'))
      else if (state.saved === true) showSaved()
      else showDone(s(state, 'message'))
    })
  }
}
