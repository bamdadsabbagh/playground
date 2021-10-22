import { STATE, STATE_ID } from '../constants'
import { setLocalStorage } from './set-local-storage'
import { getLocalStorage } from './get-local-storage'

export function initializeState () {
    if (window[STATE_ID]) return

    // storage?
    const storage = getLocalStorage ()
    if (storage) return window[STATE_ID] = storage

    // very first initialization
    window[STATE_ID] = STATE

    setLocalStorage (STATE)

    return STATE
}