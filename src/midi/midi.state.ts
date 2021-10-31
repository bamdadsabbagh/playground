import { WebMidiEventConnected, WebMidiEventDisconnected } from 'webmidi'
import { findDevice } from './utils/find-device'

export const midiState = (wm) => (function (wm) {

    // on connect, on disconnect
    let connectedDevices: WebMidiEventConnected['port'][] = []

    function connectDevice (d: WebMidiEventConnected): void {
        const {
            isFound,
            device,
        } = findDevice (d.port.manufacturer, d.port.name)

        if (!isFound) return

        const newDevice = {
            ...device,
            ...d.port,
        }

        connectedDevices.push (newDevice)

        attachEvents (newDevice)
    }

    function disconnectDevice (device: WebMidiEventDisconnected): void {
        connectedDevices = connectedDevices
            .filter (d => d.id !== device.port.id)
    }

    function attachEvents (d) {
        d.onAttach (wm, d)
    }

    return {
        // getters
        connectedDevices,
        // methods
        connectDevice,
        disconnectDevice,
    }
}) (wm)