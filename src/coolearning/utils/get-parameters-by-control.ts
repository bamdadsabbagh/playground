import { getState } from './get-state'

/**
 * @description get assigned parameters to a specific control through global state
 */
export function getParametersByControl (control: number): string[] {
    if (!control) throw new Error ('control is not defined')
    if (Number.isNaN (control)) throw new Error ('control is not a number')

    const state = getState ()
    return state.parametersByControl[control]
}