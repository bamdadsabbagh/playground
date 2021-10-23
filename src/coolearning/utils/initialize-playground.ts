import { removeArticle } from './remove-article'
import { removeFooter } from './remove-footer'
import { removeHeader } from './remove-header'

/**
 * @description clean up old interface
 */
export function initializePlayground () {
    // cleaning old interface
    removeHeader ()
    removeArticle ()
    removeFooter ()
}