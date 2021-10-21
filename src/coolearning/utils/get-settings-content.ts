import { CLASSES } from '../constants'

export function getSettingsContent () {
    return document.getElementsByClassName (CLASSES.settings.content)[0] as HTMLDivElement
}