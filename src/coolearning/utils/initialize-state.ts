import { STATE_ID } from '../constants'

export function initializeState () {
    const state = {
        isLearning: false,
        learningParameter: null,
        devices: [],
        // one control to many parameters
        controlByParameter: {},
        // many parameters to one control
        parametersByControl: {},
    }

    window[STATE_ID] = state

    return state
}