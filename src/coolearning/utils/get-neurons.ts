import { NeuronElement, Neurons } from '../types'

/**
 * @description get all neurons currently in the playground
 * @todo call this for each DOM render
 */
export function getNeurons (): Neurons {
    const neuronsAndFeatures = document.querySelectorAll ('[id ^= \'canvas-\']')
    const getNeuronIndex = (n: NeuronElement): number => parseInt (n.id.split ('-')[1])

    // select only neurons
    let neuronsArray = Array.from (neuronsAndFeatures).filter ((neuronOrFeature: NeuronElement) => {
        const index = getNeuronIndex (neuronOrFeature)
        // if index is not a number, the element is not a neuron
        if (isNaN (index)) return

        return neuronOrFeature
    })

    // playground appends DOM in reverse order
    neuronsArray = neuronsArray.reverse ()

    // initialize object to return
    const neurons = {}

    // build first iteration of the object
    neuronsArray.forEach ((neuron: NeuronElement) => {
        const index = getNeuronIndex (neuron)
        const left = parseFloat (neuron.style.left.replace ('px', ''))

        neurons[index] = {
            element: neuron,
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
        neurons[index] = {
            ...neurons[index],
            layerIndex: savedLayerIndex,
        }
    })

    console.log (neurons)

    return neurons
}