// The playground's stand-in for Hodi's lib/dialog-stack.ts: each render's dialog is alone in its window, never
// covered by the one of another render, nor drawn as going back to it.

export const openLayer = (_layer: { id: string; close: () => void; raise: () => void }) => {}

export const closeLayer = (_id: string) => {}

export const raiseAbove = (_id: string) => {}

export const closeAllLayers = () => {}

export const useLayer = (_id: string) => ({ covered: false, hasPrevious: false })
