import { midi } from './midi/midi';
import { devices } from './devices/devices';
import { selector } from './devices/selector';
import { controller } from './devices/controller';
import { playgroundFacade } from './facades/playground.facade';
import { ui } from './ui/ui';

export const app = Object.create (null);

app.isInitialized = false;
app.ui = ui;
app.midi = midi;
app.devices = devices;
app.selector = selector;
app.controller = controller;
app.playground = playgroundFacade;

/**
 * Initialize app
 */
app.init = async function (): Promise<void> {
  if (this.isInitialized) {
    throw new Error ('main is already initialized');
  }

  await ui.init ();
  await midi.init ();
  await this.attachDevices ();

  this.isInitialized = true;

  // eslint-disable-next-line no-console
  console.log (app);
};

/**
 * Attach devices
 */
app.attachDevices = async function () {
  devices.init (midi.ports);
  await Promise.all ([
    selector.init (devices.pickSelector (1)),
    controller.init (devices.pickController (0)),
  ]);
};

/**
 * Reset devices
 */
app.resetDevices = async function () {
  devices.isInitialized = false;
  selector.isInitialized = false;
  controller.isInitialized = false;
  await this.attachDevices ();
};
