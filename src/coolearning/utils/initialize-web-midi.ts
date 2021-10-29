import * as WebMidi from 'webmidi'

export function initializeWebMidi () {
    const wm = WebMidi as any
    const allowedManufacturers = [
        'Focusrite - Novation',
    ]
    const allowedDevices = [
        'Launchpad X',
    ]
    let inputs = []
    let outputs = []
    const sysexEnabled = false // if true, will ask browser permission

    const getDevicePermission = (device): boolean => {
        // device is an input or output

        const manufacturerIsAllowed = allowedManufacturers
            .filter (m => m === device.manufacturer)
            .length !== 0

        if (!manufacturerIsAllowed) return false

        // device is allowed?
        return allowedDevices
            .filter (d => device.name.includes (d))
            .length !== 0
    }

    const a = (err) => {
        if (err) {
            console.log ('WebMidi could not be enabled.', err)
        } else {
            console.log ('WebMidi enabled!')
        }

        wm.addListener ('connected', (e) => console.log (e))
        wm.addListener ('disconnected', (e) => console.log (e))
        console.log (wm.time)

        wm.inputs.forEach (input => {
            const isAllowed = getDevicePermission (input)
            if (!isAllowed) return
            inputs.push (input)
        })

        wm.outputs.forEach (output => {
            const isAllowed = getDevicePermission (output)
            if (!isAllowed) return
            outputs.push (output)
        })

        const input = inputs[1]
        const output = outputs[1]

        console.log ({inputs, outputs})

        input.on ('noteon', 1, (e) => console.log ('note', e))

        const firstPadIndex = 11
        const lastPadIndex = 99

        const colors = {
            black: 0,
            silver: 2,
            gray: 1,
            white: 3,
            maroon: 83,
            red: 5,
            purple: 81,
            fuchsia: 53,
            olive: 15,
            lime: 21,
            green: 23,
            yellow: 13,
            navy: 47,
            blue: 67,
            teal: 35,
            turquoise: 38,
            aqua: 37,
        }

        for (let i = firstPadIndex; i <= lastPadIndex; ++i) {
            output.playNote (i, 1, {
                duration: 2000,
                rawVelocity: true,
                velocity: colors[Object.keys (colors)[i % (Object.keys (colors).length - 1)]],
            })
        }
    }

    wm.enable (a, sysexEnabled)
}