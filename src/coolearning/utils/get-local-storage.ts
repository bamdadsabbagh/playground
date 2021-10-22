import { STATE_ID } from '../constants'

export function getLocalStorage () {
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