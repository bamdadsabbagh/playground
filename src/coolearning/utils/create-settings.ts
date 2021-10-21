import { hideSettings } from './hide-settings'
import { CLASSES } from '../constants'

/**
 * @description create settings UI
 */
export function createSettings () {
    const container = document.createElement ('div')
    const content = document.createElement ('div')

    // styles
    container.classList.add (CLASSES.settings.container)
    container.style.display = 'none'
    container.style.position = 'fixed'
    container.style.justifyContent = 'center'
    container.style.alignItems = 'center'
    container.style.zIndex = '1000'
    container.style.width = '100vw'
    container.style.height = '100vh'
    container.style.overflow = 'auto'
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'

    content.classList.add (CLASSES.settings.content)
    content.style.backgroundColor = '#fefefe'
    content.style.margin = '30vh auto'
    content.style.padding = '20px'
    content.style.border = '1px solid #888'
    content.style.width = '80vw'

    // listeners
    container.addEventListener ('click', (e) => {
        //@ts-ignore
        const isOutside = e.target.id === CLASSES.settings.container
        if (!isOutside) return
        hideSettings ()
    })

    container.appendChild (content)
    document.body.insertBefore (container, document.body.firstChild)
}