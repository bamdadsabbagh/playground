import { createMaterialIcon } from './create-material-icon'

type CreateMaterialChipProps = {
    type: string,
    content: string,
    onActionClick: (e: PointerEvent) => void,
}

/**
 * @description create chip UI element with material-design-lite
 * @see https://getmdl.io/components/index.html#chips-section
 */
export function createMaterialChip (
    {
        type,
        content,
        onActionClick,
    }: CreateMaterialChipProps,
): HTMLSpanElement {
    if (!type) throw new Error ('type not defined')
    if (!content) throw new Error ('content not defined')
    if (!onActionClick) throw new Error ('onActionClick not defined')

    // container
    const chip = document.createElement ('span')

    chip.classList.add ('mdl-chip')
    chip.classList.add ('mdl-chip--contact')
    chip.classList.add ('mdl-chip--deletable')

    // icon
    // default image https://getmdl.io/templates/dashboard/images/user.jpg
    const icon = document.createElement ('img')

    icon.classList.add ('mdl-chip__contact')

    if (type === 'button') {
        icon.src = 'https://static.thenounproject.com/png/55809-200.png'
        icon.style.background = 'rgba(0,255,0,.4)'
    } else if (type === 'range') {
        icon.src = 'https://static.thenounproject.com/png/949831-200.png'
        icon.style.background = 'rgba(0,0,255,.4)'
    } else {
        throw new Error ('type not found')
    }

    chip.appendChild (icon)

    // text
    const text = document.createElement ('span')

    text.classList.add ('mdl-chip__text')
    text.style.userSelect = 'none'

    text.innerHTML = content

    chip.appendChild (text)

    // action
    const action = document.createElement ('a')

    action.classList.add ('mdl-chip__action')

    action.appendChild (createMaterialIcon ({icon: 'cancel'}))

    action.onclick = onActionClick

    chip.appendChild (action)

    return chip
}