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
    const dialog = document.createElement ('dialog')
    dialog.classList.add ('mdl-dialog')
    dialog.style.width = `${width}px`

    // title
    const titleElement = document.createElement ('h4')
    titleElement.classList.add ('mdl-dialog__title')

    titleElement.innerText = title

    dialog.appendChild (titleElement)

    // content
    const contentElement = document.createElement ('div')
    contentElement.classList.add ('mdl-dialog__content')

    if (content instanceof HTMLElement) {
        contentElement.appendChild (content)
    } else if (typeof content === 'string') {
        const paragraph = document.createElement ('p')
        paragraph.innerHTML = content
        contentElement.appendChild (paragraph)
    }

    dialog.appendChild (contentElement)

    // actions
    const actions = document.createElement ('div')
    actions.classList.add ('mdl-dialog__actions')
    fullWidth && actions.classList.add ('mdl-dialog__actions--full-width')

    dialog.appendChild (actions)

    // action: close button
    const closeButton = document.createElement ('button')
    closeButton.type = 'button'
    closeButton.classList.add ('mdl-button')

    closeButton.innerText = closeText

    closeButton.onclick = () => {
        // @ts-ignore
        dialog.close ()
    }

    actions.appendChild (closeButton)

    // outside event
    dialog.onclick = (e) => {
        // MDL adds an `open` HTML attribute
        // to the dialog container only

        // @ts-ignore
        if (!e.target.open) return

        // @ts-ignore
        dialog.close ()
    }

    return dialog as HTMLDialogElement
}