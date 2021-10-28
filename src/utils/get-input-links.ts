export function getInputLinks (layer: number, neuron: number) {
    // @ts-ignore
    const network = window.nn
    const selectedLayer = network[layer]
    const selectedNeuron = selectedLayer[neuron - 1]
    return selectedNeuron.inputLinks
}