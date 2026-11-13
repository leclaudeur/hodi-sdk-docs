import { DRAW_BUTTONS, type Draw } from './draw-buttons.tsx'
import { DRAW_FIELDS } from './draw-fields.tsx'
import { DRAW_MODALS } from './draw-modals.tsx'

// Every component the docs draw, by the name of its render.
export const DRAW: Record<string, Draw> = { ...DRAW_BUTTONS, ...DRAW_FIELDS, ...DRAW_MODALS }
