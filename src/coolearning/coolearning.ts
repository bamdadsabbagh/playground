import { removeHeader } from './utils/remove-header'
import { removeArticle } from './utils/remove-article'
import { removeFooter } from './utils/remove-footer'
import { initializeState } from './utils/initialize-state'
import { initializeSettings } from './utils/initialize-settings'
import { initializeMidi } from './utils/initialize-midi'
import { enableDev } from './utils/enable-dev'

export function Coolearning () {

    window.addEventListener ('load', () => {

        // cleaning old interface
        removeHeader ()
        removeArticle ()
        removeFooter ()

        // state
        initializeState ()

        // settings
        initializeSettings ()

        // midi
        initializeMidi ()

        enableDev ()
    })
}