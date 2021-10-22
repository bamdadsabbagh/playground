import { getState } from './get-state'
import { State } from '../enums'

/**
 * @description get devices from state
 * @todo not used anywhere else => not worth?
 */
export function getDevices (): Array<any> {
    const state = getState ()
    const devices = state[State.Devices]

    if (!devices) throw new Error ('error fetching devices')

    return devices
}