import { getSettings } from './get-settings'

/**
 * @description get a single setting element
 */
export function getSetting (parameter) {
    const settings = getSettings ()

    // todo might want to write the setting in an HTML attribute instead
    const results = settings.filter (s => s.firstElementChild.innerText === parameter)

    if (results.length !== 1) throw new Error ('results length should be 1')

    return results[0]
}