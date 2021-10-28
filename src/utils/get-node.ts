import { getNeuronAndLayerIndexes } from './get-neuron-and-layer-indexes'

export function getNode (nodeIndex: number) {
    // @ts-ignore
    const network = window.nn
    const {neuronIndex, layerIndex} = getNeuronAndLayerIndexes (nodeIndex)
    return network[layerIndex][neuronIndex - 1]
}