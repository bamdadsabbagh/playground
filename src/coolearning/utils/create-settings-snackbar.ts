import { SNACKBAR_ID } from '../constants'

export function createSettingsSnackbar (): void {
    const snackbar = document.createElement ('div')
    snackbar.id = SNACKBAR_ID
    snackbar.classList.add ('mdl-js-snackbar')
    snackbar.classList.add ('mdl-snackbar')

    const message = document.createElement ('div')
    message.classList.add ('mdl-snackbar__text')
    snackbar.appendChild (message)

    const action = document.createElement ('button')
    action.classList.add ('mdl-snackbar__action')
    action.type = 'button'
    snackbar.appendChild (action)

    document.body.appendChild (snackbar)
}