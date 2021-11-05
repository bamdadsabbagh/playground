import { midi } from './midi';
import { devices } from './devices';
import { selector } from './selector';
import { controller } from './controller';

export const main = Object.create (null);

main.isInitialized = false;
main.midi = midi;
main.devices = devices;
main.selector = selector;
main.controller = controller;

/**
 * @description Initialize the main object.
 */
main.init = async function (): Promise<void> {
  if (this.isInitialized) {
    throw new Error ('main is already initialized');
  }

  await midi.init ();
  devices.init (midi.devices);

  await Promise.all ([
    selector.init (devices.pickSelector (1)),
    controller.init (devices.pickController (0)),
  ]);

  console.log (main);

  this.isInitialized = true;
};
