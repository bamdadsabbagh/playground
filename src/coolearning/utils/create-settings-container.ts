import { hideSettings } from './hide-settings'
import { CLASSES } from '../constants'
import { buildArrayFromCollection } from './build-array-from-collection'

/**
 * @description create settings container UI
 */
export function createSettingsContainer (): void {
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

    // click event
    container.addEventListener ('click', (e) => {
        // @ts-ignore
        const list = e.target.classList
        if (list.length === 0) return

        const classes = buildArrayFromCollection (list)

        // to use .includes
        // see https://stackoverflow.com/questions/40545329/property-includes-does-not-exist-on-type-string
        // const isOutside = classes.includes (CLASSES.settings.container)
        if (classes.length !== 1) throw new Error ('Change source code to use .includes')

        const isOutside = classes[0] && classes[0] === CLASSES.settings.container
        if (!isOutside) return

        hideSettings ()
    })

    container.appendChild (content)
    document.body.insertBefore (container, document.body.firstChild)
}