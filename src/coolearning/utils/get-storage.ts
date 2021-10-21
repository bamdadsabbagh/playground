import { STATE_ID } from '../constants'
import { initializeState } from './initialize-state'

export function getStorage () {
    if (!window.localStorage) throw new Error ('localStorage not defined')
    if (!window.localStorage[STATE_ID]) initializeState ()

    let json

    try {
        json = JSON.parse (window.localStorage[STATE_ID])
    } catch (error) {
        throw new Error ('error while parsing localStorage' + error)
    }

    return json
}