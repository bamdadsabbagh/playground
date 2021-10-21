import { showSettings } from './show-settings'

export function createSettingsShowButton () {
    const button = document.createElement ('button')

    button.style.display = 'block'
    button.style.position = 'fixed'
    button.style.top = '5px'
    button.style.left = '5px'
    button.innerText = 'settings'

    button.addEventListener ('click', () => {
        showSettings ()
    })

    document.body.insertBefore (button, document.body.firstChild)
}