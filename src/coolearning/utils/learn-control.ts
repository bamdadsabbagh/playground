import { updateSetting } from './update-setting'
import { disableLearningMode } from './disable-learning-mode'
import { isTabActive } from './is-tab-active'
import { setState } from './set-state'
import { StateActions } from '../enums'
import { isControlled } from './is-controlled'
import { ControlIdentifier, ControlType, Parameter } from '../types'
import { showSnack } from './show-snack'

type LearnControlProps = {
    parameter: Parameter,
    control: ControlIdentifier,
    type: ControlType,
}

/**
 * @description learn control
 */
export function learnControl (
    {
        parameter,
        control,
        type,
    }: LearnControlProps,
): void {

    if (!isTabActive ()) return

    // stop if parameter already controlled
    // todo add unit test
    if (isControlled (parameter)) return

    // set state
    setState (StateActions.LearnControl, {
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
    showSnack ({
        message: `Learn: control ${control} for ${parameter} (${type})`,
    })
}