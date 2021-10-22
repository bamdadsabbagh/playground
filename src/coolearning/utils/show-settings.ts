import { getSettingsContainer } from './get-settings-container'

/**
 * @description show settings UI
 */
export function showSettings (): void {
    const container = getSettingsContainer ()
    container.style.display = 'block'
}