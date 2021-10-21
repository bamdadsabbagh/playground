import { getState } from './get-state'

export function unlearnControl ({parameter}) {
    const state = getState ()
    const control = state.controlByParameter[parameter] && state.controlByParameter[parameter].control

    if (state.controlByParameter[parameter]) {
        delete state.controlByParameter[parameter]
    }

    if (state.parametersByControl[control]) {
        if (state.parametersByControl[control].length === 1) {
            delete state.parametersByControl[control]
        } else {
            state.parametersByControl[control] = state.parametersByControl[control].filter (p => p !== parameter)
        }
    }
}
