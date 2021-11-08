import { getNeuronAndLayerIndexes } from './get-neuron-and-layer-indexes';
import { playgroundAdapter } from '../playground.adapter';

export function getNeuron (nodeIndex: number) {
  const {neuronIndex, layerIndex} = getNeuronAndLayerIndexes (nodeIndex);

  const {neurons} = playgroundAdapter.network;
  const neuron = neurons[layerIndex - 1][neuronIndex - 1];
  const {isEnabled} = neuron;

  return {
    neuron,
    isEnabled,
  };
}
