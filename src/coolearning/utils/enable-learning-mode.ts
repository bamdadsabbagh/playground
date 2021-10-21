import { setState } from './set-state'
import { State } from '../enums'

export function enableLearningMode ({parameter}) {
    setState (State.IsLearning, true)
    setState (State.LearningParameter, parameter)
}