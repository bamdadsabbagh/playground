import { STATE_ID } from '../constants'
import { initializeState } from './initialize-state'
import { State } from '../types'

/**
 * @description return the global state object
 */
export function getState (): State {
    if (!window[STATE_ID]) initializeState ()

    return window[STATE_ID]
}