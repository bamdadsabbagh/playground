/**
 * @description get dialog UI element
 */
export function getSettingsDialogElement (): HTMLDialogElement {
    return document.getElementsByClassName ('mdl-dialog')[0] as HTMLDialogElement
}