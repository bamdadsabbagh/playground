import * as d3 from 'd3';
import {
  addToSelectedNodes,
  removeFromSelectedNodes,
  network as importedNetwork,
  selectedNodes as importedSelectedNodes,
} from '../../playground/playground';
import { neuronCard } from '../ui/neuron-card';
import { selector } from '../devices/selector';
import { controller } from '../devices/controller';

export const playgroundFacade = Object.create (null);

Object.defineProperty (playgroundFacade, 'network', {
  get () {
    return importedNetwork;
  },
});

Object.defineProperty (playgroundFacade, 'selectedNodes', {
  get () {
    return importedSelectedNodes;
  },
});

playgroundFacade.toggleNodeSelection = function (nodeIndex: number, isSelected: boolean) {
  if (typeof nodeIndex !== 'number') {
    throw new Error ('nodeId is not a number');
  }

  // playground local state
  if (isSelected) {
    addToSelectedNodes (nodeIndex);
  } else {
    removeFromSelectedNodes (nodeIndex);
  }

  // class
  const canvas = d3.select (`#canvas-${nodeIndex}`);
  canvas.classed ('selected', isSelected);

  neuronCard.updateCard (nodeIndex);

  selector.setNeuron ({
    index: nodeIndex,
    isSelected,
  });

  controller.onSelect ();
};
