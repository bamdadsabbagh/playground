import { Device, DeviceCategory } from '../devices.types'
import { MidiType } from '../../midi.types'
import { getNetwork } from '../../../utils/get-network'
import { getNeuronAndLayerIndexes } from '../../../utils/get-neuron-and-layer-indexes'
import { getNeuron } from '../../../utils/get-neuron'
import { toggleNeuron } from '../../../utils/toggle-neuron'
import { updateNeuronCard } from '../../../playground'
import * as d3 from 'd3'
import { toggleOutput } from '../../../utils/toggle-output'
import { selectNode } from '../../../utils/select-node'
import { unselectNode } from '../../../utils/unselect-node'

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
                        velocity: device.colors.red,
                    },
                )
            }
        }, timers.boot)

        const nodesAreSelected = {}

        // runtime
        setTimeout (() => {
                const {neurons, inputs, output: networkOutput} = getNetwork ()

                const colors = {
                    on: device.colors.lime,
                    inputOn: device.colors.yellow,
                    outputOn: device.colors.fuchsia,
                    selected: device.colors.aqua,
                    off: device.colors.gray,
                }

                // -----------------------
                // first draw
                // -----------------------

                // inputs
                for (let i = 0; i < inputs.length; ++i) {
                    output.playNote (
                        device.pads.grid[0][i],
                        device.channels.output,
                        {
                            duration: timers.infinite,
                            rawVelocity: true,
                            velocity: colors.inputOn,
                        },
                    )
                }

                // neurons
                for (let i = 1; i <= neurons.flat ().length; ++i) {
                    const {neuronIndex, layerIndex} = getNeuronAndLayerIndexes (i)
                    const shiftedIndex = (layerIndex - 1) + 1 // reset, then move to the right
                    const note = device.pads.grid[shiftedIndex][neuronIndex - 1]
                    const {isEnabled} = getNeuron (neuronIndex)
                    nodesAreSelected[note] = false

                    output.playNote (
                        note,
                        device.channels.output,
                        {
                            duration: timers.infinite,
                            rawVelocity: true,
                            velocity: isEnabled ? colors.on : colors.off,
                        },
                    )
                }

                // output
                for (let i = 0; i < networkOutput.inputLinks.length; ++i) {
                    const note = device.pads.grid[device.pads.grid.length - 1][i]
                    const isEnabled = !networkOutput.inputLinks[i].isDead && networkOutput.inputLinks[i].weight !== 0

                    output.playNote (
                        note,
                        device.channels.output,
                        {
                            duration: timers.infinite,
                            rawVelocity: true,
                            velocity: isEnabled ? colors.outputOn : colors.off,
                        },
                    )
                }

                // -----------------------
                // runtime
                // -----------------------

                // listen to notes
                input.addListener (
                    'noteon',
                    device.channels.input,
                    (e) => {
                        const flatGridIndex = device.pads.grid.flat ().indexOf (e.note.number)

                        if (flatGridIndex >= 0 && flatGridIndex <= 6) {
                            // inputs

                            const input = inputs[flatGridIndex]

                            const canvas = d3.select (`#canvas-${input.id}`)[0][0] as HTMLDivElement
                            canvas.click ()

                            output.playNote (
                                e.note.number,
                                device.channels.output,
                                {
                                    duration: timers.infinite,
                                    rawVelocity: true,
                                    velocity: input.isEnabled ? colors.inputOn : colors.off,
                                },
                            )

                        } else if (flatGridIndex >= 56 && flatGridIndex <= 63) {
                            // output

                            const outputIndex = flatGridIndex - 56
                            toggleOutput (outputIndex)

                            const isEnabled = !networkOutput.inputLinks[outputIndex].isDead
                                && networkOutput.inputLinks[outputIndex].weight !== 0

                            output.playNote (
                                e.note.number,
                                device.channels.output,
                                {
                                    duration: timers.infinite,
                                    rawVelocity: true,
                                    velocity: isEnabled ? colors.outputOn : colors.off,
                                },
                            )

                        } else if (flatGridIndex >= 8 && flatGridIndex <= 55) {
                            // neurons

                            const nodeIndex = (device.pads.grid.flat ().indexOf (e.note.number) - 8) + 1
                            const {isEnabled} = getNeuron (nodeIndex)
                            let clickTimer = null
                            const canvas = d3.select (`#canvas-${nodeIndex}`)

                            // short click
                            if (isEnabled) {
                                // local state, isSelected?
                                nodesAreSelected[e.note.number] = !nodesAreSelected[e.note.number]

                                window['midiOutput'] = output

                                // propagation
                                if (nodesAreSelected[e.note.number]) {
                                    selectNode (nodeIndex)
                                } else {
                                    unselectNode (nodeIndex)
                                }

                                output.playNote (
                                    e.note.number,
                                    device.channels.output,
                                    {
                                        duration: timers.infinite,
                                        rawVelocity: true,
                                        velocity: nodesAreSelected[e.note.number] ? colors.selected : colors.on,
                                    },
                                )
                            }

                            // long click
                            clickTimer = setTimeout (() => {

                                clearTimeout (clickTimer)
                                clickTimer = null

                                toggleNeuron (nodeIndex)
                                const {isEnabled} = getNeuron (nodeIndex)
                                window['selectedNodes'] = window['selectedNodes'].filter (n => n !== nodeIndex)
                                nodesAreSelected[e.note.number] = false
                                canvas.classed ('selected', false)
                                updateNeuronCard ({nodeId: nodeIndex})

                                output.playNote (
                                    e.note.number,
                                    device.channels.output,
                                    {
                                        duration: timers.infinite,
                                        rawVelocity: true,
                                        velocity: isEnabled ? colors.on : colors.off,
                                    },
                                )
                            }, timers.clickDelay)

                            input.addListener ('noteoff', device.channels.input, () => {
                                if (clickTimer === null) return
                                clearTimeout (clickTimer)
                                clickTimer = null
                            })

                        }
                    },
                )
            }, timers.boot + timers.default + timers.wait,
        )
    },
}