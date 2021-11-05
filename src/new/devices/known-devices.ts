import {
  NovationLaunchpadX,
  novationLaunchpadX,
} from './known-devices/novation-launchpad-x';
import {
  NovationLaunchControlXl,
  novationLaunchControlXl,
} from './known-devices/novation-launch-control-xl';

export type Controller = NovationLaunchControlXl;
export type Selector = NovationLaunchpadX;

export type KnownDevice = Controller | Selector;

export const knownDevices: KnownDevice[] = [
  novationLaunchpadX,
  novationLaunchControlXl,
];
