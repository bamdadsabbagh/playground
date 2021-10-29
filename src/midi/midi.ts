import * as WebMidi from 'webmidi'
import { novationLaunchpadX } from './devices/novation-launchpad-x'
import { midiOnload } from './midi.onload'

export function midi () {
    const wm = WebMidi as any
    let inputs = []
    let outputs = []
    const sysexEnabled = false // if true, will ask browser permission

    wm.enable (midiOnload ({
        wm,
        inputs,
        outputs,
        device: novationLaunchpadX,
    }), sysexEnabled)
}