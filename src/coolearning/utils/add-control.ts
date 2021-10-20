import { getState } from './get-state'

export function addControl ({parameter, control, type}) {
    const state = getState ()

    state.controlByParameter[parameter] = {
        control,
        type,
    }

    if (Array.isArray (state.parametersByControl[control])) {
        state.parametersByControl[control] = [
            ...state.parametersByControl[control],
            parameter,
        ]
    } else {
        state.parametersByControl[control] = [parameter]
    }
}