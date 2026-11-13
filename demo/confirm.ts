import { useSyncExternalStore } from 'react'
import type { Confirmation } from '../src/lib/confirm.ts'

// Hodi's question before deleting, for the docs' renders: the same store, but its buttons never close it, so the
// render keeps showing the question after a click.

export type { Confirmation, Proof } from '../src/lib/confirm.ts'

let current: Confirmation | null = null
const listeners = new Set<() => void>()

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const askToConfirm = (confirmation: Confirmation) => {
  current = confirmation
  listeners.forEach(listener => listener())
}

export const closeConfirmation = () => {}

export const cancelConfirmation = () => {}

export const useConfirmation = () => useSyncExternalStore(subscribe, () => current)
