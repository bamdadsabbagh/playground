import { getSettingsContainer } from './get-settings-container'

export function showSettings () {
    const container = getSettingsContainer ()
    container.style.display = 'block'
}