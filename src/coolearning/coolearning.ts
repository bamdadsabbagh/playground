import './interfaces';
import './prototypes';
import { initializeSettings } from './utils/initialize-settings';
import { initializeKeyboardEvents } from './utils/initialize-keyboard-events';
import { initializePlayground } from './utils/initialize-playground';
import { showSnack } from './utils/show-snack';
import { app } from '../app/app';

/**
 * @description entry point for CooLearning playground extension
 */
export function Coolearning (): void {

  window.addEventListener ('load', () => {
    try {
      initializePlayground ();
      initializeSettings ();
      app.init ();
      initializeKeyboardEvents ();
    } catch (error) {
      console.error (error);
      showSnack ({
        message: error.toString (),
        timeout: 5000,
      });
    }
  });
}
