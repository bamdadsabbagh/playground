import { playgroundFacade } from '../playground.facade';

export function toggleOutput (outputIndex: number) {
  const {output} = playgroundFacade.network;

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
