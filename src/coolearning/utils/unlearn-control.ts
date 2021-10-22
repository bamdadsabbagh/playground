import { updateSetting } from './update-setting'
import { getControlId } from './get-control-id'
import { isTabActive } from './is-tab-active'
import { setState } from './set-state'
import { StateExtended } from '../enums'

/**
 * @description unlearn a control given a parameter
 */
export function unlearnControl ({parameter}) {
    if (!isTabActive ()) return

    const control = getControlId (parameter)

    // set state
    setState (StateExtended.UnlearnControl, {
        parameter,
        control,
    })

    // settings UI
    updateSetting ({parameter})

    // log
    console.log (`unlearning control ${control} for parameter ${parameter}`)
}
