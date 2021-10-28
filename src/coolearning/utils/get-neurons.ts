import { NeuronElement, Neurons } from '../types'

const getWeightsHovers = (elementD3) => {
    const weights = {}
    let index = 1
    let currentElement = elementD3

    while (
        currentElement.nextElementSibling
        && currentElement.nextElementSibling.tagName === 'path'
        ) {
        weights[index] = currentElement.nextElementSibling
        currentElement = currentElement.nextElementSibling
        ++index
    }

    return weights
}

/**
 * @description get all neurons currently in the playground
 * @todo call this for each DOM render
 */
export function getNeurons (): any {
    const featuresCount = 7
    const heatmaps = Array.from (document.querySelectorAll ('[id ^= \'canvas-\']')).reverse ().slice (featuresCount)
    const nodes = Array.from (document.querySelectorAll ('[id ^= \'node\']')).slice (featuresCount)
    const getNeuronIndex = (n: NeuronElement): number => parseInt (n.id.split ('-')[1])

    // initialize object to return
    const neurons = {}

    // build first iteration of the object
    heatmaps.forEach ((h: HTMLDivElement) => {
        const index = getNeuronIndex (h)
        const left = parseFloat (h.style.left.replace ('px', ''))

        neurons[index] = {
            heatmap: h,
            layerPosition: left,
        }
    })

    // find the layer index of each neuron
    let savedLayerIndex = 0 // will be 1 on first iteration of the loop
    let savedLayerPosition = null

    Object.keys (neurons).forEach ((index) => {
        const {layerPosition} = neurons[index]

        if (layerPosition !== savedLayerPosition) {
            savedLayerPosition = layerPosition
            savedLayerIndex += 1
        }

        const node = nodes[parseInt (index) - 1]
        const weights = getWeightsHovers (node)

        neurons[index] = {
            ...neurons[index],
            layerIndex: savedLayerIndex,
            node,
            weights,
        }
    })

    return neurons
}