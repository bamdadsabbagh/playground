import { createMaterialButton } from './create-material-button'
import { createMaterialIcon } from './create-material-icon'
import { state } from '../state/state'

/**
 * @description create button on main interface to reset settings state
 */
export function createSettingsResetButton (): void {
    const icon = createMaterialIcon ({icon: 'eject'})
    icon.style.marginTop = '-1px'

    const button = createMaterialButton ({
        icon,
        onClick: () => state.reset (),
    })

    button.style.display = 'block'
    button.style.position = 'fixed'
    button.style.bottom = '6px'
    button.style.left = '52px'

    button.prependTo (document.body)
}