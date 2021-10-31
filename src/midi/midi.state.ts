import { DeviceCategory } from './devices/devices.types'
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

        console.log (connectedDevices)
    }

    function attachEvents (d) {
        if (d.category === DeviceCategory.control) {
            const input = wm.getInputByName (d.name)
            const output = wm.getOutputByName (d.name)
            const delay = 800

            if (input) {

                input.addListener (
                    'noteon',
                    'all',
                    (e) => {
                        wm.getOutputByName (d.name).playNote (
                            e.note.number,
                            'all',
                            {
                                duration: delay,
                                rawVelocity: true,
                                velocity: d.colors.green,
                            },
                        )
                    },
                )

                input.addListener (
                    'controlchange',
                    'all',
                    (e) => {

                        const color = e.controller.number >= d.fader.start && e.controller.number <= d.fader.end
                            ? d.colors.amber
                            : d.colors.green

                        wm.getOutputByName (d.name).playNote (
                            d.outputByInput[e.controller.number],
                            'all',
                            {
                                duration: delay,
                                rawVelocity: true,
                                velocity: color,
                            })
                    },
                )

            }

            if (output) {
                for (let i = d.all.first; i <= d.all.last; ++i) {
                    output.playNote (i, 'all', {
                        duration: delay,
                        rawVelocity: true,
                        velocity: d.colors.red,
                    })
                }
            }
        }
    }

    return {
        // getters
        connectedDevices,
        // methods
        connectDevice,
        disconnectDevice,
    }
})
(wm)