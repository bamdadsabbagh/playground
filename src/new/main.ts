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
 * @description Initialize main
 */
main.init = async function (): Promise<void> {
  if (this.isInitialized) {
    throw new Error ('main is already initialized');
  }
  await midi.init ();
  await this.attachDevices ();
  this.isInitialized = true;
  console.log (main);
};

/**
 * @description Attach devices
 */
main.attachDevices = async function () {
  devices.init (midi.ports);
  await Promise.all ([
    selector.init (devices.pickSelector (1)),
    controller.init (devices.pickController (0)),
  ]);
};

/**
 * @description Reset devices
 */
main.resetDevices = async function () {
  devices.isInitialized = false;
  selector.isInitialized = false;
  controller.isInitialized = false;
  await this.attachDevices ();
};
