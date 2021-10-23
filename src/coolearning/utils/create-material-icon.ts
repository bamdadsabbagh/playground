type CreateMaterialIconProps = {
    icon: string,
}

/**
 * @description create icon UI element with material-design-lite
 * @param icon
 */
export function createMaterialIcon (
    {
        icon,
    }: CreateMaterialIconProps,
): HTMLElement {
    const element = document.createElement ('i')
    element.classList.add ('material-icons')
    element.innerText = icon

    return element
}