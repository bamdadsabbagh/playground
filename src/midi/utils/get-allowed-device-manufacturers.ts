import { allowedDevices } from '../allowed-devices/allowed-devices'

export function getAllowedDeviceManufacturers (): string[] {
    return allowedDevices.map (device => device.manufacturer)
}