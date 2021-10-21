import { getState } from './get-state'
import { updateSetting } from './update-setting'
import { disableLearningMode } from './disable-learning-mode'

export function learnControl ({parameter, control, type}) {
    const state = getState ()

    // control by parameter
    state.controlByParameter[parameter] = {
        control,
        type,
    }

    // parameters by control
    if (Array.isArray (state.parametersByControl[control])) {
        state.parametersByControl[control] = [
            ...state.parametersByControl[control],
            parameter,
        ]
    } else {
        state.parametersByControl[control] = [parameter]
    }

    // learning state
    disableLearningMode ()

    // settings UI
    updateSetting ({parameter, control, type})

    // log
    console.log (`learning control ${control} as ${type} type for parameter ${parameter}`)
}