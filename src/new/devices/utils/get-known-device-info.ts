import { DeviceCategory } from '../../../midi/devices/devices.types';
import { devices } from '../devices';

export function getKnownDeviceInfo (manufacturer, name) {

  const device = devices.knownDevices
    .filter (d => d.manufacturer === manufacturer)
    // .filter (d => name === d.name)
    .filter (d => name.includes (d.name))
    [0];

  if (device) {
    return {
      isKnown: true,
      isController: device.category === DeviceCategory.control,
      isSelector: device.category === DeviceCategory.select,
      settings: device,
    };
  } else {
    return {
      isKnown: false,
    };
  }
}