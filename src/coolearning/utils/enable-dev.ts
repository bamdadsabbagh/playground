import { learnControl } from './learn-control'
import { showSettings } from './show-settings'
import { isDevEnv } from './is-dev-env'
import { getNeurons } from './get-neurons'

/**
 * @description enable statements only in development environment
 */
export function enableDev (): void {
    if (!isDevEnv ()) return

    showSettings ()

    learnControl ({
        parameter: 'playPauseButton',
        control: 41,
        type: 'button',
    })

    learnControl ({
        parameter: 'resetButton',
        control: 73,
        type: 'button',
    })

    learnControl ({
        parameter: 'learningRate',
        control: 77,
        type: 'range',
    })

    learnControl ({
        parameter: 'activation',
        control: 49,
        type: 'range',
    })

    getNeurons ()

}