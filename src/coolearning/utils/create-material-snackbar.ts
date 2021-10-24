import { SNACKBAR_ID } from '../constants'

/**
 * @description create snackbar UI element with material-design-lite
 * @see https://getmdl.io/components/index.html#snackbar-section
 */
export function createMaterialSnackbar (): HTMLDivElement {
    const snackbar = document.createElement ('div')
    snackbar.id = SNACKBAR_ID
    snackbar.classList.add ('mdl-js-snackbar')
    snackbar.classList.add ('mdl-snackbar')

    const message = document.createElement ('div')
    message.classList.add ('mdl-snackbar__text')
    message.appendTo (snackbar)

    const action = document.createElement ('button')
    action.classList.add ('mdl-snackbar__action')
    action.type = 'button'
    action.appendTo (snackbar)

    return snackbar
}