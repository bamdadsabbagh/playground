import { Device, DeviceCategory } from '../devices.types'
import { MidiType } from '../../midi.types'

/**
 * @description description for Novation Launchpad X
 *      the device NEEDS to be set to PROGRAMMER MODE
 * @see Programmer's Reference Manual https://fael-downloads-prod.focusrite.com/customer/prod/s3fs-public/downloads/Launchpad%20X%20-%20Programmers%20Reference%20Manual.pdf
 * @see User Guide https://www.kraftmusic.com/media/ownersmanual/Novation_Launchpad_X_User_Guide.pdf
 */
export const novationLaunchpadX: Device = {
    category: DeviceCategory.select,
    manufacturer: 'Focusrite - Novation',
    name: 'Launchpad X MIDI',
    all: {
        start: 11,
        end: 99,
    },
    indexes: {
        notes: {
            first: 11,
            last: 98,
            grid: [
                // describe columns
                // top down then left to right
                [81, 71, 61, 51, 41, 31, 21, 11],
                [82, 72, 62, 52, 42, 32, 22, 12],
                [83, 73, 63, 53, 43, 33, 23, 13],
                [84, 74, 64, 54, 44, 34, 24, 14],
                [85, 75, 65, 55, 45, 35, 25, 15],
                [86, 76, 66, 56, 46, 36, 26, 16],
                [87, 77, 67, 57, 47, 37, 27, 17],
                [88, 78, 68, 58, 48, 38, 28, 18],
            ],
        },
        controls: {
            firstRow: [91, 92, 93, 94, 95, 96, 97, 98],
            lastColumn: [89, 79, 69, 59, 49, 39, 29, 19],
        },
    },
    colors: {
        black: 0,
        silver: 2,
        gray: 1,
        white: 3,
        maroon: 83,
        red: 5,
        purple: 81,
        fuchsia: 53,
        olive: 15,
        lime: 21,
        green: 23,
        yellow: 13,
        navy: 47,
        blue: 67,
        teal: 35,
        turquoise: 38,
        aqua: 37,
    },
    onAttach: (wm, device) => {
        // avoid double notes
        if (device.type === MidiType.output) return

        const input = wm.getInputByName (device.name)
        const output = wm.getOutputByName (device.name)

        input.removeListener ()

        input.addListener (
            'noteon',
            'all',
            (e) => {
                console.log (e)
                output.playNote (
                    e.note.number,
                    1,
                    {
                        duration: 1000,
                        rawVelocity: true,
                        velocity: device.colors.fuchsia,
                    },
                )
            },
        )

        if (output) {
            for (let i = device.all.start; i <= device.all.end; i++) {
                output.playNote (i, 1, {
                    duration: 1000,
                    rawVelocity: true,
                    velocity: device.colors.red,
                })
            }
        }
    },
}