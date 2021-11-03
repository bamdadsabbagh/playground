import { getNeuronAndLayerIndexes } from './get-neuron-and-layer-indexes'

export function getNeuron (nodeIndex: number) {
    // @ts-ignore
    const network = window.nn
    const {neuronIndex, layerIndex} = getNeuronAndLayerIndexes (nodeIndex)

    const neuron = network[layerIndex][neuronIndex - 1]

    const {isEnabled} = neuron

    return {
        neuron,
        isEnabled,
    }
}