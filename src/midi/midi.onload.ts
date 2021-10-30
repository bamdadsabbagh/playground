import { authorizeDevice } from './utils/authorize-device'
import { novationLaunchpadX } from './allowed-devices/novation-launchpad-x/novation-launchpad-x'

type MidiOnloadProps = {
    wm: any,
}

export function midiOnload (
    {
        wm,
    }: MidiOnloadProps,
) {
    return (err) => {

        if (err) {
            console.log ('WebMidi could not be enabled.', err)
        } else {
            console.log ('WebMidi enabled!')
        }

        let inputs = []
        let outputs = []

        wm.addListener ('connected', (e) => console.log (e))
        wm.addListener ('disconnected', (e) => console.log (e))

        console.log (wm.time)

        wm.inputs.forEach (input => authorizeDevice (input, inputs))

        wm.outputs.forEach (output => authorizeDevice (output, outputs))

        const input = inputs[1]
        const output = outputs[1]

        console.log ({inputs, outputs})

        input.on ('noteon', 1, (e) => {
            console.log ('note', e, input)
            output.playNote (e.note.number, 1, {
                duration: 500,
                rawVelocity: true,
                velocity: novationLaunchpadX.colors.fuchsia,
            })
        })

        input.on ('controlchange', 1, (e) => {
            console.log ('control', e, input)
            output.playNote (e.controller.number, 1, {
                duration: 500,
                rawVelocity: true,
                velocity: novationLaunchpadX.colors.fuchsia,
            })
        })
    }
}