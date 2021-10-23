import { initializeState } from './utils/initialize-state'
import { initializeSettings } from './utils/initialize-settings'
import { initializeMidi } from './utils/initialize-midi'
import { enableDev } from './utils/enable-dev'
import { initializeKeyboardEvents } from './utils/initialize-keyboard-events'
import { initializePlayground } from './utils/initialize-playground'

/**
 * @description entry point for CooLearning playground extension
 */
export function Coolearning (): void {

    window.addEventListener ('load', () => {

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
    })
}