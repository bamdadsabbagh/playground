import { getSettingsContainer } from './get-settings-container'

export function hideSettings () {
    const container = getSettingsContainer ()
    container.style.display = 'none'
}