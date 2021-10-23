import { setState } from './set-state'
import { State } from '../enums'
import { getDevices } from './get-devices'
import { showSnack } from './show-snack'

/**
 * @description devices parser for midi events
 */
export function watchDevices (event: any): void {
    const {port} = event

    if (!port) return

    const {connection, id, type} = port

    if (!connection) return
    if (type !== 'input') return

    let devices = getDevices ()

    if (connection === 'open') {

        devices = [
            ...devices,
            {id},
        ]

        setState (State.Devices, devices)

        showSnack ({
            message: `device ${id} added`,
            timeout: 2000,
        })

    } else {

        devices = devices.filter (d => d.id !== id)

        setState (State.Devices, devices)

        showSnack ({
            message: `device ${id} removed`,
            timeout: 2000,
        })

    }

}