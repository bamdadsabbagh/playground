import { updateNeuronCard } from '../playground'
import * as d3 from 'd3'

export function selectNode (nodeId: number): void {
    if (typeof nodeId !== 'number') throw new Error ('nodeId is not a number')

    // state
    window['selectedNodes'] = [
        ...window['selectedNodes'],
        nodeId,
    ]

    // class
    const canvas = d3.select (`#canvas-${nodeId}`)
    canvas.classed ('selected', true)

    // neuron card
    updateNeuronCard ({nodeId})
}