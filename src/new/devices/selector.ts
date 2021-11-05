import { getNetwork } from '../utils/get-network';
import { getNeuronAndLayerIndexes } from '../utils/get-neuron-and-layer-indexes';
import { getNeuron } from '../utils/get-neuron';
import { toggleOutput } from '../utils/toggle-output';
import { selectNode } from '../utils/select-node';
import { unselectNode } from '../utils/unselect-node';
import { toggleNeuron } from '../utils/toggle-neuron';
import { selectInputCanvas } from '../utils/select-input-canvas';
import { InputEventNoteoff, InputEventNoteon } from 'webmidi';

export const selector = {
  device: null as object,
  isReady: false as boolean,
  settings: null as object,
  grid: null as number[][],
  network: null as any,

  /**
   * @description Initialize the selector
   * @param {*} device - The device to initialize
   */
  init: async function (device: any): Promise<void> {
    this.device = device;
    this.settings = device.settings;
    this.grid = this.settings.grid;
    this.network = getNetwork ();

    await this.runBootSequence ();

    this.isReady = true;

    this.drawGrid ();
    this.attachEvents ();
  },

  /**
   * @description Run the boot sequence
   */
  runBootSequence: async function (): Promise<void> {
    return new Promise ((resolve) => {
      this.device.input.removeListener ();
      this.settings.bootSequence ({
        resolve,
        input: this.device.input,
        output: this.device.output,
        playNote: this.playNote.bind (this),
        playNotes: this.playNotes.bind (this),
      });
    });
  },

  /**
   * @description First draw of the neural network
   */
  drawGrid: function (): void {
    this.drawInputs ();
    this.drawNeurons ();
    this.drawOutputWeights ();
  },

  /**
   * @description Attach events to the grid
   */
  attachEvents: function (): void {
    this.attachInputs ();
    this.attachNeurons ();
    this.attachOutputWeights ();
  },

  /**
   * @description Draw the inputs
   */
  drawInputs: function (): void {
    for (let i = 0; i < this.network.inputs.length; ++i) {
      this.playNote ({
        note: this.grid[0][i],
        color: this.settings.colorByState.inputOn,
      });
    }
  },

  /**
   * @description Attach events to the inputs
   */
  attachInputs: function (): void {
    this.onNote ('on', (e) => {
      const flatIndex = this.getGridFlatIndex (e.note.number);

      if (!(flatIndex >= 0 && flatIndex <= 6)) {
        return;
      }

      const inputNode = this.network.inputs[flatIndex];
      const inputCanvas = selectInputCanvas (inputNode.id);
      inputCanvas.click ();
    });
  },

  /**
   * @description Setter for the input
   * @param {string} inputName - The name of the input
   * @param {boolean} isEnabled - The state of the input
   */
  setInput: function (inputName: string, isEnabled: boolean): void {
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
  },

  /**
   * @description Draw the neurons
   */
  drawNeurons: function (): void {
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
  },

  /**
   * @description Attach events to the neurons
   */
  attachNeurons: function (): void {
    this.onNote ('on', (e) => {
      const flatIndex = this.getGridFlatIndex (e.note.number);

      if (!(flatIndex >= 8 && flatIndex <= 55)) {
        return;
      }

      const nodeIndex = this.getGridFlatIndex (e.note.number) - 8 + 1;
      const {isEnabled} = getNeuron (nodeIndex);

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
        this.removeOnNote ('off');
      });
    });
  },

  /**
   * @description Setter for the neuron
   * @param {object} options - The options
   * @param {number} options.index - The index of the neuron
   * @param {boolean} options.isSelected - The state of the neuron
   * @param {boolean} options.isEnabled - The state of the neuron
   */
  setNeuron: function (
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
    if (isSelected) {
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
  },

  /**
   * @description Draw the output weights
   */
  drawOutputWeights: function (): void {
    const outputWeights = this.network.output.inputLinks;
    for (let i = 0; i < outputWeights.length; ++i) {
      const note = this.grid[this.grid.length - 1][i];
      const isEnabled = !outputWeights[i].isDead && outputWeights[i].weight !== 0;

      this.playNote ({
        note,
        color: isEnabled ? this.settings.colorByState.outputWeightOn : this.settings.colorByState.outputWeightOff,
      });
    }
  },

  /**
   * @description Attach events to the output weights
   */
  attachOutputWeights: function (): void {
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
  },

  /**
   * @description Utility function to play a note
   * @param {object} options - The options
   * @param {number} options.note - The note to play
   * @param {number} options.color - The color of the note (velocity)
   * @param {number} [options.duration] - The duration of the note
   */
  playNote: function (
    {
      note,
      color,
      duration = 3600000,
    }: {
      note: number,
      color: number,
      duration?: number,
    },
  ): void {
    this.device.output.playNote (note, this.settings.channels.output, {
      duration,
      rawVelocity: true,
      velocity: color,
    });
  },

  /**
   * @description Utility function to play multiple notes
   * @param {object} options - The options
   * @param {number} options.firstNote - The first note to play
   * @param {number} options.lastNote - The last note to play
   * @param {number} options.color - The color of the note (velocity)
   * @param {number} options.duration - The duration of the note
   */
  playNotes: function (
    {
      firstNote,
      lastNote,
      color,
      duration = 3600000,
    }: {
      firstNote: number,
      lastNote: number,
      color: number,
      duration?: number,
    },
  ): void {
    for (let i = firstNote; i <= lastNote; ++i) {
      this.playNote ({
        note: i,
        duration,
        color,
      });
    }
  },

  /**
   * @description Utility function to get the flat index of a note
   * @param {number} note - The note to get the flat index of
   * @returns {number} The flat index of the note
   */
  getGridFlatIndex: function (note: number): number {
    return this.grid.flat ().indexOf (note);
  },

  /**
   * @description Utility function to attach an input event to the grid
   * @param {string} noteState - The state of the note to listen to
   * @param {function} listener - The listener function
   */
  onNote: function (
    noteState: string = 'on',
    listener: (e: InputEventNoteon | InputEventNoteoff) => any,
  ): void {
    if (noteState !== 'on' && noteState !== 'off') {
      throw new Error ('note should be either "on" or "off"');
    }

    this.device.input.addListener (
      `note${noteState}`,
      this.settings.channels.input,
      (e) => listener (e),
    );
  },

  /**
   * @description Utility function to remove an input event from the grid
   * @param {string} noteState - The state of the note to remove the listener from
   */
  removeOnNote: function (noteState: string): void {
    if (noteState !== 'on' && noteState !== 'off') {
      throw new Error ('note should be either "on" or "off"');
    }

    this.device.input.removeListener (`note${noteState}`);
  },
};