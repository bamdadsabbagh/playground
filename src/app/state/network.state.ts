import { playgroundFacade } from '../facades/playground.facade';

/**
 * State object for the network.
 * It contains nodes.
 * Nodes are either inputs, neurons or output.
 */
export const networkState = Object.create (null);

Object.defineProperty (networkState, 'nodes', {
  get () {
    return playgroundFacade.network;
  },
});

Object.defineProperty (networkState, 'inputs', {
  get () {
    return this.nodes[0];
  },
});

Object.defineProperty (networkState, 'neurons', {
  get () {
    return this.nodes.slice (1, -1);
  },
});

Object.defineProperty (networkState, 'output', {
  get () {
    return this.nodes[this.nodes.length - 1][0];
  },
});

type GetNeuronAndLayerIndexes = {
  neuronIndex: number;
  layerIndex: number;
}

/**
 * Get the neuron and layer indexes from the node id.
 *
 * @param {number} nodeIndex - The node index.
 * @returns {GetNeuronAndLayerIndexes} - The neuron and layer indexes.
 */
networkState.getNeuronAndLayerIndexes = function (nodeIndex: number): GetNeuronAndLayerIndexes {
  if (typeof nodeIndex !== 'number') {
    throw new Error ('nodeIndex is not a number');
  }

  const neuronsPerLayer = 8;
  const layerIndex = Math.trunc ((nodeIndex - 1) / neuronsPerLayer) + 1;

  let neuronIndex;
  if (nodeIndex % neuronsPerLayer === 0) {
    neuronIndex = neuronsPerLayer;
  } else {
    neuronIndex = nodeIndex % neuronsPerLayer;
  }

  return {
    neuronIndex,
    layerIndex,
  };
};

type GetNeuron = {
  neuron: Node;
  isEnabled: boolean;
}

/**
 * Get the neuron object from the node id.
 *
 * @param {number} nodeIndex - The node index.
 * @returns {GetNeuron} - The neuron object and whether it is enabled.
 */
networkState.getNeuron = function (nodeIndex: number): GetNeuron {
  const { neuronIndex, layerIndex } = this.getNeuronAndLayerIndexes (nodeIndex);
  const neuron = this.neurons[layerIndex - 1][neuronIndex - 1];
  const { isEnabled } = neuron;
  return {
    neuron,
    isEnabled,
  };
};
