import { getNeuronAndLayerIndexes } from './get-neuron-and-layer-indexes'

export function getNode (nodeIndex: number) {
    // @ts-ignore
    const network = window.nn
    const {neuronIndex, layerIndex} = getNeuronAndLayerIndexes (nodeIndex)

    const node = network[layerIndex][neuronIndex - 1]

    const isDead = node.inputLinks
        .filter (l => l.isDead === true)
        .length !== 0

    return {
        node,
        isDead,
    }
}