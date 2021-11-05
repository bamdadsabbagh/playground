import { updateNeuronCard } from '../../playground/playground';
import * as d3 from 'd3';
import { selector } from '../selector';
import { controller } from '../controller';

export function unselectNode (nodeId: number): void {
  if (typeof nodeId !== 'number') throw new Error ('nodeId is not a number');

  // state
  window['selectedNodes'] = window['selectedNodes'].filter (n => n !== nodeId);

  // class
  const canvas = d3.select (`#canvas-${nodeId}`);
  canvas.classed ('selected', false);

  // neuron card
  updateNeuronCard ({nodeId});

  // midi
  selector.setNeuron ({
    index: nodeId,
    isSelected: false,
  });

  controller.redrawOnNeuronSelectionChange ();
}
