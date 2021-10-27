import { getState } from './get-state'

/**
 * @description get learning parameter only if learning mode is enabled
 */
export function getLearningParameter () {
    const state = getState ()
    return state.learningParameter
}