type CreateMaterialButtonProps = {
    icon: any,
    onClick?: () => void,
}

/**
 * @description create button UI element with material-design-lite
 * @see https://getmdl.io/components/index.html#buttons-section
 */
export function createMaterialButton (
    {
        icon,
        onClick = undefined,
    }: CreateMaterialButtonProps,
): HTMLButtonElement {
    if (!icon) throw new Error ('icon is not defined')

    const button = document.createElement ('button')

    button.classList.add ('mdl-button')
    button.classList.add ('mdl-js-button')
    button.classList.add ('mdl-button--icon')

    button.appendChild (icon)

    if (onClick && typeof onClick === 'function') {
        button.addEventListener ('click', onClick)
    }

    return button
}