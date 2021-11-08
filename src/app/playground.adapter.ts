import { network as importedNetwork } from '../playground/playground';

export const playgroundAdapter = Object.create (null);

Object.defineProperty (playgroundAdapter, 'network', {
  get: function () {
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
