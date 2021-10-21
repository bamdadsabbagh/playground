import { STATE_ID } from '../constants'
import { State } from '../enums'

export function setState (action, payload) {
    const state = window[STATE_ID]
    switch (action) {
        case State.IsLearning:
            if (typeof payload === 'boolean') {
                state[State.IsLearning] = payload
            }
            break
        case State.LearningParameter:
            if (
                typeof payload === 'string'
                || payload === null
            ) {
                state[State.LearningParameter] = payload
            }
            break
        case State.Devices:
            state[State.Devices] = [
                ...state[State.Devices],
                payload,
            ]
            break
        default:
            throw new Error ('action not found')
    }
}