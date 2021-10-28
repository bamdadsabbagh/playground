import { getNode } from './get-node'

export function enableNode (layer: number, neuron: number) {
    const node = getNode (layer, neuron)

    node.bias = 0.1

    node.inputLinks.forEach (inputLink => {
        inputLink.isDead = false
        inputLink.weight = Math.random () - 0.5
    })
}