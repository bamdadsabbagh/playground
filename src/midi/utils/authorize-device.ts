import { getAllowedDeviceManufacturers } from './get-allowed-device-manufacturers'
import { getAllowedDeviceNames } from './get-allowed-device-names'

/**
 * @param device - input/output
 * @param {Array} whitelist
 */
export function authorizeDevice (device, whitelist): void {
    const allowedDeviceManufacturers = getAllowedDeviceManufacturers ()
    const allowedDeviceNames = getAllowedDeviceNames ()

    const manufacturerIsAllowed = allowedDeviceManufacturers
        .filter (m => m === device.manufacturer)
        .length !== 0

    if (!manufacturerIsAllowed) return

    const deviceIsAllowed = allowedDeviceNames
        .filter (d => device.name.includes (d))
        .length !== 0

    if (!deviceIsAllowed) return

    whitelist.push (device)
}