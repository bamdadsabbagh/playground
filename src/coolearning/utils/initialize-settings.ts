import { createSettingsShowButton } from './create-settings-show-button'
import { createSettings } from './create-settings'
import { initializeSettingsContent } from './initialize-settings-content'

export function initializeSettings () {

    createSettingsShowButton ()

    createSettings ()

    initializeSettingsContent ()

}