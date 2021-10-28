import { getInputLinks } from './get-input-links'

export function enableNodeWeights (layer: number, neuron: number) {
    const inputLinks = getInputLinks (layer, neuron)
    inputLinks.forEach (inputLink => {
        inputLink.isDead = false
        inputLink.weight = Math.random () - 0.5
    })
}