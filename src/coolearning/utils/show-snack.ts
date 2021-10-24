import { SNACKBAR_ID, TIMEOUT } from '../constants'

type ShowSnackbarProps = {
    message: string,
    actionHandler?: (e: Event) => void,
    actionText?: string,
    timeout?: number,
}

export function showSnack (
    {
        message,
        actionHandler,
        actionText,
        timeout = 2000,
    }: ShowSnackbarProps,
): void {

    if (!message) throw new Error ('message is not defined')
    if (typeof message !== 'string') throw new Error ('message is not a string')

    const notification = document.getElementById (SNACKBAR_ID)
    const hasAction = actionHandler && actionText
    const options = {
        message,
        actionHandler: hasAction ? actionHandler : undefined,
        actionText: hasAction ? actionText : undefined,
        timeout,
    }

    // if material JS not yet loaded, then recurse
    if (typeof notification.MaterialSnackbar === 'undefined') {
        setTimeout (() => showSnack (options), TIMEOUT)
        return
    }

    notification.MaterialSnackbar.showSnackbar (options)
}