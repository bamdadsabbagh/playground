import { devicePrototype } from './device/device.prototype';
import { playgroundFacade } from '../facades/playground.facade';
import { networkState } from '../state/network.state';
import { networkUi } from '../ui/network.ui';

export const selectorDevice = Object.create (devicePrototype);

selectorDevice.grid = null as number[][];

/**
 * Initialize the selector
 *
 * @param {*} device - The device to initialize
 */
selectorDevice.init = async function (device: any): Promise<void> {
  if (this.isInitialized) {
    throw new Error ('selector is already initialized');
  }

  this.device = device;
  this.settings = device.settings;
  this.grid = this.settings.grid;

  await this.runBootSequence ();
  this.drawGrid ();
  this.attachEvents ();

  this.isInitialized = true;
};

/**
 * First draw of the neural network
 */
selectorDevice.drawGrid = function (): void {
  this.drawInputs ();
  this.drawNeurons ();
  this.drawOutputWeights ();
};

/**
 * Attach events to the grid
 */
selectorDevice.attachEvents = function (): void {
  this.attachInputs ();
  this.attachNeurons ();
  this.attachOutputWeights ();
};

/**
 * Draw the inputs
 */
selectorDevice.drawInputs = function (): void {
  for (let i = 0; i < networkState.inputs.length; ++i) {
    this.playNote ({
      note: this.grid[0][i],
      color: this.settings.colorByState.inputOn,
    });
  }
};

/**
 * Attach events to the inputs
 */
selectorDevice.attachInputs = function (): void {
  this.onNote ('on', (e) => {
    const flatIndex = this.getGridFlatIndex (e.note.number);

    if (!(flatIndex >= 0 && flatIndex <= 6)) {
      return;
    }

    const { id } = networkState.getInputByIndex (flatIndex);
    networkUi.toggleInput (id, true);
  });
};

/**
 * Setter for the input
 *
 * @param {string} inputName - The name of the input
 * @param {boolean} isEnabled - The state of the input
 */
selectorDevice.setInput = function (inputName: string, isEnabled: boolean): void {
  const map = {
    x: 1,
    y: 2,
    xSquared: 3,
    ySquared: 4,
    xTimesY: 5,
    sinX: 6,
    sinY: 7,
  };

  const note = this.grid[0][map[inputName] - 1];

  this.playNote ({
    note,
    color: isEnabled ? this.settings.colorByState.inputOn : this.settings.colorByState.inputOff,
  });
};

/**
 * Draw the neurons
 */
selectorDevice.drawNeurons = function (): void {
  const neuronsLength = networkState.neurons.flat ().length;
  for (let i = 1; i <= neuronsLength; ++i) {
    const {
      neuronIndex,
      layerIndex,
    } = networkState.getNeuronAndLayerIndexes (i);
    const shiftedIndex = (layerIndex - 1) + 1; // reset, then move to the right
    const note = this.grid[shiftedIndex][neuronIndex - 1];
    const { isEnabled } = networkState.getNeuron (neuronIndex);

    this.playNote ({
      note,
      color: isEnabled ? this.settings.colorByState.neuronOn : this.settings.colorByState.neuronOff,
    });
  }
};

/**
 * Attach events to the neurons
 */
selectorDevice.attachNeurons = function (): void {
  this.onNote ('on', (e) => {
    const flatIndex = this.getGridFlatIndex (e.note.number);

    if (!(flatIndex >= 8 && flatIndex <= 55)) {
      return;
    }

    const nodeIndex = this.getGridFlatIndex (e.note.number) - 8 + 1;
    const { isEnabled } = networkState.getNeuron (nodeIndex);

    // short click only if enabled
    if (isEnabled) {
      if (playgroundFacade.selectedNodes.indexOf (nodeIndex) === -1) {
        playgroundFacade.toggleNodeSelection (nodeIndex, true);
      } else {
        playgroundFacade.toggleNodeSelection (nodeIndex, false);
      }
    }

    // long click
    let clickTimer = setTimeout (() => {
      // clear
      clearTimeout (clickTimer);
      clickTimer = null;
      // payload
      playgroundFacade.toggleNodeSelection (nodeIndex, false);
      networkUi.toggleNeuron (nodeIndex);
    }, this.settings.time.longClick);

    this.onNote ('off', () => {
      if (clickTimer === null) {
        return;
      }
      clearTimeout (clickTimer);
      clickTimer = null;
      this.clearNote ('off');
    });
  });
};

type SetNeuronOptions = {
  index: number;
  isSelected?: boolean;
  isDisabled?: boolean;
}

/**
 * Setter for the neuron
 *
 * @param {SetNeuronOptions} options - The options
 */
selectorDevice.setNeuronColor = function (options: SetNeuronOptions): void {
  const { index } = options;
  const isSelected = options.isSelected || null;
  const isDisabled = options.isDisabled || null;

  const {
    neuronIndex,
    layerIndex,
  } = networkState.getNeuronAndLayerIndexes (index);
  const note = this.grid[layerIndex][neuronIndex - 1];

  let color;
  if (isSelected) {
    color = this.settings.colorByState.neuronSelected;
  } else if (isDisabled) {
    color = this.settings.colorByState.neuronOff;
  } else {
    color = this.settings.colorByState.neuronOn;
  }

  this.playNote ({
    note,
    color,
  });
};

/**
 * Draw the output weights
 */
selectorDevice.drawOutputWeights = function (): void {
  const outputWeights = networkState.output.inputLinks;
  for (let i = 0; i < outputWeights.length; ++i) {
    const note = this.grid[this.grid.length - 1][i];
    const isEnabled = !outputWeights[i].isDead && outputWeights[i].weight !== 0;

    this.playNote ({
      note,
      color: isEnabled ? this.settings.colorByState.outputWeightOn : this.settings.colorByState.outputWeightOff,
    });
  }
};

/**
 * Attach events to the output weights
 */
selectorDevice.attachOutputWeights = function (): void {
  this.onNote ('on', (e) => {
    const flatIndex = this.getGridFlatIndex (e.note.number);

    if (!(flatIndex >= 56 && flatIndex <= 63)) {
      return;
    }

    const weights = networkState.output.inputLinks;
    const index = flatIndex - 56;
    networkState.toggleOutput (index);

    const isEnabled = !weights[index].isDead
      && weights[index].weight !== 0;

    this.playNote ({
      note: e.note.number,
      color: isEnabled ? this.settings.colorByState.outputWeightOn : this.settings.colorByState.outputWeightOff,
    });
  });
};

/**
 * Utility function to get the flat index of a note
 *
 * @param {number} note - The note to get the flat index of
 * @returns {number} The flat index of the note
 */
selectorDevice.getGridFlatIndex = function (note: number): number {
  return this.grid.flat ().indexOf (note);
};