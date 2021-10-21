import { CLASSES } from '../constants'

export function getSettingsContainer () {
    return document.getElementsByClassName (CLASSES.settings.container)[0] as HTMLDivElement
}