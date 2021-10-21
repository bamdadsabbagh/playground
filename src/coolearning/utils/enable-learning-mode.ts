import { setState } from './set-state'
import { State } from '../enums'

/**
 * @description enable learning mode
 */
export function enableLearningMode ({parameter}) {
    setState (State.IsLearning, true)
    setState (State.LearningParameter, parameter)
}