import { devicePrototype } from './device.prototype';
import { state } from '../../coolearning/state';
import { updateParameter } from '../../coolearning/utils/update-parameter';
import { getNeuron } from '../utils/get-neuron';
import { rangeMap } from '../../coolearning/utils/range-map';
import { updateWeight } from '../utils/update-weight';
import { playgroundFacade } from '../playground.facade';

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
  this.attachEvents ();

  setTimeout (() => {
    this.changeLights ();
  }, this.settings.time.wait);

  this.isInitialized = true;
};

/**
 * Attach events to the controller.
 */
controller.attachEvents = function () {
  this.attachButtons ();
  this.attachRanges ();
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
 */
controller.attachRanges = function () {
  const { selectedNodes } = playgroundFacade;

  this.clearControl ();

  if (selectedNodes.length === 0) {
    this.attachRangesDefault ();
  } else if (selectedNodes.length === 1) {
    this.attachRangesToNeuron ();
  } else {
    this.attachRangesToNeurons ();
  }
};

/**
 * Attach events to the ranges.
 */
controller.attachRangesDefault = function () {
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
 * Attach events to the ranges to a single neuron
 */
controller.attachRangesToNeuron = function () {
  const selectedNode = playgroundFacade.selectedNodes[0];
  this.applyRangesToNeuron (selectedNode);
};

/**
 * Attach events to the ranges to multiple neurons
 */
controller.attachRangesToNeurons = function () {
  const { selectedNodes } = playgroundFacade;
  selectedNodes.forEach ((n) => this.applyRangesToNeuron (n));
};

/**
 * This is called when selection is made.
 */
controller.onSelect = function () {
  this.changeLights ();
  setTimeout (() => {
    this.attachRanges ();
  }, this.settings.time.wait);
};

/**
 * Change all lights.
 */
controller.changeLights = function () {
  const { selectedNodes } = playgroundFacade;

  let color;
  if (selectedNodes.length === 0) {
    color = this.settings.colors.amber;
  } else if (selectedNodes.length === 1) {
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
 * Apply ranges to a single neuron.
 *
 * @param {number} selectedNode - The selected node.
 */
controller.applyRangesToNeuron = function (selectedNode: number): void {
  const { neuron } = getNeuron (selectedNode);
  const links = neuron.inputLinks;

  const weights = links.map ((link) => ({
    weight: link.weight,
    hasSnapped: false,
  }));
  // weights = Object.keys (weights).map ((key) => ({
  //   weight: weights[key],
  //   hasSnapped: false,
  // }));

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
      const value = rangeMap (e.value, 0, 127, -1, 1);

      if (value.toFixed (1) === weights[index].weight.toFixed (1)) {
        weights[index].hasSnapped = true;
      }

      if (weights[index].hasSnapped) {
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
