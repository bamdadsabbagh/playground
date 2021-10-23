import { removeArticle } from './remove-article'
import { removeFooter } from './remove-footer'
import { removeHeader } from './remove-header'
import { addMaterialScript } from './add-material-script'

/**
 * @description adapt playground interface
 */
export function initializePlayground () {
    // scripts
    addMaterialScript ()

    // cleaning old interface
    removeHeader ()
    removeArticle ()
    removeFooter ()
}