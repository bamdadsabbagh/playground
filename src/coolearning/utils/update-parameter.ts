import { getParameterElement } from './get-parameter-element'
import { rangeMap } from './range-map'
import { Parameters, Types } from '../enums'
import { isTabActive } from './is-tab-active'
import { Parameter } from '../types'

type UpdateParameterProps = {
    parameter: Parameter,
    value: number,
    type: Types,
}

/**
 * @description update parameter in playground UI
 */
export function updateParameter (
    {
        parameter,
        value,
        type,
    }: UpdateParameterProps,
): void {
    const element = getParameterElement ({parameter})

    if (!isTabActive ()) return

    switch (element.tagName) {
        case Parameters.Select:
            if (type === Types.Range) {
                const length = element.children.length - 1
                const v = rangeMap (value, 0, 127, 0, length)
                const n = parseInt (v.toString ())
                if (n !== element.selectedIndex) {
                    element.selectedIndex = n
                    element.dispatchEvent (new Event ('change'))
                }
            }
            break
        case Parameters.Button:
            if (type === Types.ButtonOn) {
                element.click ()
            }
            break
        default:
            throw new Error (`${element.tagName} target not handled`)
    }
}