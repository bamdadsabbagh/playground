import * as d3 from 'd3';
import { getNeuron } from './get-neuron';
import { selector } from '../selector';

export function toggleNeuron (neuronIndex: number): void {
  const {neuron, isEnabled} = getNeuron (neuronIndex);

  // todo how to impact node.bias ?

  neuron.isEnabled = !isEnabled;

  neuron.inputLinks.forEach (inputLink => {

    if (!inputLink.source.isEnabled) {
      inputLink.isDead = true;
      inputLink.weight = 0;
      return;
    }

    inputLink.isDead = !neuron.isEnabled;
    inputLink.weight = neuron.isEnabled
      ? Math.random () - 0.5
      : 0;
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