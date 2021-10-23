import { INITIAL_STATE, STATE_ID } from '../constants'
import { setLocalStorage } from './set-local-storage'
import { getLocalStorage } from './get-local-storage'

/**
 * @description initialize global state object
 */
export function initializeState (): void {
    if (window[STATE_ID]) return

    // if storage, then apply it and return
    const storage = getLocalStorage ()
    if (storage) {
        window[STATE_ID] = storage
        return
    }

    // very first initialization
    window[STATE_ID] = {...INITIAL_STATE}
    setLocalStorage (window[STATE_ID])
    return
}