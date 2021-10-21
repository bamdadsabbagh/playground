import { STATE, STATE_ID } from '../constants'
import { setStorage } from './set-storage'
import { getStorage } from './get-storage'

export function initializeState () {
    if (window[STATE_ID]) return

    // storage?
    const storage = getStorage ()
    if (storage) return window[STATE_ID] = storage

    // very first initialization
    const state = {
        isLearning: STATE.isLearning,
        learningParameter: STATE.learningParameter,
        devices: [],
        // one control to many parameters
        controlByParameter: {},
        // many parameters to one control
        parametersByControl: {},
    }

    window[STATE_ID] = state

    setStorage (state)

    return state
}