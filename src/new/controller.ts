import { getNetwork } from './utils/get-network';
import { devicePrototype } from './devices/device.prototype';
import { state } from '../coolearning/state/state';
import { updateParameter } from '../coolearning/utils/update-parameter';

export const controller = Object.create (devicePrototype);

/**
 * @description Initialize the controller.
 * @param {*} device
 */
controller.init = async function (device: any): Promise<void> {
  if (this.isInitialized) {
    throw new Error ('controller is already initialized');
  }

  this.device = device;
  this.settings = device.settings;
  this.network = getNetwork ();

  await this.runBootSequence ();

  this.attachEvents ();

  this.isInitialized = true;
};

/**
 * @description Attach events to the controller.
 */
controller.attachEvents = function () {
  this.attachButtons ();
  this.attachRanges ();
};

/**
 * @description Attach events to the buttons.
 */
controller.attachButtons = function () {
  this.onNote ('on', (e) => {
    const note = parseInt (e.note.number);
    const {isLearning, learningParameter} = state;
    const parameters = state.getParametersByControl (note);

    if (parameters) {
      parameters.forEach (parameter => {
        updateParameter ({
          parameter,
          value: 1,
        });
      });
    }

    if (isLearning && learningParameter) {
      state.learn ({
        parameter: learningParameter,
        control: note,
        type: 'button',
      });
    }

    this.playNote ({
      note,
      color: this.settings.colors.green,
      duration: this.settings.time.defaultDuration,
    });
  });
};

/**
 * @description Attach events to the ranges.
 */
controller.attachRanges = function () {
  this.onControlChange ((e) => {
    const note = parseInt (e.controller.number);
    const {isLearning, learningParameter} = state;
    const parameters = state.getParametersByControl (note);

    if (parameters) {
      parameters.forEach (parameter => {
        updateParameter ({
          parameter,
          value: e.value,
        });
      });
    }

    if (isLearning && learningParameter) {
      state.learn ({
        parameter: learningParameter,
        control: note,
        type: 'range',
      });
    }

    let color;
    if (
      note >= this.settings.rangeKeys.first
      && note <= this.settings.rangeKeys.last
    ) {
      color = this.settings.colors.amber;
    } else {
      color = this.settings.colors.green;
    }

    this.playNote ({
      note: this.settings.outputByInput[note],
      duration: this.settings.time.defaultDuration,
      color,
    });
  });
};

/**
 * @description Redraw when the neuron selection state changes.
 */
controller.redrawOnNeuronSelectionChange = function () {
  const selectedNodes = window['selectedNodes'];

  let color;
  if (selectedNodes.length === 0) {
    color = this.settings.colors.black;
  } else if (selectedNodes.length === 1) {
    color = this.settings.colors.green;
  } else {
    color = this.settings.colors.amber;
  }

  this.playNotes ({
    firstNote: this.settings.lights.first,
    lastNote: this.settings.lights.last,
    color,
  });
};
