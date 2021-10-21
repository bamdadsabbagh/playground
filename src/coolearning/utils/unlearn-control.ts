import { getState } from './get-state'
import { updateSetting } from './update-setting'
import { getControlId } from './get-control-id'

export function unlearnControl ({parameter}) {
    const state = getState ()
    const control = getControlId (parameter)

    // control by parameter
    if (state.controlByParameter[parameter]) {
        delete state.controlByParameter[parameter]
    }

    // parameters by control
    if (state.parametersByControl[control]) {
        if (state.parametersByControl[control].length === 1) {
            delete state.parametersByControl[control]
        } else {
            state.parametersByControl[control] = state.parametersByControl[control].filter (p => p !== parameter)
        }
    }

    // settings UI
    updateSetting ({parameter})

    // log
    console.log (`unlearning control ${control} for parameter ${parameter}`)
}
