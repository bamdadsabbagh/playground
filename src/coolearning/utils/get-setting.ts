import { getSettings } from './get-settings'

export function getSetting (parameter) {
    const settings = getSettings ()
    const results = settings.filter (s => s.firstElementChild.innerText === parameter)
    if (results.length !== 1) throw new Error ('results length should be 1')
    return results[0]
}