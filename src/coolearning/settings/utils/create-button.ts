import { showModal } from './show-modal'

export function createButton () {
    const button = document.createElement ('button')

    button.style.display = 'block'
    button.style.position = 'fixed'
    button.style.top = '5px'
    button.style.left = '5px'
    button.innerText = 'settings'

    button.addEventListener ('click', () => {
        showModal ()
    })

    document.body.insertBefore (button, document.body.firstChild)
}