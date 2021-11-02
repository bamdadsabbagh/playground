import { Device } from '../devices/devices.types'
import { devices } from '../devices/devices'

type SearchDevice = {
    isFound: boolean,
    device: Device,
}

export function findDevice (manufacturer, name): SearchDevice {

    const device = devices
        .filter (d => d.manufacturer === manufacturer)
        // .filter (d => name === d.name)
        .filter (d => name.includes (d.name))
        [0]

    if (!device) {
        return {
            isFound: false,
            device: null,
        }
    }

    return {
        isFound: true,
        device,
    }
}