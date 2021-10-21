import { CLASSES } from '../constants'
import { Actions } from '../enums'

/**
 * @description create action button for given parameter
 * appears inside settings UI
 */
export function createSettingsActionButton (
    {
        type = Actions.Learn,
        parameter,
    },
) {
    if (!type) throw new Error ('type is not defined')
    if (!parameter) throw new Error ('parameter is not defined')
    if (typeof type !== 'string') throw new Error ('type is not a string')
    if (typeof parameter !== 'string') throw new Error ('parameter is not a string')

    let button = null

    switch (type) {
        case Actions.Learn:
            button = `<button class="${CLASSES.actions.learn}" parameter="${parameter}">Learn</button>`
            break
        case Actions.Unlearn:
            button = `<button class="${CLASSES.actions.unlearn}" parameter="${parameter}">x</button>`
            break
        default:
            throw new Error ('action type not found')
    }

    return button
}