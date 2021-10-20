import {STATE_ID} from "../constants";

export function setState(action, payload) {
    const state = window[STATE_ID]
    switch (action) {
        case 'isLearning':
            if (typeof payload === 'boolean') {
                state.isLearning = payload
            }
            break
        case 'learningParameter':
            if (
                typeof payload === 'string'
                || payload === null
            ) {
                state.learningParameter = payload
            }
            break
        default:
            throw new Error('action not found')
    }
}