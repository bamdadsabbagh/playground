import { STATE_ID } from '../constants'

export function removeLocalStorage () {
    if (!window.localStorage[STATE_ID]) return

    window.localStorage.removeItem (STATE_ID)
}