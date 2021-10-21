import { createModal } from './utils/create-modal'
import { createButton } from './utils/create-button'
import { initializeSettingsContent } from '../utils/initialize-settings-content'

export function Settings () {

    // todo move this out

    createButton ()

    createModal ()

    initializeSettingsContent ()
}
