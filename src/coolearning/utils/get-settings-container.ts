import { CLASSES } from '../constants'

/**
 * @description get settings container DOM element
 */
export function getSettingsContainer (): HTMLDivElement {
    return document.getElementsByClassName (CLASSES.settings.container)[0] as HTMLDivElement
}