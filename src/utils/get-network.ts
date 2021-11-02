export function getNetwork () {
    const networkAndInputsAndOutputs = window['nn']
    return networkAndInputsAndOutputs.slice (1, -1)
}