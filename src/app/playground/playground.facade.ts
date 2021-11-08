import {
  network as importedNetwork,
  selectedNodes as importedSelectedNodes,
} from '../../playground/playground';

export const playgroundFacade = Object.create (null);

Object.defineProperty (playgroundFacade, 'network', {
  get () {
    const network = importedNetwork;

    const inputs = network[0];
    const neurons = network.slice (1, -1);
    const output = network[network.length - 1][0];

    return {
      inputs,
      neurons,
      output,
    };
  },
});

Object.defineProperty (playgroundFacade, 'selectedNodes', {
  get () {
    return importedSelectedNodes;
  },
});
