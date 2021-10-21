import { STATE, STATE_ID } from '../constants'

export function initializeState () {
    if (window[STATE_ID]) return

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

    return state
}