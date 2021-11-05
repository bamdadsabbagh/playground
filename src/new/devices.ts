import {
  Controller,
  Selector,
  knownDevices,
} from './devices/known-devices';
import { Controllers, Devices, Selectors } from './devices/devices.types';

export const devices = Object.create (null);

devices.isInitialized = false as boolean;
devices.devices = null as Devices;
devices.controllers = null as Controllers;
devices.selectors = null as Selectors;
devices.knownDevices = knownDevices;

/**
 * @description Initialize devices
 * @param {*} devices - devices to reference
 */
devices.init = function (devices: any): void {
  if (this.isInitialized) {
    throw new Error ('devices is already initialized');
  }

  this.devices = devices;
  this.sortDevices ();

  this.isInitialized = true;
};

/**
 * @description Sort devices by category
 */
devices.sortDevices = function (): void {
  this.setControllers ();
  this.setSelectors ();
};

/**
 * @description Set controllers devices
 */
devices.setControllers = function (): void {
  this.controllers = this.pickDevicesByProperty ('isController');
};

/**
 * @description Set selectors devices
 */
devices.setSelectors = function (): void {
  this.selectors = this.pickDevicesByProperty ('isSelector');
};

/**
 * @description Get a controller by index
 * @param {number} index - controller index
 * @returns {*} controller
 */
devices.getController = function (index: number): Controller {
  return this.controllers[Object.keys (this.controllers)[index]];
};

/**
 * @description Get a selector by index
 * @param {number} index - selector index
 * @returns {*} selector
 */
devices.getSelector = function (index: number): Selector {
  return this.selectors[Object.keys (this.selectors)[index]];
};

/**
 * @description Utility function to pick devices by property
 * @param {string} property - property to pick
 * @returns {*} devices for a given property
 */
devices.pickDevicesByProperty = function (property: 'isController' | 'isSelector'): any {
  return Object.keys (this.devices).reduce ((acc, name) => {
    const device = this.devices[name];
    const settings = device.input.settings || device.output.settings || null;
    if (device[property]) {
      device.name = name;
      device.settings = settings;
      delete device.isController;
      delete device.isSelector;
      acc[name] = device;
    }
    return acc;
  }, {});
};
