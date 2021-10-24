import { MIDITypes } from '../enums'
import { getState } from './get-state'
import { State } from '../enums'
import { learnControl } from './learn-control'
import { updateParameter } from './update-parameter'
import { watchDevices } from './watch-devices'
import { SETTINGS } from '../constants'
import { showSnack } from './show-snack'

/**
 * @description initialize MIDI handler
 * @see https://raw.githubusercontent.com/erictherobot/react-web-midi/master/src/lib/MidiScript.js
 * @todo clean and extract
 */
export function initializeMidi (): void {
    let midi
    const ua = navigator.userAgent.toLowerCase ()
    if (ua.indexOf ('safari') !== -1) {
        if (ua.indexOf ('chrome') > -1) {
            console.log ('Chrome Browser Detected')
        } else {
            console.log ('Safari Browser Detected')
        }
    }
    let data
    let cmd
    let channel
    let type
    let note
    let velocity

    // request MIDI access
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess ({
            sysex: false,
        }).then (onMIDISuccess, onMIDIFailure)
    } else {
        onMIDIFailure ()
    }

    // midi functions
    function onMIDISuccess (midiAccess) {
        midi = midiAccess
        const inputs = midi.inputs.values ()
        // loop through all inputs
        for (let input = inputs.next (); input && !input.done; input = inputs.next ()) {
            // listen for midi messages
            input.value.onmidimessage = onMIDIMessage
            listInputs (input)
        }
        // listen for connect/disconnect message
        midi.onstatechange = onStateChange
        showMIDIPorts (midi)
    }

    function onMIDIMessage (event) {
        data = event.data
        cmd = data[0] >> 4
        channel = data[0] & 0xf
        type = data[0] & 0xf0 // channel agnostic message type. Thanks, Phil Burk.
        note = data[1]
        velocity = data[2]

        console.log ({
            channel,
            note,
            velocity,
            type,
        })

        const state = getState ()
        const control = note

        if (state[State.IsLearning] && state[State.LearningParameter]) {

            const parameter = state[State.LearningParameter]
            const myType = type === MIDITypes.ButtonOn || type === MIDITypes.ButtonOff
                ? SETTINGS.button
                : SETTINGS.range

            learnControl ({parameter, control, type: myType})

        } else if (state.parametersByControl[control]) {

            state.parametersByControl[control].forEach (parameter => {
                updateParameter ({
                    parameter,
                    type,
                    value: velocity,
                })
            })

        }
    }

    function onStateChange (event) {
        watchDevices (event)
    }

    function listInputs (inputs) {
        const input = inputs.value
        console.log ('Input port : [ type:\'' + input.type + '\' id: \'' + input.id + '\' manufacturer: \'' + input.manufacturer + '\' name: \'' + input.name + '\' version: \'' + input.version + '\']')
    }

    function onMIDIFailure () {
        showSnack ({
            message: 'No MIDI support in your browser.',
            timeout: 10000,
        })
    }

    // MIDI utility functions
    function showMIDIPorts (midiAccess) {
        const inputs = midiAccess.inputs
        let html
        html = '<h4>MIDI Inputs:</h4><div class="info">'
        inputs.forEach (function (port) {
            html += '<p>' + port.name + '<p>'
            html += '<p class="small">connection: ' + port.connection + '</p>'
            html += '<p class="small">state: ' + port.state + '</p>'
            html += '<p class="small">manufacturer: ' + port.manufacturer + '</p>'
            if (port.version) {
                html += '<p class="small">version: ' + port.version + '</p>'
            }
        })
        console.log (inputs.size)
    }
}