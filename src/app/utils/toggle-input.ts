import { selector } from '../devices/selector';
import { playgroundFacade } from '../playground.facade';

/**
 * Toggles the inputs / features of the playground.
 *
 * @param {number|string} inputIndexOrIdentifier - The index or identifier of the input to toggle.
 */
export function toggleInput (inputIndexOrIdentifier: number | string): void {
  const { inputs } = playgroundFacade.network;

  let input;
  if (typeof inputIndexOrIdentifier === 'string') {
    input = inputs.filter ((input) => input.id === inputIndexOrIdentifier)[0];
  } else if (typeof inputIndexOrIdentifier === 'number') {
    input = inputs[inputIndexOrIdentifier];
  }

  const { isEnabled } = input;

  input.isEnabled = !isEnabled;

  input.outputs.forEach ((outputLink) => {
    if (!outputLink.dest.isEnabled) {
      outputLink.isDead = true;
      outputLink.weight = 0;
      return;
    }

    outputLink.isDead = !input.isEnabled;
    outputLink.weight = input.isEnabled
      ? Math.random () - 0.5
      : 0;
  });

  // midi
  selector.setInput (input.id, input.isEnabled);
}
