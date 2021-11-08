import * as d3 from 'd3';
import {
  removeFromSelectedNodes,
  updateNeuronCard,
} from '../../playground/playground';
import { selector } from '../devices/selector';
import { controller } from '../devices/controller';

/**
 * Unselects a node.
 *
 * @param {number} nodeId - The id of the node to unselect.
 */
export function unselectNode (nodeId: number): void {
  if (typeof nodeId !== 'number') {
    throw new Error ('nodeId is not a number');
  }

  // state
  removeFromSelectedNodes (nodeId);

  // class
  const canvas = d3.select (`#canvas-${nodeId}`);
  canvas.classed ('selected', false);

  // neuron card
  updateNeuronCard ({ nodeId });

  // midi
  selector.setNeuron ({
    index: nodeId,
    isSelected: false,
  });

  controller.onSelect ();
}
