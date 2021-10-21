import { getSettingsContent } from './get-settings-content'
import { buildArrayFromCollection } from './build-array-from-collection'

export function getSettings () {
    const content = getSettingsContent ()
    const children = buildArrayFromCollection (content.children)

    // remove table header
    children.shift ()

    return children
}