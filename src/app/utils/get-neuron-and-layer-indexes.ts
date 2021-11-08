type GetNeuronAndLayerIndexes = {
  neuronIndex: number;
  layerIndex: number;
}

/**
 * Get the neuron and layer indexes from a neuron id.
 *
 * @param {number} nodeIndex - The neuron id.
 * @returns {GetNeuronAndLayerIndexes} The neuron and layer indexes.
 */
export function getNeuronAndLayerIndexes (nodeIndex: number): GetNeuronAndLayerIndexes {
  if (typeof nodeIndex !== 'number') {
    throw new Error ('nodeIndex is not a number');
  }

  const neuronsPerLayer = 8;
  const layerIndex = Math.trunc ((nodeIndex - 1) / neuronsPerLayer) + 1;
  const neuronIndex = nodeIndex % neuronsPerLayer === 0
    ? neuronsPerLayer
    : nodeIndex % neuronsPerLayer;

  return {
    neuronIndex,
    layerIndex,
  };
}
