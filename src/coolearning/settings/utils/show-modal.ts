import { getContainer } from './get-container'

export function showModal () {
    const container = getContainer ()
    container.style.display = 'block'
}