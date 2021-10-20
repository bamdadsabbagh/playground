import { getState } from './get-state'

export function isControlled (parameter) {
    const state = getState ()
    return typeof state.controlByParameter[parameter] !== 'undefined'
}