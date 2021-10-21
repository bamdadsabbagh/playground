export function buildArrayFromCollection (collection) {
    if (!collection) throw new Error ('collection is not defined')
    if (collection.length === 0) throw new Error ('collection is empty')

    const children = collection.children

    let array = []

    for (let i = 0; i < children.length; ++i) {
        const child = children[i]
        array = [
            ...array,
            child,
        ]
    }

    return array
}