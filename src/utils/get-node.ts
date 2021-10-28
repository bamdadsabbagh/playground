export function getNode (layer: number, neuron: number) {
    // @ts-ignore
    const network = window.nn
    const selectedLayer = network[layer]
    return selectedLayer[neuron - 1]
}