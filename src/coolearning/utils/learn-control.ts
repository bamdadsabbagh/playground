import { updateSetting } from './update-setting'
import { disableLearningMode } from './disable-learning-mode'
import { isTabActive } from './is-tab-active'
import { setState } from './set-state'
import { StateExtended } from '../enums'
import { isControlled } from './is-controlled'

export function learnControl ({parameter, control, type}) {
    if (!isTabActive ()) return

    // stop if parameter already controlled
    if (isControlled (parameter)) return

    // set state
    setState (StateExtended.LearnControl, {
        parameter,
        control,
        type,
    })

    // learning state
    disableLearningMode ()

    // settings UI
    updateSetting ({
        parameter,
        control,
        type,
    })

    // log
    console.log (`learning control ${control} as ${type} type for parameter ${parameter}`)
}