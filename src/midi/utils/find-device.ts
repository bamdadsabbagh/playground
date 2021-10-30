import { DeviceCategory } from '../devices/devices.types'
import { devices } from '../devices/devices'

type SearchDevice = {
    isFound: boolean,
    category: DeviceCategory,
}

export function findDevice (manufacturer, name): SearchDevice {

    const response = {
        isFound: false,
        category: null,
    }

    const foundDevice = devices
        .filter (d => d.manufacturer === manufacturer)
        .filter (d => name.includes (d.name))
        [0]

    if (!foundDevice) return response

    response.isFound = true
    response.category = foundDevice.category

    return response
}