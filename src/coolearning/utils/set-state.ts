import { STATE_ID } from '../constants'
import { State } from '../enums'
import { setStorage } from './set-storage'

export function setState (action, payload) {
    const state = window[STATE_ID]

    let hasWritten = true

    switch (action) {
        case State.IsLearning:
            if (!(typeof payload === 'boolean')) throw new Error (`${State.IsLearning} is not a boolean`)
            state[State.IsLearning] = payload
            break
        case State.LearningParameter:
            if (!(
                typeof payload === 'string'
                || payload === null
            )) throw new Error (`${State.LearningParameter} is nor a string, nor null`)
            state[State.LearningParameter] = payload

            break
        case State.Devices:
            if (!(Array.isArray (payload))) throw new Error (`${State.Devices} is not an array`)
            state[State.Devices] = payload
            break
        default:
            hasWritten = false
            throw new Error ('action not found')
    }

    if (hasWritten) setStorage (state)
}