import { aibutton, button, readerbutton, roundbutton, sectionpage, settingscard } from './kinds-buttons.ts'
import { agecheckbox, checkbox, passwordfield, pinfield, segmented, textfield, toggleKind } from './kinds-fields.ts'
import { asktoconfirm, dialog, emptystate, notice, statusline, toasts } from './kinds-messages.ts'
import { morerow, overviewcard, settingrow, setupactions, steppage, tilespage } from './kinds-pages.ts'
import { chip, filterchip, householdavatar, sourceavatar } from './kinds-small.ts'
import type { Kind } from './controls.ts'

// Every component of hodi:sdk that the docs draw, by the name of its render: one render, its code and its controls.
export const KINDS: Record<string, Kind> = {
  button,
  roundbutton,
  aibutton,
  readerbutton,
  sectionpage,
  settingscard,
  settingrow,
  morerow,
  overviewcard,
  steppage,
  tilespage,
  setupactions,
  textfield,
  passwordfield,
  pinfield,
  toggle: toggleKind,
  checkbox,
  agecheckbox,
  segmented,
  dialog,
  asktoconfirm,
  toasts,
  statusline,
  notice,
  emptystate,
  chip,
  filterchip,
  sourceavatar,
  householdavatar
}
