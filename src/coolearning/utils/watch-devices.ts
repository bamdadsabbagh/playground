import { setState } from './set-state'
import { State } from '../enums'
import { getDevices } from './get-devices'

export function watchDevices (event) {
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

        console.log (`device ${id} added`)

    } else {

        devices = devices.filter (d => d.id !== id)

        setState (State.Devices, devices)

        console.log (`device ${id} removed`)

    }

}