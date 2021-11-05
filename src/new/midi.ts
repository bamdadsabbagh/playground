import * as WebMidi from 'webmidi';
import { getKnownDeviceInfo } from './devices/utils/get-known-device-info';
import { Device, Devices } from './devices/devices.types';
import { Input, Output } from 'webmidi';

export const midi = Object.create (null);

midi.isInitialized = false as boolean;
midi.service = WebMidi as typeof WebMidi;
midi.sysexEnabled = true as boolean;
midi.inputs = null as Input[];
midi.outputs = null as Output[];
midi.devices = null as Devices;

/**
 * @description Initialize MIDI
 */
midi.init = function (): Promise<void> {
  if (this.isInitialized) {
    throw new Error ('midi is already initialized');
  }

  return new Promise ((resolve) => {
    this.service.enable ((error) => {
      if (error) {
        throw new Error ('WebMidi could not be loaded' + error);
      }

      this.inputs = this.service.inputs;
      this.outputs = this.service.outputs;

      this.service.addListener ('connected', () => this.handleConnected ());
      this.service.addListener ('disconnected', () => this.handleDisconnected ());

      this.isInitialized = true;
      resolve (null);
    }, this.sysexEnabled);
  });
};

/**
 * @description Handle connected MIDI device
 */
midi.handleConnected = function (): void {
  this.inputs.forEach ((input) => this.onConnect (input));
  this.outputs.forEach ((output) => this.onConnect (output));
  this.setDevices ();
};

/**
 * @description Handle disconnected MIDI device
 */
midi.handleDisconnected = function (): void {
  this.inputs.forEach ((input) => {
    input.isConnected = false;
  });
  this.outputs.forEach ((output) => {
    output.isConnected = false;
  });
};

/**
 * @description Set known devices
 */
midi.setDevices = function () {
  const knownInputs = this.inputs.filter ((input) => input.isKnown && input.isConnected);
  const knownInputsByName = this.sortPortsByName (knownInputs);

  const knownOutputs = this.outputs.filter ((output) => output.isKnown && output.isConnected);
  const knownOutputsByName = this.sortPortsByName (knownOutputs);

  this.devices = Object.keys (knownInputsByName).reduce ((acc, name) => {
    const knownInput = knownInputsByName[name];
    const knownOutput = knownOutputsByName[name];

    const isController = knownInput.every ((input) => input.isController) &&
      knownOutput.every ((output) => output.isController);
    const isSelector = knownInput.every ((input) => input.isSelector) &&
      knownOutput.every ((output) => output.isSelector);

    acc[name] = {
      isController,
      isSelector,
      isUsed: false,
      input: knownInput[0],
      output: knownOutput[0],
    } as Device;

    return acc;
  }, {});
};

/**
 * @description Utility function to handle input and output connections
 * @param {*} inputOrOutput - The MIDI input or output
 */
midi.onConnect = function (inputOrOutput): void {
  const {manufacturer, name} = inputOrOutput;
  const {
    isKnown,
    isController,
    isSelector,
    settings,
  } = getKnownDeviceInfo (manufacturer, name);

  inputOrOutput.isConnected = true;

  if (isKnown) {
    inputOrOutput.isKnown = true;
    inputOrOutput.isController = isController;
    inputOrOutput.isSelector = isSelector;
    inputOrOutput.settings = settings;
  } else {
    inputOrOutput.isKnown = false;
  }
};

/**
 * @description Utility function to sort MIDI ports by name
 * @param {*} inputOrOutputs - The MIDI inputs or outputs
 */
midi.sortPortsByName = function (inputOrOutputs): any {
  return inputOrOutputs.reduce ((acc, inputOrOutput) => {
    const name = inputOrOutput.name;
    if (!acc[name]) {
      acc[name] = [];
    }
    acc[name].push (inputOrOutput);
    return acc;
  }, {});
};
