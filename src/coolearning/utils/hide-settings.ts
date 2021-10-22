import { getSettingsContainer } from './get-settings-container'

/**
 * @description hide settings UI
 */
export function hideSettings (): void {
    const container = getSettingsContainer ()
    container.style.display = 'none'
}