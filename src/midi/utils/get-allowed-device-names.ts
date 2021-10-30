import { allowedDevices } from '../allowed-devices/allowed-devices'

export function getAllowedDeviceNames (): string[] {
    return allowedDevices.map (device => device.name)
}