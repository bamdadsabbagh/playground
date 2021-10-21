import { STATE, STATE_ID } from '../constants'
import { setStorage } from './set-storage'
import { getStorage } from './get-storage'
import { State } from '../enums'

export function initializeState () {
    if (window[STATE_ID]) return

    // storage?
    const storage = getStorage ()
    if (storage) return window[STATE_ID] = storage

    // very first initialization
    const state = {}
    state[State.IsLearning] = STATE.isLearning
    state[State.LearningParameter] = STATE.learningParameter
    state[State.Devices] = STATE.devices
    state[State.ControlByParameter] = STATE.controlByParameter
    state[State.ParametersByControl] = STATE.parametersByControl

    window[STATE_ID] = state

    setStorage (state)

    return state
}