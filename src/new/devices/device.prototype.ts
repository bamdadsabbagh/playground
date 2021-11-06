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
 * Run the boot sequence
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
 * Utility function to play a note
 * @param {PlayNoteOptions} options - The options
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
 * Utility function to play multiple notes
 * @param {PlayNotesOptions} options - The options
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
 * Utility function to attach an input event to the device
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
 * Utility function to remove an input event from the device
 * @param {string} noteState - The state of the note to remove the listener from
 */
devicePrototype.clearNote = function (noteState: string): void {
  if (noteState !== 'on' && noteState !== 'off') {
    throw new Error ('note should be either "on" or "off"');
  }

  this.device.input.removeListener (`note${noteState}`);
};

/**
 * Utility function to attach an input event to the device
 * @param listener
 */
devicePrototype.onControl = function (listener) {
  this.device.input.addListener (
    'controlchange',
    this.settings.channels.input,
    (e) => listener (e),
  );
};

/**
 * Utility function to remove an input event from the device
 */
devicePrototype.clearControl = function () {
  this.device.input.removeListener ('controlchange');
};
