import { Settings } from './settings/settings'
import { removeHeader } from './utils/remove-header'
import { removeArticle } from './utils/remove-article'
import { removeFooter } from './utils/remove-footer'
import { initializeState } from './utils/initialize-state'
import { setupMidi } from './utils/setup-midi'
import { enableDev } from './utils/enable-dev'

export function Coolearning () {

    window.addEventListener ('load', () => {

        // cleaning old interface
        removeHeader ()
        removeArticle ()
        removeFooter ()

        // state
        initializeState ()

        // set up settings
        Settings ()

        // setup midi
        setupMidi ()

        enableDev ()
    })
}