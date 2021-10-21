/**
 * @description converts an HTML collection into a pure javascript array
 * use this to access Array methods
 * @param collection
 */
export function buildArrayFromCollection (collection) {
    if (!collection) throw new Error ('collection is not defined')
    if (collection.length === 0) throw new Error ('collection is empty')

    let array = []

    for (let i = 0; i < collection.length; ++i) {
        const item = collection[i]
        array = [
            ...array,
            item,
        ]
    }

    return array
}