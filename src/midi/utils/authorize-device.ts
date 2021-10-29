import { novationLaunchpadX } from '../devices/novation-launchpad-x'

export function authorizeDevice (device, whitelist): void {
    // device = input or output
    const allowedManufacturers = [
        novationLaunchpadX.manufacturer,
    ]
    const allowedDevices = [
        novationLaunchpadX.name,
    ]
    // device is an input or output
    const manufacturerIsAllowed = allowedManufacturers
        .filter (m => m === device.manufacturer)
        .length !== 0

    if (!manufacturerIsAllowed) return

    // device is allowed?
    const deviceIsAllowed = allowedDevices
        .filter (d => device.name.includes (d))
        .length !== 0

    if (!deviceIsAllowed) return

    whitelist.push (device)
}