import {setState} from "./set-state";

export function enableLearningMode(learningParameter) {
    setState('isLearning', true)
    setState('learningParameter', learningParameter)
}