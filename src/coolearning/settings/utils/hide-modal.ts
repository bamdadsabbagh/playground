import { getContainer } from './get-container'

export function hideModal () {
    const container = getContainer ()
    container.style.display = 'none'
}