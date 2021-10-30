import { devices } from './devices/devices'
import { DeviceCategory } from './devices/devices.types'
import { WebMidiEventConnected, WebMidiEventDisconnected } from 'webmidi'
import { findDevice } from './utils/find-device'
import { MidiType } from './midi.types'

type ConnectedDevice = {
    id: string,
    type: MidiType,
    category: DeviceCategory,
}

export const midiState = (function () {

    const allowedDeviceManufacturers = devices.map (d => d.manufacturer)
    const allowedDeviceNames = devices.map (d => d.name)

    // on connect, on disconnect
    let connectedDevices: ConnectedDevice[] = []

    function connectDevice (device: WebMidiEventConnected): void {
        console.log (device)
        const {
            isFound,
            category,
        } = findDevice (device.port.manufacturer, device.port.name)

        if (!isFound) return

        // do not add outputs of 'control' devices
        if (
            category === DeviceCategory.control
            && device.port.type === MidiType.output
        ) return

        connectedDevices.push ({
            id: device.port.id,
            type: device.port.type as MidiType,
            category,
        })

        console.log (connectedDevices)
    }

    function disconnectDevice (device: WebMidiEventDisconnected): void {
        connectedDevices = connectedDevices
            .filter (d => d.id !== device.port.id)

        console.log (connectedDevices)
    }

    return {
        // getters
        allowedDeviceManufacturers,
        allowedDeviceNames,
        // methods
        connectDevice,
        disconnectDevice,
    }
}) ()