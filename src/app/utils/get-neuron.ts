import { getNeuronAndLayerIndexes } from './get-neuron-and-layer-indexes';
import { playgroundFacade } from '../playground.facade';
import { Node } from '../../playground/nn';

type GetNeuron = {
  neuron: Node;
  isEnabled: boolean;
}

/**
 * Get the neuron at the given coordinates.
 *
 * @param {number} nodeIndex - The index of the node.
 * @returns {GetNeuron} Neuron and whether it is enabled.
 */
export function getNeuron (nodeIndex: number): GetNeuron {
  const { neuronIndex, layerIndex } = getNeuronAndLayerIndexes (nodeIndex);

  const { neurons } = playgroundFacade.network;
  const neuron = neurons[layerIndex - 1][neuronIndex - 1];
  const { isEnabled } = neuron;

  return {
    neuron,
    isEnabled,
  };
}
