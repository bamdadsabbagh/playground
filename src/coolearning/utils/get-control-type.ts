import { getState } from './get-state'
import { isControlled } from './is-controlled'
import { ControlType, Parameter } from '../types'

/**
 * @description get control type from state (like range or button)
 */
export function getControlType (parameter: Parameter): ControlType {
    const state = getState ()

    if (!isControlled (parameter)) return null

    return state.controlByParameter[parameter].type
}