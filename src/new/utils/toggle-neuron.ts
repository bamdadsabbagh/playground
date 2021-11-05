import * as d3 from 'd3';
import { getNeuron } from './get-neuron';
import { selector } from '../selector';

export function toggleNeuron (neuronIndex: number): void {
  const {neuron, isEnabled} = getNeuron (neuronIndex);

  // todo how to impact node.bias ?

  neuron.isEnabled = !isEnabled;

  // input weights
  neuron.inputLinks.forEach ((link) => {
    // kill if source neuron is disabled
    if (!link.source.isEnabled) {
      link.isDead = true;
      link.savedWeight = link.weight;
      link.weight = 0;
      return;
    }

    if (neuron.isEnabled) {
      link.isDead = false;
      link.weight = link.savedWeight || Math.random () - 0.5;
    } else {
      link.isDead = true;
      link.savedWeight = link.weight;
      link.weight = 0;
    }
  });

  // output weights
  neuron.outputs.forEach ((link) => {
    if (neuron.isEnabled) {
      link.isDead = false;
      link.weight = link.savedWeight || Math.random () - 0.5;
    } else {
      link.isDead = true;
      link.savedWeight = link.weight;
      link.weight = 0;
    }
  });

  // user interface
  const canvas = d3.select (`#canvas-${neuronIndex}`);
  canvas.classed ('disabled', !neuron.isEnabled);

  // midi
  selector.setNeuron ({
    index: neuronIndex,
    isEnabled: neuron.isEnabled,
  });
}
