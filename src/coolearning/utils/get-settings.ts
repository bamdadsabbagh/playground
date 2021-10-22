import { getSettingsContent } from './get-settings-content'
import { buildArrayFromCollection } from './build-array-from-collection'

/**
 * @description get all elements from settings UI
 */
export function getSettings (): any[] {
    const content = getSettingsContent ()
    const children = buildArrayFromCollection (content.children)

    // remove table header
    children.shift ()

    return children
}