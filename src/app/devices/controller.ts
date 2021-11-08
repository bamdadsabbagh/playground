import { devicePrototype } from './device.prototype';
import { state } from '../../coolearning/state';
import { updateParameter } from '../../coolearning/utils/update-parameter';
import { getNeuron } from '../utils/get-neuron';
import { rangeMap } from '../../coolearning/utils/range-map';
import { updateWeight } from '../utils/update-weight';
import { playgroundFacade } from '../playground/playground.facade';

/**
 * Controller is a unique device that controls the playground.
 * It has 3 layout modes:
 *   - Default `0`
 *   - Single selection `1`
 *   - Multiple selection `2`
 */
export const controller = Object.create (devicePrototype);

/**
 * Initialize the controller.
 *
 * @param {*} device - The device to initialize.
 * @returns {Promise<void>}
 */
controller.init = async function (device: any): Promise<void> {
  if (this.isInitialized) {
    throw new Error ('controller is already initialized');
  }

  this.device = device;
  this.settings = device.settings;

  await this.runBootSequence ();
  this.drawLights ();
  this.setMode ();
  this.attachButtons ();

  this.isInitialized = true;
};

/**
 * Draw all lights.
 */
controller.drawLights = function () {
  let color;
  if (this.isDefaultMode ()) {
    color = this.settings.colors.amber;
  } else if (this.isSingleMode ()) {
    color = this.settings.colors.black;
  } else {
    color = this.settings.colors.red;
  }

  this.playNotes ({
    firstNote: this.settings.lights.first,
    lastNote: this.settings.lights.last,
    color,
  });
};

/**
 * Set the mode of the controller.
 */
controller.setMode = function () {
  this.clearControl ();

  if (this.isDefaultMode ()) {
    this.setDefaultMode ();
  } else if (this.isSingleMode ()) {
    this.setSingleMode ();
  } else {
    this.setMultipleMode ();
  }
};

/**
 * Set the default mode.
 */
controller.setDefaultMode = function () {
  this.onControl ((e) => {
    const note = parseInt (e.controller.number);
    const { isLearning, learningParameter } = state;
    const parameters = state.getParametersByControl (note);

    if (parameters) {
      parameters.forEach ((parameter) => {
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

    this.playNote ({
      note: this.settings.outputByInput[note],
      duration: this.settings.time.defaultDuration,
      color: this.settings.colors.red,
    });
  });
};

/**
 * Set the single mode.
 */
controller.setSingleMode = function () {
  const selectedNode = playgroundFacade.selectedNodes[0];
  this.attachRangesToNeuron (selectedNode);
};

/**
 * Set the multiple mode.
 */
controller.setMultipleMode = function () {
  const { selectedNodes } = playgroundFacade;
  selectedNodes.forEach ((n) => this.attachRangesToNeuron (n));
};

/**
 * This is called when selection is made.
 */
controller.onSelect = function () {
  this.drawLights ();
  setTimeout (() => {
    this.setMode ();
  }, this.settings.time.wait);
};

/**
 * Attach events to the buttons.
 */
controller.attachButtons = function () {
  this.onNote ('on', (e) => {
    if (!this.isDefaultMode ()) {
      return;
    }

    const note = parseInt (e.note.number);
    const { isLearning, learningParameter } = state;
    const parameters = state.getParametersByControl (note);

    if (parameters) {
      parameters.forEach ((parameter) => {
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
 * Attach events to the ranges.
 *
 * @param {number} selectedNode - The selected node.
 */
controller.attachRangesToNeuron = function (selectedNode: number): void {
  const { neuron } = getNeuron (selectedNode);
  const links = neuron.inputLinks;

  const weights = links.map ((link) => ({
    weight: link.weight,
    hasSnapped: false,
  }));

  // first draw
  weights.forEach ((weight, index) => {
    const note = this.settings.rows.firstButtons[index];
    this.playNote ({
      note,
      color: this.settings.colors.red,
    });
  });

  // listen to changes
  this.onControl ((e) => {
    if (
      e.controller.number >= this.settings.rows.faders[0]
      && e.controller.number <= this.settings.rows.faders[7]
    ) {
      const index = e.controller.number - this.settings.rows.faders[0];
      const { source } = links[index];
      const value = rangeMap (e.value, 0, 127, -1, 1);

      if (value.toFixed (1) === weights[index].weight.toFixed (1)) {
        weights[index].hasSnapped = true;
      }

      if (weights[index].hasSnapped && source.isEnabled) {
        links[index].weight = value;
        updateWeight (index, value);
        this.playNote ({
          note: this.settings.outputByInput[e.controller.number],
          color: this.settings.colors.green,
        });
      } else {
        this.playNote ({
          note: this.settings.outputByInput[e.controller.number],
          color: this.settings.colors.red,
        });
      }
    }
  });
};

controller.isDefaultMode = function () {
  return playgroundFacade.selectedNodes.length === 0;
};

controller.isSingleMode = function () {
  return playgroundFacade.selectedNodes.length === 1;
};

controller.isMultipleMode = function () {
  return playgroundFacade.selectedNodes.length > 1;
};
