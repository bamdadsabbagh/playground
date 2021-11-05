import { BootSequenceOptions } from './device.prototype';
import { Controller, Selector } from './known-devices';

export enum DeviceCategory {
  select = 'Selector',
  control = 'Controller',
}

export type Device = {
  category: DeviceCategory,
  manufacturer: string,
  name: string,
  channels: {
    input: number | 'all',
    output: number | 'all',
  },
  lights: {
    first: number,
    last: number,
  },
  colors: {
    [name: string]: number,
  },
  time: {
    wait: number,
    deviceReady: number,
    defaultDuration: number,
    [other: string]: number,
  },
  bootSequence: (options: BootSequenceOptions) => void,
}

export type Devices = {
  [name: string]: Device,
}

export type Controllers = {
  [name: string]: Controller,
}

export type Selectors = {
  [name: string]: Selector,
}
