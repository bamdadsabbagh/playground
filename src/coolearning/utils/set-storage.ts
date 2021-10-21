import { STATE_ID } from '../constants'

/**
 * @description save state in local storage
 */
export function setStorage (payload) {
    if (!payload) throw new Error ('payload is not defined')
    if (!window.localStorage) throw new Error ('localStorage not defined')

    let string

    try {
        string = JSON.stringify (payload)
    } catch (error) {
        throw new Error ('error while payload stringification' + error)
    }

    window.localStorage.setItem (STATE_ID, string)
}