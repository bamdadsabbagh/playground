import { PARAMETERS } from '../constants'

/**
 * @description highlight mode handler
 */
export function handleHighlightMode (enable = true): void {
    const background = enable ? 'red' : null

    Object.keys (PARAMETERS).forEach (index => {
        const parameter = PARAMETERS[index]
        parameter.style.background = background
    })
}