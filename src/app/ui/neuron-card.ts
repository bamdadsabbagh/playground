import * as d3 from 'd3';
import { playgroundFacade } from '../facades/playground.facade';
import { networkState } from '../state/network.state';

export const neuronCard = Object.create (null);

neuronCard.weightSelector = '.neuron-card__weight';
neuronCard.weights = null;
neuronCard.cardSelector = '#neuron-card';
neuronCard.card = null;

neuronCard.init = function () {
  this.fetchWeights ();
  this.fetchCard ();
};

neuronCard.fetchCard = function () {
  this.card = d3.select ('#neuron-card');
};

neuronCard.fetchWeights = function () {
  this.weights = document.querySelectorAll (this.weightSelector);
};

neuronCard.updateCard = function (nodeIndex: number) {
  const { selectedNodes } = playgroundFacade;

  if (selectedNodes.length === 0) {
    this.card.style ('display', 'none');
    return;
  }

  this.card.style ('display', 'flex');

  const nodeTitle = this.card.select ('.node');
  const inputs = this.card.selectAll ('input')[0];

  nodeTitle.text (
    selectedNodes.length === 1
      ? `Node: ${selectedNodes[0]}`
      : `Nodes: ${
        selectedNodes
          .sort ((a, b) => a - b)
          .join (', ')
      }`,
  );

  const { neuron } = networkState.getNeuron (nodeIndex);
  const inputPlaceholder = 'ø or multi.';

  const biasInput = inputs[0] as HTMLInputElement;
  biasInput.placeholder = inputPlaceholder;
  biasInput.value = selectedNodes.length === 1
    ? neuron.bias.toPrecision (2)
    : null;

  const { inputLinks } = neuron;
  inputs.slice (1).forEach ((input: HTMLInputElement, k) => {
    if (typeof inputLinks[k] === 'undefined') {
      input.value = null;
      input.placeholder = inputPlaceholder;
      input.disabled = true;
      return;
    }

    input.disabled = false;

    if (selectedNodes.length > 1) {
      input.value = null;
      input.placeholder = inputPlaceholder;
      return;
    }

    input.value = inputLinks[k].weight.toPrecision (2);
  });
};

neuronCard.updateWeight = function (index, weight) {
  this.weights[index].value = weight.toPrecision (2);
};
