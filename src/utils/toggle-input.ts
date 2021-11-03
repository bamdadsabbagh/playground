import { getNetwork } from './get-network'
import { novationLaunchpadX } from '../midi/devices/novation-launchpad-x/novation-launchpad-x'

export function toggleInput (inputIndexOrIdentifier: number | string): void {
    const {inputs} = getNetwork ()
    let input

    if (typeof inputIndexOrIdentifier === 'string') {
        input = inputs.filter (input => input.id === inputIndexOrIdentifier)[0]
    } else if (typeof inputIndexOrIdentifier === 'number') {
        input = inputs[inputIndexOrIdentifier]
    }

    const {isEnabled} = input

    input.isEnabled = !isEnabled

    input.outputs.forEach (outputLink => {

        if (!outputLink.dest.isEnabled) {
            outputLink.isDead = true
            outputLink.weight = 0
            return
        }

        outputLink.isDead = !input.isEnabled
        outputLink.weight = input.isEnabled
            ? Math.random () - 0.5
            : 0
    })

    // midi
    novationLaunchpadX.enableOrDisableInput (input.id, input.isEnabled)
}