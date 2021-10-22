import { getState } from './get-state'
import { isControlled } from './is-controlled'

/**
 * @todo clunky, add optional chaining for better code style
 *       (need business validation to change tsconfig)
 */
export function getControlId (parameter) {
    const state = getState ()

    if (!isControlled (parameter)) return null

    return state.controlByParameter[parameter].control
}