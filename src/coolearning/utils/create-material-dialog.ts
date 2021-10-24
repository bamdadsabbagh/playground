type CreateMaterialDialogProps = {
    title: string,
    content: string | HTMLElement,
    width: number,
    fullWidth?: boolean,
    closeText?: string,
}

/**
 * @description create dialog (modal) UI element with material-design-lite
 * @see https://getmdl.io/components/index.html#dialog-section
 */
export function createMaterialDialog (
    {
        title,
        content,
        width,
        fullWidth = false,
        closeText = 'close',
    }: CreateMaterialDialogProps,
): HTMLDialogElement {
    if (!title) throw new Error ('title is not defined')
    if (typeof title !== 'string') throw new Error ('title is not a string')

    if (!content) throw new Error ('content is not defined')
    if (!(
        typeof content === 'string'
        || content instanceof HTMLElement
    )) throw new Error ('content is nor a string, nor an instance of HTMLElement')

    if (!width) throw new Error ('width is not defined')
    if (typeof width !== 'number') throw new Error ('width is not a number')

    // container
    const dialog = document.createElement ('dialog') as HTMLDialogElement
    dialog.classList.add ('mdl-dialog')
    dialog.style.width = `${width}px`

    // title
    const titleElement = document.createElement ('h4')
    titleElement.classList.add ('mdl-dialog__title')
    titleElement.innerText = title
    titleElement.appendTo (dialog)

    // content
    const contentElement = document.createElement ('div')
    contentElement.classList.add ('mdl-dialog__content')

    if (content instanceof HTMLElement) {
        content.appendTo (contentElement)
    } else if (typeof content === 'string') {
        const paragraph = document.createElement ('p')
        paragraph.innerText = content
        paragraph.appendTo (contentElement)
    }

    contentElement.appendTo (dialog)

    // actions
    const actions = document.createElement ('div')
    actions.classList.add ('mdl-dialog__actions')
    fullWidth && actions.classList.add ('mdl-dialog__actions--full-width')
    actions.appendTo (dialog)

    // action: close button
    const closeButton = document.createElement ('button')
    closeButton.type = 'button'
    closeButton.classList.add ('mdl-button')
    closeButton.innerText = closeText
    closeButton.onclick = () => dialog.close ()
    closeButton.appendTo (actions)

    // outside event
    dialog.onclick = (e) => {
        // MDL adds `open` HTML attribute to the dialog container (outside) only
        if (!e.target.open) return
        dialog.close ()
    }

    return dialog
}