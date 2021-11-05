import {
  Input,
  Output,
  InputEventNoteoff,
  InputEventNoteon,
} from 'webmidi';
import { PromiseResolver } from '../../coolearning/types';
import { Device, DeviceSettings } from './devices.types';

export const devicePrototype = Object.create (null);

devicePrototype.isInitialized = false as boolean;
devicePrototype.device = null as Device;
devicePrototype.settings = null as DeviceSettings;
devicePrototype.network = null as any;

export type BootSequenceOptions = {
  resolve: PromiseResolver,
  input: Input,
  output: Output,
  playNote: (options: PlayNoteOptions) => void,
  playNotes: (options: PlayNotesOptions) => void,
}

/**
 * @description Run the boot sequence
 */
devicePrototype.runBootSequence = async function (): Promise<void> {
  return new Promise ((resolve) => {
    this.device.input.removeListener ();

    const options: BootSequenceOptions = {
      resolve,
      input: this.device.input,
      output: this.device.output,
      playNote: this.playNote.bind (this),
      playNotes: this.playNotes.bind (this),
    };

    this.settings.bootSequence (options);
  });
};

type PlayNoteOptions = {
  note: number,
  color: number,
  duration?: number,
}

/**
 * @description Utility function to play a note
 * @param {object} options - The options
 * @param {number} options.note - The note to play
 * @param {number} options.color - The color of the note (velocity)
 * @param {number} [options.duration] - The duration of the note
 */
devicePrototype.playNote = function (
  {
    note,
    color,
    duration = 3600000,
  }: PlayNoteOptions,
): void {
  this.device.output.playNote (note, this.settings.channels.output, {
    duration,
    rawVelocity: true,
    velocity: color,
  });
};

type PlayNotesOptions = {
  firstNote: number,
  lastNote: number,
  color: number,
  duration?: number,
}

/**
 * @description Utility function to play multiple notes
 * @param {object} options - The options
 * @param {number} options.firstNote - The first note to play
 * @param {number} options.lastNote - The last note to play
 * @param {number} options.color - The color of the note (velocity)
 * @param {number} options.duration - The duration of the note
 */
devicePrototype.playNotes = function (
  {
    firstNote,
    lastNote,
    color,
    duration = 3600000,
  }: PlayNotesOptions,
): void {
  for (let i = firstNote; i <= lastNote; ++i) {
    this.playNote ({
      note: i,
      duration,
      color,
    });
  }
};

/**
 * @description Utility function to attach an input event to the grid
 * @param {string} noteState - The state of the note to listen to
 * @param {function} listener - The listener function
 */
devicePrototype.onNote = function (
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
};

/**
 * @description Utility function to remove an input event from the grid
 * @param {string} noteState - The state of the note to remove the listener from
 */
devicePrototype.removeOnNote = function (noteState: string): void {
  if (noteState !== 'on' && noteState !== 'off') {
    throw new Error ('note should be either "on" or "off"');
  }

  this.device.input.removeListener (`note${noteState}`);
};

devicePrototype.onControlChange = function (listener) {
  this.device.input.addListener (
    'controlchange',
    this.settings.channels.input,
    (e) => listener (e),
  );
};
