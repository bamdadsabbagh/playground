import { PARAMETERS } from '../constants'

export function getParameter ({parameter}) {
    const element = PARAMETERS[parameter]

    if (!element) throw new Error ('parameter does not exist')

    return element
}