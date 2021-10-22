import { STATE, STATE_ID } from '../constants'
import { State, StateActions } from '../enums'
import { setLocalStorage } from './set-local-storage'
import { reloadWindow } from './reload-window'
import { removeLocalStorage } from './remove-local-storage'

/**
 * @description set state
 * @todo add clean up functions when learning/unlearning
 */
export function setState (action: State | StateActions, payload: any = undefined): void {
    let state = window[STATE_ID]

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

        case StateActions.LearnControl:
            if (!payload.parameter) throw new Error ('parameter not defined')
            if (!payload.control) throw new Error ('control not defined')
            if (!payload.type) throw new Error ('type not defined')

            // control by parameter
            state.controlByParameter[payload.parameter] = {
                control: payload.control,
                type: payload.type,
            }

            // parameters by control
            if (Array.isArray (state.parametersByControl[payload.control])) {
                state.parametersByControl[payload.control] = [
                    ...state.parametersByControl[payload.control],
                    payload.parameter,
                ]
            } else {
                state.parametersByControl[payload.control] = [payload.parameter]
            }

            break

        case StateActions.UnlearnControl:
            if (!payload.parameter) throw new Error ('parameter not defined')
            if (!payload.control) throw new Error ('control not defined')

            // control by parameter
            if (state.controlByParameter[payload.parameter]) {
                delete state.controlByParameter[payload.parameter]
            }

            // parameters by control
            if (state.parametersByControl[payload.control]) {
                if (state.parametersByControl[payload.control].length === 1) {
                    delete state.parametersByControl[payload.control]
                } else {
                    state.parametersByControl[payload.control] = state
                        .parametersByControl[payload.control]
                        .filter (p => p !== payload.parameter)
                }
            }

            break

        case StateActions.Reset:
            state = STATE
            removeLocalStorage ()
            reloadWindow ()
            break

        default:
            hasWritten = false
            throw new Error ('action not found')
    }

    if (hasWritten) setLocalStorage (state)
}