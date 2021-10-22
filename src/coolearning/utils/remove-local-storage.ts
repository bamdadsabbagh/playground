import { STATE_ID } from '../constants'

/**
 * @description remove / delete app state in browser localStorage
 */
export function removeLocalStorage (): void {
    if (!window.localStorage[STATE_ID]) return

    window.localStorage.removeItem (STATE_ID)
}