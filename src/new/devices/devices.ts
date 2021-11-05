import { novationLaunchpadX } from './known-devices/novation-launchpad-x';

export const devices = {
  devices: {} as object,
  controllers: {} as object,
  selectors: {} as object,

  knownDevices: [
    novationLaunchpadX,
  ],

  /**
   * @description Initialize devices
   * @param {*} devices - devices to reference
   */
  init: function (devices: any): void {
    this.devices = devices;
    this.sortDevices ();
  },

  /**
   * @description Sort devices by category
   */
  sortDevices: function (): void {
    this.setControllers ();
    this.setSelectors ();
  },

  /**
   * @description Set controllers devices
   */
  setControllers: function (): void {
    this.controllers = this.pickDevicesByProperty ('isController');
  },

  /**
   * @description Set selectors devices
   */
  setSelectors: function (): void {
    this.selectors = this.pickDevicesByProperty ('isSelector');
  },

  /**
   * @description Get a controller by index
   * @param {number} index - controller index
   * @returns {*} controller
   */
  getController: function (index: number): any {
    return this.controllers[Object.keys (this.controllers)[index]];
  },

  /**
   * @description Get a selector by index
   * @param {number} index - selector index
   * @returns {*} selector
   */
  getSelector: function (index: number): any {
    return this.selectors[Object.keys (this.selectors)[index]];
  },

  /**
   * @description Utility function to pick devices by property
   * @param {string} property - property to pick
   * @returns {*} devices for a given property
   */
  pickDevicesByProperty: function (property: string): any {
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
  },
};