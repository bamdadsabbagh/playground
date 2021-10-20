import MidiScript from "./MidiScript";

export function Midi() {
    const keyData = document.createElement('div')
    keyData.id = 'key_data'
    document.body.appendChild(keyData)

    const inputs = document.createElement('div')
    inputs.id = 'inputs'
    inputs.style.display = 'none'
    document.body.appendChild(inputs)

    const outputs = document.createElement('div')
    outputs.id = 'outputs'
    outputs.style.display = 'none'
    document.body.appendChild(outputs)

    MidiScript()
}