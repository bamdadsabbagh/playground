import { setState } from './set-state'
import { State } from '../enums'
import { STATE } from '../constants'

/**
 * @description disable learning mode
 */
export function disableLearningMode () {
    setState (State.IsLearning, STATE.isLearning)
    setState (State.LearningParameter, STATE.learningParameter)
}