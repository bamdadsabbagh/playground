import { getState } from './get-state'

/**
 * @description is learning mode enabled?
 */
export function isLearning (): boolean {
    const state = getState ()
    return state.isLearning
}