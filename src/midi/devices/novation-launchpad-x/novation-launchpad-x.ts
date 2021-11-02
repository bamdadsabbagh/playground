import { Device, DeviceCategory } from '../devices.types'
import { MidiType } from '../../midi.types'
import { getNetwork } from '../../../utils/get-network'
import { getNeuronAndLayerIndexes } from '../../../utils/get-neuron-and-layer-indexes'

/**
 * @description Novation Launchpad X
 * @see Programmer's Reference https://fael-downloads-prod.focusrite.com/customer/prod/s3fs-public/downloads/Launchpad%20X%20-%20Programmers%20Reference%20Manual.pdf
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
    pads: {
        start: 11,
        end: 98,
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
    indexes: {
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
    channels: {
        input: 'all',
        output: 1,
    },
    onAttach: (wm, device) => {

        // avoid double notes
        if (device.type === MidiType.output) return

        // get i/o instances
        const input = wm.getInputByName (device.name)
        const output = wm.getOutputByName (device.name)

        // todo notice the dead instances for a same device, create a unique cherry picker
        console.log (device.name, input, output)

        if (!output) return

        // switch to programmer mode
        output.sendSysex (0, [32, 41, 2, 12, 14, 1])

        // remove all current listeners
        input.removeListener ()

        // -----
        // READY
        // -----

        const timers = {
            default: 500,
            infinite: 3600000,
            boot: 2000,
            wait: 200,
            clickDelay: 600,
        }

        // listen to controls
        input.addListener (
            'controlchange',
            device.channels.input,
            (e) => {
                console.log (e.controller.number)
                output.playNote (
                    e.controller.number,
                    device.channels.output,
                    {
                        duration: timers.default,
                        rawVelocity: true,
                        velocity: device.colors.fuchsia,
                    },
                )
            })

        // load
        // flash red on init
        setTimeout (() => {
            for (let i = device.all.start; i <= device.all.end; i++) {
                output.playNote (
                    i,
                    device.channels.output,
                    {
                        duration: timers.default,
                        rawVelocity: true,
                        velocity: device.colors.green,
                    },
                )
            }
        }, timers.boot)

        // runtime
        setTimeout (() => {
            let clickTimer = null

            // network
            const network = getNetwork ()
            const networkLength = network.flat ().length
            for (let n = 1; n <= networkLength; ++n) {
                const {neuronIndex, layerIndex} = getNeuronAndLayerIndexes (n)
                const shiftedIndex = (layerIndex - 1) + 1 // reset, then move to the right
                const note = device.pads.grid[shiftedIndex][neuronIndex - 1]

                output.playNote (
                    note,
                    device.channels.output,
                    {
                        duration: timers.infinite,
                        rawVelocity: true,
                        velocity: device.colors.red,
                    },
                )
            }

            // listen to notes
            input.addListener (
                'noteon',
                device.channels.input,
                (e) => {
                    clickTimer = setTimeout (() => {

                        clearTimeout (clickTimer)
                        clickTimer = null

                        output.playNote (
                            e.note.number,
                            device.channels.output,
                            {
                                duration: timers.infinite,
                                rawVelocity: true,
                                velocity: device.colors.lime,
                            },
                        )
                    }, timers.clickDelay)
                },
            )

            input.addListener (
                'noteoff',
                device.channels.input,
                (e) => {

                    if (clickTimer === null) return
                    clearTimeout (clickTimer)
                    clickTimer = null

                    output.playNote (
                        e.note.number,
                        device.channels.output,
                        {
                            duration: timers.default,
                            rawVelocity: true,
                            velocity: device.colors.aqua,
                        },
                    )

                    setTimeout (() => {
                        output.playNote (
                            e.note.number,
                            device.channels.output,
                            {
                                duration: timers.infinite,
                                rawVelocity: true,
                                velocity: device.colors.red,
                            },
                        )
                    }, timers.default)
                },
            )
        }, timers.boot + timers.default + timers.wait)
    },
}