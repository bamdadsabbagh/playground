import { setState } from './set-state'
import { StateExtended } from '../enums'

/**
 * @description create button on main interface to reset settings state
 * @todo merge duplicate code with action button
 */
export function createSettingsResetButton (): void {
    const button = document.createElement ('button')

    button.style.display = 'block'
    button.style.position = 'fixed'
    button.style.top = '5px'
    button.style.left = '72px'
    button.innerText = 'reset'

    button.addEventListener ('click', () => {
        setState (StateExtended.Reset)
    })

    document.body.insertBefore (button, document.body.firstChild.nextSibling)
}