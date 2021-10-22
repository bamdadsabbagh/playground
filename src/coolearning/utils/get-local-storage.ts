import { STATE_ID } from '../constants'
import { State } from '../types'

/**
 * @description retrieve string state from local storage, parse and return
 */
export function getLocalStorage (): State {
    if (!window.localStorage) throw new Error ('localStorage not defined')
    if (!window.localStorage[STATE_ID]) return

    let json

    try {
        json = JSON.parse (window.localStorage[STATE_ID])
    } catch (error) {
        throw new Error ('error while parsing localStorage' + error)
    }

    return json
}