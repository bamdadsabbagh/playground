import { getParameter } from './get-parameter'
import { rangeMap } from './range-map'
import { Parameters, Types } from '../enums'

export function updateParameter (
    {
        parameter,
        value,
        type,
    },
) {
    const element = getParameter ({parameter})

    switch (element.tagName) {
        case Parameters.Select:
            if (type === Types.Range) {
                const length = element.children.length - 1
                const v = rangeMap (value, 0, 127, 0, length)
                const n = parseInt (v)
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