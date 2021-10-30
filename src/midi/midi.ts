import * as WebMidi from 'webmidi'
import { midiOnload } from './midi.onload'

export function midi () {
    const wm = WebMidi as any
    const sysexEnabled = false // if true, will ask browser permission

    wm.enable (midiOnload (wm), sysexEnabled)
}