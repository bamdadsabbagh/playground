import { getState } from './get-state'
import { State } from '../enums'

export function getDevices () {
    const state = getState ()
    const devices = state[State.Devices]

    if (!devices) throw new Error ('error fetching devices')

    return devices
}