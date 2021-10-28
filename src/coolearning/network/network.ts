import { getNeurons } from '../utils/get-neurons'

export const network = (function () {
    let neurons = []

    if (neurons.length === 0) {
        // todo remove timeout
        setTimeout (() => {
            neurons = getNeurons ()
            console.log (neurons)
            // hideNeurons ()
            // getLinks ()
        }, 2000)
    }

    function hideNeurons () {
        Object.keys (neurons).forEach (index => {
            neurons[index].node.style.visibility = 'hidden'
            neurons[index].node.setAttribute ('visible', 'false')
            neurons[index].heatmap.style.visibility = 'hidden'
            neurons[index].heatmap.setAttribute ('visible', 'false')
            Object.keys (neurons[index].weights).forEach (weightIndex => {
                neurons[index].weights[weightIndex].style.visibility = 'hidden'
            })
        })
    }

    function getLinks () {
        const links = Array.from (document.querySelectorAll ('[id ^= \'link\']')).reverse ()
        links.forEach ((link: SVGPathElement) => {
            link.style.visibility = 'hidden'
        })

        console.log (links)
    }

    return {
        get neurons () {
            return neurons
        },
    }
}) ()