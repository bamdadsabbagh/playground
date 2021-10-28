import { getInputLinks } from './get-input-links'

export function disableNodeWeights (layer: number, neuron: number) {
    const inputLinks = getInputLinks (layer, neuron)
    inputLinks.forEach (inputLink => {
        inputLink.isDead = true
        inputLink.weight = 0
    })
}