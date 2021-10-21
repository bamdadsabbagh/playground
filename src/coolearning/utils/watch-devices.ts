import { setState } from './set-state'
import { State } from '../enums'

export function watchDevices (event) {
    const {port} = event

    if (!port) return

    const {connection, id, type} = port

    if (!connection) return
    if (type !== 'input') return

    setState (State.Devices, {id})
}