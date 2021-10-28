import { getNode } from './get-node'

export function toggleNode (nodeIndex: number) {
    const node = getNode (nodeIndex)

    const isDead = node.inputLinks
        .filter (l => l.isDead === true)
        .length !== 0

    const needsToDie = !isDead

    // todo how to impact node.bias ?

    node.inputLinks.forEach (inputLink => {
        inputLink.isDead = needsToDie
        inputLink.weight = needsToDie
            ? 0
            : Math.random () - 0.5
    })

    console.log (node)

    return needsToDie
}