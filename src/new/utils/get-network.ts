export function getNetwork () {
    const network = window['nn']

    const inputs = network[0]
    const neurons = network.slice (1, -1)
    const output = network[network.length - 1][0]

    return {
        inputs,
        neurons,
        output,
    }
}