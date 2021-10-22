import { setState } from './set-state'
import { State } from '../enums'
import { Parameter } from '../types'

type EnableLearningModeProps = {
    parameter: Parameter,
}

/**
 * @description enable learning mode
 */
export function enableLearningMode ({parameter}: EnableLearningModeProps): void {
    setState (State.IsLearning, true)
    setState (State.LearningParameter, parameter)
}