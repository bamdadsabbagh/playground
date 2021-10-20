import {hideModal} from "./hide-modal";
import {MODAL_CONTAINER, MODAL_CONTENT} from "../settings.constants";

export function createModal(){
    const container = document.createElement('div')
    const content = document.createElement('div')

    container.id = MODAL_CONTAINER
    container.style.display = 'none'
    container.style.position = 'fixed'
    container.style.justifyContent = 'center'
    container.style.alignItems = 'center'
    container.style.zIndex = '1000'
    container.style.width = '100vw'
    container.style.height = '100vh'
    container.style.overflow = 'auto'
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'

    content.id = MODAL_CONTENT
    content.style.backgroundColor = '#fefefe'
    content.style.margin = '45vh auto'
    content.style.padding = '20px'
    content.style.border = '1px solid #888'
    content.style.width = '80vw'

    container.addEventListener('click', (e) => {
        //@ts-ignore
        const isModal = e.target.id === MODAL_CONTAINER
        if(!isModal) return
        hideModal()
    })

    container.appendChild(content)
    document.body.insertBefore(container, document.body.firstChild)
}