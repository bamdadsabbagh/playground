import { playgroundFacade } from '../playground/playground.facade';

/**
 * Toggle one output of the playground
 *
 * @param {number} outputIndex - index of the output to toggle
 */
export function toggleOutput (outputIndex: number): void {
  const { output } = playgroundFacade.network;

  const inputLink = output.inputLinks[outputIndex];

  if (!inputLink.source.isEnabled) {
    inputLink.isDead = true;
    inputLink.weight = 0;
    return;
  }

  inputLink.isDead = !inputLink.isDead;
  inputLink.weight = !inputLink.isDead
    ? Math.random () - 0.5
    : 0;
}
