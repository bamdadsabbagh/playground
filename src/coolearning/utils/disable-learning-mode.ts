import { setState } from './set-state'
import { State } from '../enums'
import { INITIAL_STATE } from '../constants'

/**
 * @description disable learning mode
 */
export function disableLearningMode (): void {
    setState (State.IsLearning, INITIAL_STATE.isLearning)
    setState (State.LearningParameter, INITIAL_STATE.learningParameter)
}