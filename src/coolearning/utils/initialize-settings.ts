import { createSettingsShowButton } from './create-settings-show-button'
import { createSettings } from './create-settings'
import { initializeSettingsContent } from './initialize-settings-content'
import { createSettingsResetButton } from './create-settings-reset-button'

export function initializeSettings () {

    createSettingsShowButton ()

    createSettingsResetButton ()

    createSettings ()

    initializeSettingsContent ()

}