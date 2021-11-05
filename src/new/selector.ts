import { getNetwork } from './utils/get-network';
import { getNeuronAndLayerIndexes } from './utils/get-neuron-and-layer-indexes';
import { getNeuron } from './utils/get-neuron';
import { toggleOutput } from './utils/toggle-output';
import { selectNode } from './utils/select-node';
import { unselectNode } from './utils/unselect-node';
import { toggleNeuron } from './utils/toggle-neuron';
import { selectInputCanvas } from './utils/select-input-canvas';
import { devicePrototype } from './devices/device.prototype';

export const selector = Object.create (devicePrototype);

selector.grid = null as number[][];

/**
 * @description Initialize the selector
 * @param {*} device - The device to initialize
 */
selector.init = async function (device: any): Promise<void> {
  if (this.isInitialized) {
    throw new Error ('selector is already initialized');
  }

  this.device = device;
  this.settings = device.settings;
  this.network = getNetwork ();
  this.grid = this.settings.grid;

  await this.runBootSequence ();

  this.drawGrid ();
  this.attachEvents ();

  this.isInitialized = true;
};

/**
 * @description First draw of the neural network
 */
selector.drawGrid = function (): void {
  this.drawInputs ();
  this.drawNeurons ();
  this.drawOutputWeights ();
};

/**
 * @description Attach events to the grid
 */
selector.attachEvents = function (): void {
  this.attachInputs ();
  this.attachNeurons ();
  this.attachOutputWeights ();
};

/**
 * @description Draw the inputs
 */
selector.drawInputs = function (): void {
  for (let i = 0; i < this.network.inputs.length; ++i) {
    this.playNote ({
      note: this.grid[0][i],
      color: this.settings.colorByState.inputOn,
    });
  }
};

/**
 * @description Attach events to the inputs
 */
selector.attachInputs = function (): void {
  this.onNote ('on', (e) => {
    const flatIndex = this.getGridFlatIndex (e.note.number);

    if (!(flatIndex >= 0 && flatIndex <= 6)) {
      return;
    }

    const inputNode = this.network.inputs[flatIndex];
    const inputCanvas = selectInputCanvas (inputNode.id);
    inputCanvas.click ();
  });
};

/**
 * @description Setter for the input
 * @param {string} inputName - The name of the input
 * @param {boolean} isEnabled - The state of the input
 */
selector.setInput = function (inputName: string, isEnabled: boolean): void {
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
 * @description Draw the neurons
 */
selector.drawNeurons = function (): void {
  const neuronsLength = this.network.neurons.flat ().length;
  for (let i = 1; i <= neuronsLength; ++i) {
    const {neuronIndex, layerIndex} = getNeuronAndLayerIndexes (i);
    const shiftedIndex = (layerIndex - 1) + 1; // reset, then move to the right
    const note = this.grid[shiftedIndex][neuronIndex - 1];
    const {isEnabled} = getNeuron (neuronIndex);

    this.playNote ({
      note,
      color: isEnabled ? this.settings.colorByState.neuronOn : this.settings.colorByState.neuronOff,
    });
  }
};

/**
 * @description Attach events to the neurons
 */
selector.attachNeurons = function (): void {
  this.onNote ('on', (e) => {
    const flatIndex = this.getGridFlatIndex (e.note.number);

    if (!(flatIndex >= 8 && flatIndex <= 55)) {
      return;
    }

    const nodeIndex = this.getGridFlatIndex (e.note.number) - 8 + 1;
    const {isEnabled} = getNeuron (nodeIndex);

    // short click only if enabled
    if (isEnabled) {
      if (window['selectedNodes'].indexOf (nodeIndex) === -1) {
        selectNode (nodeIndex);
      } else {
        unselectNode (nodeIndex);
      }
    }

    // long click
    let clickTimer = setTimeout (() => {
      // clear
      clearTimeout (clickTimer);
      clickTimer = null;
      // payload
      unselectNode (nodeIndex);
      toggleNeuron (nodeIndex);
    }, this.settings.time.longClick);

    this.onNote ('off', () => {
      if (clickTimer === null) return;
      clearTimeout (clickTimer);
      clickTimer = null;
      this.clearNote ('off');
    });
  });
};

/**
 * @description Setter for the neuron
 * @param {object} options - The options
 * @param {number} options.index - The index of the neuron
 * @param {boolean} options.isSelected - The state of the neuron
 * @param {boolean} options.isEnabled - The state of the neuron
 */
selector.setNeuron = function (
  {
    index,
    isSelected = undefined,
    isEnabled = undefined,
  }: {
    index: number,
    isSelected?: boolean,
    isEnabled?: boolean,
  },
): void {
  const {neuronIndex, layerIndex} = getNeuronAndLayerIndexes (index);
  const note = this.grid[layerIndex][neuronIndex - 1];

  let color;
  if (isSelected === true) {
    color = this.settings.colorByState.neuronSelected;
  } else if (isEnabled === false) {
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
 * @description Draw the output weights
 */
selector.drawOutputWeights = function (): void {
  const outputWeights = this.network.output.inputLinks;
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
 * @description Attach events to the output weights
 */
selector.attachOutputWeights = function (): void {
  this.onNote ('on', (e) => {
    const flatIndex = this.getGridFlatIndex (e.note.number);

    if (!(flatIndex >= 56 && flatIndex <= 63)) {
      return;
    }

    const weights = this.network.output.inputLinks;
    const index = flatIndex - 56;
    toggleOutput (index);

    const isEnabled = !weights[index].isDead
      && weights[index].weight !== 0;

    this.playNote ({
      note: e.note.number,
      color: isEnabled ? this.settings.colorByState.outputWeightOn : this.settings.colorByState.outputWeightOff,
    });
  });
};

/**
 * @description Utility function to get the flat index of a note
 * @param {number} note - The note to get the flat index of
 * @returns {number} The flat index of the note
 */
selector.getGridFlatIndex = function (note: number): number {
  return this.grid.flat ().indexOf (note);
};
