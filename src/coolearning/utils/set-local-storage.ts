import { STATE_ID } from '../constants'
import { State } from '../types'

/**
 * @description save state in local storage
 */
export function setLocalStorage (state: State): void {
    if (!state) throw new Error ('state not defined')
    if (!window.localStorage) throw new Error ('localStorage not defined')

    let string: string

    try {
        string = JSON.stringify (state)
    } catch (error) {
        throw new Error ('error while payload stringification' + error)
    }

    window.localStorage.setItem (STATE_ID, string)
}