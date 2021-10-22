import { getState } from './get-state'
import { Parameter } from '../types'

/**
 * @description is a given parameter already assigned to a control?
 */
export function isControlled (parameter: Parameter): boolean {
    const state = getState ()
    return typeof state.controlByParameter[parameter] !== 'undefined'
}