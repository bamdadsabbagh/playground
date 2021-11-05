import { midi } from './midi';
import { devices } from './devices/devices';
import { selector } from './devices/selector';

export const main: any = {
  isLoaded: false,

  midi,
  devices,

  /**
   * @description Initialize the main object.
   */
  init: async function (): Promise<void> {
    if (this.isLoaded) {
      return;
    }

    await midi.init ();
    devices.init (midi.devices);
    await selector.init (devices.getSelector (1));

    this.isLoaded = true;

    console.log (main);
  },
};