import { Device, DeviceCategory } from '../devices.types'
import { MidiType } from '../../midi.types'

export const novationLaunchControlXl: Device = {
    category: DeviceCategory.control,
    manufacturer: 'Focusrite A.E. Ltd',
    name: 'Launch Control XL MIDI',
    colors: {
        off: 12,
        black: 12,
        red: 15,
        amber: 63,
        yellow: 62,
        green: 60,
    },
    all: {
        start: 1,
        end: 127,
    },
    fader: {
        start: 77,
        end: 84,
    },
    outputByInput: {
        // first row
        13: 13,
        14: 29,
        15: 45,
        16: 61,
        17: 77,
        18: 93,
        19: 109,
        20: 125,
        // second row
        29: 14,
        30: 30,
        31: 46,
        32: 62,
        33: 78,
        34: 94,
        35: 110,
        36: 126,
        // third row
        49: 15,
        50: 31,
        51: 47,
        52: 63,
        53: 79,
        54: 95,
        55: 111,
        56: 127,
        // fader to "track focus" line
        77: 41,
        78: 42,
        79: 43,
        80: 44,
        81: 57,
        82: 58,
        83: 59,
        84: 60,
        // // fader to "track focus" line
        // 77: 15,
        // 78: 31,
        // 79: 47,
        // 80: 63,
        // 81: 79,
        // 82: 95,
        // 83: 111,
        // 84: 127,
    },
    onAttach: (wm, device) => {

        // avoid double notes
        if (device.type === MidiType.output) return

        // get i/o instances
        const input = wm.getInputByName (device.name)
        const output = wm.getOutputByName (device.name)

        // remove all current listeners
        input.removeListener ()

        // listen to notes
        input.addListener (
            'noteon',
            'all',
            (e) => {
                wm
                    .getOutputByName (device.name)
                    .playNote (
                        e.note.number,
                        'all',
                        {
                            duration: 1000,
                            rawVelocity: true,
                            velocity: device.colors.green,
                        },
                    )
            },
        )

        // listen to controls
        input.addListener (
            'controlchange',
            'all',
            (e) => {

                const color = e.controller.number >= device.fader.start && e.controller.number <= device.fader.end
                    ? device.colors.amber
                    : device.colors.green

                wm
                    .getOutputByName (device.name)
                    .playNote (
                        device.outputByInput[e.controller.number],
                        'all',
                        {
                            duration: 1000,
                            rawVelocity: true,
                            velocity: color,
                        })
            },
        )

        // flash red on init
        if (output) {
            for (let i = device.all.start; i <= device.all.end; ++i) {
                output.playNote (i, 'all', {
                    duration: 1000,
                    rawVelocity: true,
                    velocity: device.colors.red,
                })
            }
        }

    },
}