import { initializeState } from './utils/initialize-state'
import { initializeSettings } from './utils/initialize-settings'
import { initializeMidi } from './utils/initialize-midi'
import { enableDev } from './utils/enable-dev'
import { initializeKeyboardEvents } from './utils/initialize-keyboard-events'
import { initializePlayground } from './utils/initialize-playground'
import { showSnack } from './utils/show-snack'

/**
 * @description entry point for CooLearning playground extension
 */
export function Coolearning (): void {

    window.addEventListener ('load', () => {
        try {

            // playground
            initializePlayground ()

            // state
            initializeState ()

            // settings
            initializeSettings ()

            // midi
            initializeMidi ()

            // keyboard events
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