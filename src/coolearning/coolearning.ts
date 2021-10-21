import { Settings } from './settings/settings'
import { removeHeader } from './utils/remove-header'
import { removeArticle } from './utils/remove-article'
import { removeFooter } from './utils/remove-footer'
import { initializeState } from './utils/initialize-state'
import { learnControl } from './utils/learn-control'
import { setupMidi } from './utils/setup-midi'

export function Coolearning () {

    window.addEventListener ('load', () => {

        // cleaning old interface
        removeHeader ()
        removeArticle ()
        removeFooter ()

        // state
        initializeState ()

        // dummy controls for dev
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

        // set up settings
        Settings ()

        // setup midi
        setupMidi ()
    })
}