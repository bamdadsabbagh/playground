// https://raw.githubusercontent.com/erictherobot/react-web-midi/master/src/lib/MidiScript.js
// todo lot of cleaning and logic extraction

import {PARAMETERS, TYPES} from "../constants";
import {getState} from "./get-state";
import * as d3 from "d3";

export function setupMidi() {
    const log = console.log.bind(console)
    // const keyData = document.getElementById('key_data')
    // const deviceInfoInputs = document.getElementById('inputs')
    // const deviceInfoOutputs = document.getElementById('outputs')
    let midi
    const ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf('safari') !== -1) {
        if (ua.indexOf('chrome') > -1) {
            // @ts-ignore
            let AudioContext = AudioContext
            console.log('Chrome Browser Detected') // Chrome
        } else {
            // @ts-ignore
            let AudioContext = webkitAudioContext
            console.log('Safari Browser Detected') // Safari
        }
    }
    const context = new AudioContext()
    const activeNotes = []
    const btnBox = document.getElementById('content')
    const btn = document.getElementsByClassName('button')
    let data
    let cmd
    let channel
    let type
    let note
    let velocity

    // request MIDI access
    // @ts-ignore
    if (navigator.requestMIDIAccess) {
        // @ts-ignore
        navigator.requestMIDIAccess({
            sysex: false
        }).then(onMIDISuccess, onMIDIFailure)
    } else {
        alert('No MIDI support in your browser.')
    }

    // add event listeners
    document.addEventListener('keydown', keyController)
    document.addEventListener('keyup', keyController)
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('mousedown', clickPlayOn)
        btn[i].addEventListener('mouseup', clickPlayOff)
    }
    // prepare audio files
    for (let i = 0; i < btn.length; i++) {
        addAudioProperties(btn[i])
    }

    const sampleMap = {
        key60: 1,
        key61: 2,
        key62: 3,
        key63: 4,
        key64: 5,
        key65: 6,
        key66: 7,
        key67: 8,
        key68: 9,
        key69: 10,
        key70: 11,
        key71: 12
    }

    // user interaction
    function clickPlayOn(e) {
        e.target.classList.add('active')
        e.target.play()
    }

    function clickPlayOff(e) {
        e.target.classList.remove('active')
    }

    function keyController(e) {
    }

    // midi functions
    function onMIDISuccess(midiAccess) {
        midi = midiAccess
        const inputs = midi.inputs.values()
        // loop through all inputs
        for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
            // listen for midi messages
            input.value.onmidimessage = onMIDIMessage
            listInputs(input)
        }
        // listen for connect/disconnect message
        midi.onstatechange = onStateChange
        showMIDIPorts(midi)
    }

    function onMIDIMessage(event) {
        data = event.data
        cmd = data[0] >> 4
        channel = data[0] & 0xf
        type = data[0] & 0xf0 // channel agnostic message type. Thanks, Phil Burk.
        note = data[1]
        velocity = data[2]
        // with pressure and tilt off
        // note off: 128, cmd: 8
        // note on: 144, cmd: 9
        // pressure / tilt on
        // pressure: 176, cmd 11:
        // bend: 224, cmd: 14
        // log('MIDI data', data)

        // Display Midi Notes
        // keyData.innerHTML = keyData.innerHTML + data
        //
        // switch (type) {
        //     case 144: // noteOn message
        //         noteOn(note, velocity)
        //         break
        //     case 128: // noteOff message
        //         noteOff(note, velocity)
        //         break
        // }

        // logger(keyData, 'key data', data)

        console.log({
            channel,
            note,
            velocity,
            type
        })

        const state = getState()

        if (state.isLearning && state.learningParameter) {

            const id = state.learningParameter
            const myType = type === 128 || type === 144 ? 'button' : 'range'

            // update state
            state.controlByParameter[id] = {
                type: myType,
                note,
            }

            // todo add many parameters
            state.parametersByControl[note] = [id]

            // todo update settings

            state.isLearning = false
            state.learningParameter = undefined

            console.log(`learning note ${note} as type ${myType} for parameter ${id}`)

        } else if (state.parametersByControl[note]) {

            state.parametersByControl[note].forEach(parameter => {
                const element = PARAMETERS[parameter]

                switch (element.tagName) {
                    case 'SELECT':
                        if (type === TYPES.range) {
                            const length = element.children.length - 1
                            const v = rangeMap(velocity, 0, 127, 0, length)
                            const n = parseInt(v)
                            if (n !== element.selectedIndex) {
                                element.selectedIndex = n
                                element.dispatchEvent(new Event('change'))
                            }
                        }
                        break
                    case 'BUTTON':
                        if (type === TYPES.buttonOn) {
                            element.click()
                        }
                        break
                    default:
                        throw new Error(`${element.tagName} target not handled`)
                }
            })
        }
    }

    function onStateChange(event) {
        // showMIDIPorts(midi)
        // const port = event.port
        // const state = port.state
        // const name = port.name
        // const type = port.type
        // if (type === 'input') {
        //     log('name', name, 'port', port, 'state', state)
        // }

        const {port} = event

        if (!port) return

        const {connection, id, type} = port
        if (!connection) return
        if (type !== 'input') return

        const state = getState()
        state.devices = [
            ...state.devices,
            {id}
        ]

        console.log(state)
    }

    function listInputs(inputs) {
        const input = inputs.value
        log("Input port : [ type:'" + input.type + "' id: '" + input.id + "' manufacturer: '" + input.manufacturer + "' name: '" + input.name + "' version: '" + input.version + "']")
    }

    function noteOn(midiNote, velocity) {
        player(midiNote, velocity)
    }

    function noteOff(midiNote, velocity) {
        player(midiNote, velocity)
    }

    function player(note, velocity) {
        const sample = sampleMap['key' + note]
        if (sample) {
            if (type === (0x80 & 0xf0) || velocity === 0) {
                // needs to be fixed for QuNexus, which always returns 144
                btn[sample - 1].classList.remove('active')
                return
            }
            btn[sample - 1].classList.add('active')
            // @ts-ignore
            btn[sample - 1].play(velocity)
        }
    }

    function onMIDIFailure(e) {
        log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e)
    }

    // MIDI utility functions
    function showMIDIPorts(midiAccess) {
        const inputs = midiAccess.inputs
        const outputs = midiAccess.outputs
        let html
        let noInputs
        let noOutputs
        noInputs = '<h4>MIDI Inputs:</h4><div class="info">Please connect your MIDI Controller (USB / Midi Cable)</div>'
        noOutputs = '<h4>MIDI Outputs:</h4><div class="info">Please connect your MIDI Controller (USB / Midi Cable)</div>'
        html = '<h4>MIDI Inputs:</h4><div class="info">'
        inputs.forEach(function (port) {
            html += '<p>' + port.name + '<p>'
            html += '<p class="small">connection: ' + port.connection + '</p>'
            html += '<p class="small">state: ' + port.state + '</p>'
            html += '<p class="small">manufacturer: ' + port.manufacturer + '</p>'
            if (port.version) {
                html += '<p class="small">version: ' + port.version + '</p>'
            }
        })
        console.log(inputs.size)
        // if (inputs.size > 1) {
        //     deviceInfoInputs.innerHTML = html + '</div>'
        // } else {
        //     deviceInfoInputs.innerHTML = noInputs
        // }

        html = '<h4>MIDI Outputs:</h4><div class="info">'
        outputs.forEach(function (port) {
            html += '<p>' + port.name + '<br>'
            html += '<p class="small">manufacturer: ' + port.manufacturer + '</p>'
            if (port.version) {
                html += '<p class="small">version: ' + port.version + '</p>'
            }
        })
        console.log(outputs.size)
        // if (outputs.size > 1) {
        //     deviceInfoOutputs.innerHTML = html + '</div>'
        // } else {
        //     deviceInfoOutputs.innerHTML = noOutputs
        // }
    }

    // audio functions
    function loadAudio(object, url) {
        const request = new XMLHttpRequest()
        request.open('GET', url, true)
        request.responseType = 'arraybuffer'
        request.onload = function () {
            context.decodeAudioData(request.response, function (buffer) {
                object.buffer = buffer
            })
        }
        request.send()
    }

    function addAudioProperties(object) {
        object.name = object.id
        object.source = object.dataset.sound
        loadAudio(object, object.source)
        object.play = function (volume) {
            var s = context.createBufferSource()
            var g = context.createGain()
            var v
            s.buffer = object.buffer
            s.playbackRate.value = randomRange(0.5, 2)
            if (volume) {
                v = rangeMap(volume, 1, 127, 0.2, 2)
                s.connect(g)
                g.gain.value = v * v
                g.connect(context.destination)
            } else {
                s.connect(context.destination)
            }

            s.start()
            object.s = s
        }
    }

    // utility functions
    function randomRange(min, max) {
        return Math.random() * (max + min) + min
    }

    function rangeMap(x, a1, a2, b1, b2) {
        return ((x - a1) / (a2 - a1)) * (b2 - b1) + b1
    }

    // function frequencyFromNoteNumber (note) {
    //   return 440 * Math.pow(2, (note - 69) / 12)
    // }

    function logger(container, label, data) {
        let messages
        messages = label + ' [channel: ' + (data[0] & 0xf) + ', cmd: ' + (data[0] >> 4) + ', type: ' + (data[0] & 0xf0) + ' , note: ' + data[1] + ' , velocity: ' + data[2] + ']'
        container.textContent = messages
    }
}