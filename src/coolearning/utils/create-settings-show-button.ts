import { showSettings } from './show-settings'
import { createMaterialIcon } from './create-material-icon'
import { createMaterialButton } from './create-material-button'

/**
 * @description create button on main interface to show/hide settings UI
 */
export function createSettingsShowButton (): void {
    const icon = createMaterialIcon ({icon: 'settings'})
    const button = createMaterialButton ({
        icon,
        onClick: () => showSettings (),
    })

    button.style.display = 'block'
    button.style.position = 'fixed'
    button.style.bottom = '6px'
    button.style.left = '6px'

    button.prependTo (document.body)
}