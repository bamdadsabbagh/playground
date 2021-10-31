import * as WebMidi from 'webmidi'
import { midiState } from './midi.state'

export function midi () {
    const wm = WebMidi as any
    const sysexEnabled = false // if true, will ask browser permission

    wm.enable ((err) => {

        if (err) {
            console.log ('WebMidi could not be enabled.', err)
        } else {
            console.log ('WebMidi enabled!')
        }

        const {
            connectDevice,
            disconnectDevice,
        } = midiState (wm)

        wm.addListener ('connected', connectDevice)
        wm.addListener ('disconnected', disconnectDevice)
    }, sysexEnabled)
}