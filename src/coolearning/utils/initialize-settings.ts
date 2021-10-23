import { createSettingsShowButton } from './create-settings-show-button'
import { createSettingsContainer } from './create-settings-container'
import { createSettingsContent } from './create-settings-content'
import { createSettingsResetButton } from './create-settings-reset-button'

/**
 * @description initialize settings UI
 */
export function initializeSettings (): void {

    createSettingsShowButton ()

    createSettingsResetButton ()

    createSettingsContainer ()

    createSettingsContent ()

}