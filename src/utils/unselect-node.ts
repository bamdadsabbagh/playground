import { updateNeuronCard } from '../playground'
import * as d3 from 'd3'
import { novationLaunchpadX } from '../midi/devices/novation-launchpad-x/novation-launchpad-x'
import { novationLaunchControlXl } from '../midi/devices/novation-launch-control-xl/novation-launch-control-xl'

export function unselectNode (nodeId: number): void {
    if (typeof nodeId !== 'number') throw new Error ('nodeId is not a number')

    // state
    window['selectedNodes'] = window['selectedNodes'].filter (n => n !== nodeId)

    // class
    const canvas = d3.select (`#canvas-${nodeId}`)
    canvas.classed ('selected', false)

    // neuron card
    updateNeuronCard ({nodeId})

    // midi selection device
    novationLaunchpadX.selectOrUnselectNeuron (nodeId, false)

    // midi control device
    novationLaunchControlXl.onSelect ()
}