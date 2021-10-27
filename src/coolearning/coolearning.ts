import './interfaces'
import './prototypes'
import { initializeSettings } from './utils/initialize-settings'
import { initializeMidi } from './utils/initialize-midi'
import { initializeKeyboardEvents } from './utils/initialize-keyboard-events'
import { initializePlayground } from './utils/initialize-playground'
import { showSnack } from './utils/show-snack'
import { enableDev } from './utils/enable-dev'

/**
 * @description entry point for CooLearning playground extension
 */
export function Coolearning (): void {

    window.addEventListener ('load', () => {
        try {
            initializePlayground ()
            initializeSettings ()
            initializeMidi ()
            initializeKeyboardEvents ()
            enableDev ()
        } catch (error) {
            console.error (error)
            showSnack ({
                message: error.toString (),
                timeout: 5000,
            })
        }
    })
}