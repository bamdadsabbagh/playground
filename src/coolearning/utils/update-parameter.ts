import { getParameterElement } from './get-parameter-element'
import { rangeMap } from './range-map'
import { isTabActive } from './is-tab-active'
import { Parameter } from '../types'

type UpdateParameterProps = {
    parameter: Parameter,
    value: number,
}

/**
 * @description update parameter in playground UI
 */
export function updateParameter (
    {
        parameter,
        value,
    }: UpdateParameterProps,
): void {

    const element = getParameterElement ({parameter})

    if (!isTabActive ()) return

    switch (element.tagName) {

        case 'SELECT': {
            const length = element.children.length - 1
            const v = rangeMap (value, 0, 127, 0, length)
            const n = parseInt (v.toString ())
            const areDifferent = n !== element.selectedIndex

            if (areDifferent) {
                element.selectedIndex = n
                element.dispatchEvent (new Event ('change'))
            }

            break
        }

        case 'BUTTON': {
            if (value === 0) return
            element.click ()
            break
        }

        case 'INPUT': {
            const min = parseInt (element.min)
            const max = parseInt (element.max)
            const step = parseInt (element.step)

            const v = rangeMap (value, 0, 127, min, max)
            const n = parseInt (v.toString ())
            const isStep = (n % step) === 0
            const areDifferent = n !== parseInt (element.value)

            if (isStep && areDifferent) {
                element.value = n.toString ()
                element.dispatchEvent (new Event ('input'))
            }

            break
        }

        case 'LABEL': {
            if (value === 0) return
            element.click ()
            break
        }

        default:
            throw new Error (`${element.tagName} target not handled`)
    }
}