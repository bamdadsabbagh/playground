import { getContent } from '../settings/utils/get-content'
import { buildArrayFromCollection } from './build-array-from-collection'

export function getSettings () {
    const content = getContent ()
    const children = buildArrayFromCollection (content)

    // remove table header
    children.shift ()

    return children
}