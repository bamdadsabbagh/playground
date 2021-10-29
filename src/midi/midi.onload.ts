import { authorizeDevice } from './utils/authorize-device'

type MidiOnloadProps = {
    wm: any,
    inputs: any[],
    outputs: any[],
    device: {
        colors: any,
        cc: {
            all: {
                first: number,
                last: number,
            },
            pads?: {
                first: number,
                last: number,
            }
        },
        grid: number[][],
    },
}

export function midiOnload (
    {
        wm,
        inputs,
        outputs,
        device,
    }: MidiOnloadProps,
) {
    return (err) => {

        if (err) {
            console.log ('WebMidi could not be enabled.', err)
        } else {
            console.log ('WebMidi enabled!')
        }

        const {colors, cc} = device

        wm.addListener ('connected', (e) => console.log (e))
        wm.addListener ('disconnected', (e) => console.log (e))
        console.log (wm.time)

        wm.inputs.forEach (input => authorizeDevice (input, inputs))

        wm.outputs.forEach (output => authorizeDevice (output, outputs))

        const input = inputs[1]
        const output = outputs[1]

        console.log ({inputs, outputs})

        input.on ('noteon', 1, (e) => console.log ('note', e))

        const colorKeys = Object.keys (colors)
        const randomKey = (array) => array[Math.floor (Math.random () * array.length)]

        for (let i = cc.all.first; i <= cc.all.last; ++i) {
            output.playNote (i, 1, {
                duration: 2000,
                rawVelocity: true,
                velocity: colors[randomKey (colorKeys)],
            })
        }
    }
}