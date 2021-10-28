import { getNode } from './get-node'

export function disableNode (layer: number, neuron: number) {
    const node = getNode (layer, neuron)

    node.bias = 0

    node.inputLinks.forEach (inputLink => {
        inputLink.isDead = true
        inputLink.weight = 0
    })
}