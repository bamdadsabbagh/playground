import * as d3 from 'd3';
import {
  addToSelectedNodes,
  updateNeuronCard,
} from '../../playground/playground';
import { selector } from '../devices/selector';
import { controller } from '../devices/controller';

/**
 * Selects a node and adds it to the selected nodes list.
 *
 * @param {number} nodeId - The id of the node to select.
 */
export function selectNode (nodeId: number): void {
  if (typeof nodeId !== 'number') {
    throw new Error ('nodeId is not a number');
  }

  // state
  addToSelectedNodes (nodeId);

  // class
  const canvas = d3.select (`#canvas-${nodeId}`);
  canvas.classed ('selected', true);

  // neuron card
  updateNeuronCard ({ nodeId });

  // midi
  selector.setNeuron ({
    index: nodeId,
    isSelected: true,
  });

  controller.onSelect ();
}
