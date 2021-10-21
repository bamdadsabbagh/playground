import { learnControl } from './learn-control'
import { showModal } from '../settings/utils/show-modal'
import { isDev } from './is-dev'

export function enableDev () {

    if (!isDev ()) return

    showModal ()

    learnControl ({
        parameter: 'playPauseButton',
        control: '41',
        type: 'button',
    })

    learnControl ({
        parameter: 'resetButton',
        control: '73',
        type: 'button',
    })

    learnControl ({
        parameter: 'learningRate',
        control: '77',
        type: 'range',
    })

    learnControl ({
        parameter: 'activation',
        control: '49',
        type: 'range',
    })
}