import { getState } from './get-state'
import { updateSetting } from './update-setting'

export function unlearnControl ({parameter}) {
    const state = getState ()
    const control = state.controlByParameter[parameter] && state.controlByParameter[parameter].control

    // controlByParameter
    if (state.controlByParameter[parameter]) {
        delete state.controlByParameter[parameter]
    }

    // parametersByControl
    if (state.parametersByControl[control]) {
        if (state.parametersByControl[control].length === 1) {
            delete state.parametersByControl[control]
        } else {
            state.parametersByControl[control] = state.parametersByControl[control].filter (p => p !== parameter)
        }
    }

    // settings UI
    updateSetting ({parameter})
}
