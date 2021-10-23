import { createSettingsShowButton } from './create-settings-show-button'
import { createSettingsContainer } from './create-settings-container'
import { createSettingsContent } from './create-settings-content'
import { createSettingsResetButton } from './create-settings-reset-button'
import { createSettingsSnackbar } from './create-settings-snackbar'
import { createSettingsDialog } from './create-settings-dialog'

/**
 * @description initialize settings UI
 */
export function initializeSettings (): void {

    // playground
    createSettingsShowButton ()

    createSettingsResetButton ()

    createSettingsSnackbar ()

    // modal
    createSettingsContainer ()

    createSettingsContent ()

    createSettingsDialog ()
}