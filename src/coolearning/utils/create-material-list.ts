type CreateMaterialListProps = {
    items: Array<(string | HTMLElement)>,
}

/**
 * @description create list UI element with material-design-lite
 * @see https://getmdl.io/components/index.html#lists-section
 */
export function createMaterialList ({items}: CreateMaterialListProps): HTMLUListElement {
    if (!items) throw new Error ('items is not defined')
    if (!Array.isArray (items)) throw new Error ('items is not an array')

    // container
    const ul = document.createElement ('ul')
    ul.classList.add ('mdl-list')

    for (let i = 0; i < items.length; ++i) {
        const item = items[i]

        const li = document.createElement ('li')
        li.classList.add ('mdl-list__item')

        ul.appendChild (li)
        const content = document.createElement ('span')
        content.classList.add ('mdl-list__item-primary-content')
        li.appendChild (content)

        const icon = document.createElement ('i')
        icon.classList.add ('material-icons')
        icon.classList.add ('mdl-list__item-icon')
        icon.innerText = 'person'
        content.appendChild (icon)

        if (item instanceof HTMLElement) {
            content.appendChild (item)
        } else if (typeof item === 'string') {
            const span = document.createElement ('span')
            span.innerText = item
            content.appendChild (span)
        }
    }

    return ul
}