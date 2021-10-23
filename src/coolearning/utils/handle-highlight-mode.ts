import { PARAMETERS } from '../constants'

/**
 * @description highlight mode handler
 */
export function handleHighlightMode (enable = true): void {

    // intercept click
    const onGlobalClick = (e) => {
        // todo might need to set an HTML attribute to all parameter targets
        console.log ('click intercepted', e.target)
    }

    document.onclick = enable ? onGlobalClick : undefined

    // change background
    const background = enable ? 'red' : null

    Object.keys (PARAMETERS).forEach (index => {
        const parameter = PARAMETERS[index]
        parameter.style.background = background
    })
}