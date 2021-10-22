import { INITIAL_STATE, STATE_ID } from '../constants'
import { setLocalStorage } from './set-local-storage'
import { getLocalStorage } from './get-local-storage'
import { State } from '../types'

/**
 * @description initialize global state object
 */
export function initializeState (): State {
    if (window[STATE_ID]) return

    // storage?
    const storage = getLocalStorage ()
    if (storage) return window[STATE_ID] = storage

    // very first initialization
    window[STATE_ID] = INITIAL_STATE
    setLocalStorage (INITIAL_STATE)
    return INITIAL_STATE
}