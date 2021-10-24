import { getSettingsContainer } from './get-settings-container'
import { getSettingsDialogElement } from './get-settings-dialog-element'

/**
 * @description show settings UI
 * @todo replace with future dialog
 */
export function showSettings (): void {
    const container = getSettingsContainer ()
    container.style.display = 'block'
    // const dialog = getSettingsDialogElement ()
    // dialog.showModal ()
}