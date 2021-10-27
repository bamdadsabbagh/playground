import { showSettings } from './show-settings'
import { isDevEnv } from './is-dev-env'
import { getNeurons } from './get-neurons'
import { state } from '../state/state'

/**
 * @description enable statements only in development environment
 */
export function enableDev (): void {
    if (!isDevEnv ()) return

    showSettings ()

    state.learn ({
        parameter: 'playPauseButton',
        control: 41,
        type: 'button',
    })

    state.learn ({
        parameter: 'resetButton',
        control: 73,
        type: 'button',
    })

    state.learn ({
        parameter: 'learningRate',
        control: 77,
        type: 'range',
    })

    state.learn ({
        parameter: 'activation',
        control: 49,
        type: 'range',
    })

    getNeurons ()

}