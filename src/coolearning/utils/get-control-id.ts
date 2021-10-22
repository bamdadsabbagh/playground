import { getState } from './get-state'
import { isControlled } from './is-controlled'
import { ControlIdentifier, Parameter } from '../types'

/**
 * @description get control id from state (id is the actual note, like 41)
 * @todo clunky, add optional chaining for better code style
 *       (need business validation to change tsconfig)
 */
export function getControlId (parameter: Parameter): ControlIdentifier {
    const state = getState ()

    if (!isControlled (parameter)) return null

    return state.controlByParameter[parameter].control
}