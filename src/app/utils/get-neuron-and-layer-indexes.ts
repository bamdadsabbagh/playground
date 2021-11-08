export function getNeuronAndLayerIndexes (nodeIndex: number) {
    if (typeof nodeIndex !== 'number') throw new Error ('nodeIndex is not a number')
    const neuronsPerLayer = 8
    const layerIndex = Math.trunc ((nodeIndex - 1) / neuronsPerLayer) + 1
    const neuronIndex = nodeIndex % neuronsPerLayer === 0
        ? neuronsPerLayer
        : nodeIndex % neuronsPerLayer

    return {
        neuronIndex,
        layerIndex,
    }
}