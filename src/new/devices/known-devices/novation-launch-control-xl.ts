import { DeviceSettings, DeviceCategory } from '../devices.types';

export type NovationLaunchControlXl = DeviceSettings & {
  rangeKeys: {
    first: number,
    last: number,
  },
  outputByInput: {
    [output: number]: number,
  }
}

/**
 * @description Novation Launch Control XL
 * @see Programmer's Reference https://resource.novationmusic.com/sites/default/files/novation/downloads/9922/launch-control-xl-programmers-reference-guide.pdf
 */
export const novationLaunchControlXl: NovationLaunchControlXl = {
  category: DeviceCategory.control,
  manufacturer: 'Focusrite A.E. Ltd',
  name: 'Launch Control XL',
  channels: {
    input: 'all',
    output: 'all',
  },
  lights: {
    first: 1,
    last: 127,
  },
  colors: {
    off: 12,
    black: 12,
    red: 15,
    amber: 63,
    yellow: 62,
    green: 60,
  },
  time: {
    wait: 50,
    deviceReady: 2000,
    defaultDuration: 1000,
  },
  rangeKeys: {
    first: 77,
    last: 84,
  },
  bootSequence: function ({playNotes, resolve}) {
    setTimeout (() => {
      playNotes ({
        firstNote: this.lights.first,
        lastNote: this.lights.last,
        color: this.colors.red,
        duration: this.time.defaultDuration,
      });
      setTimeout (() => resolve (), this.time.defaultDuration + this.time.wait);
    }, this.time.deviceReady);
  },
  outputByInput: {
    // first row
    13: 13,
    14: 29,
    15: 45,
    16: 61,
    17: 77,
    18: 93,
    19: 109,
    20: 125,
    // second row
    29: 14,
    30: 30,
    31: 46,
    32: 62,
    33: 78,
    34: 94,
    35: 110,
    36: 126,
    // third row
    49: 15,
    50: 31,
    51: 47,
    52: 63,
    53: 79,
    54: 95,
    55: 111,
    56: 127,
    // fader to "track focus" line
    77: 41,
    78: 42,
    79: 43,
    80: 44,
    81: 57,
    82: 58,
    83: 59,
    84: 60,
    // // fader to "track focus" line
    // 77: 15,
    // 78: 31,
    // 79: 47,
    // 80: 63,
    // 81: 79,
    // 82: 95,
    // 83: 111,
    // 84: 127,
  },
};