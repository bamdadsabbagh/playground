import { updateSetting } from './update-setting'
import { disableLearningMode } from './disable-learning-mode'
import { isTabActive } from './is-tab-active'
import { setState } from './set-state'
import { StateExtended } from '../enums'

export function learnControl ({parameter, control, type}) {
    if (!isTabActive ()) return

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