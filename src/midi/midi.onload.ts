import { midiState } from './midi.state'

export function midiOnload (wm) {
    return (err) => {

        if (err) {
            console.log ('WebMidi could not be enabled.', err)
        } else {
            console.log ('WebMidi enabled!')
        }

        const {
            connectDevice,
            disconnectDevice,
        } = midiState

        wm.addListener ('connected', connectDevice)
        wm.addListener ('disconnected', disconnectDevice)

        console.log (wm)
        wm.getInputByName ('Launchpad X MIDI 1').on ('noteon', 1, (e) => console.log ('1', e))
        wm.getInputByName ('Launchpad X MIDI 2').on ('noteon', 1, (e) => console.log ('2', e))
    }
}