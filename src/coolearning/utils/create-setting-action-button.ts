import { CLASSES } from '../constants'
import { Actions } from '../enums'

export function createSettingActionButton (
    {
        type = Actions.Learn,
        parameter,
    },
) {
    if (!type) throw new Error ('type is not defined')
    if (typeof type !== 'string') throw new Error ('type should is not a string')
    if (!parameter) throw new Error ('parameter is not defined')
    if (typeof parameter !== 'string') throw new Error ('parameter is not a string')

    let button = null

    switch (type) {
        case Actions.Learn:
            button = `<button class="${CLASSES.ACTIONS.LEARN}" parameter="${parameter}">Learn</button>`
            break
        case Actions.Unlearn:
            button = `<button class="${CLASSES.ACTIONS.UNLEARN}" parameter="${parameter}">x</button>`
            break
        default:
            break
    }

    if (!button) return

    return button
}