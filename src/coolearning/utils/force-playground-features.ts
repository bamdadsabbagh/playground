import { FEATURES_KEYS } from '../constants'

export function forcePlaygroundFeatures () {
    let needsForcing = false

    FEATURES_KEYS.forEach (key => {
        if (window.location.hash.includes (`${key}=false`)) {
            needsForcing = true
        }
    })

    if (!needsForcing) return

    FEATURES_KEYS.forEach (key => {
        window.location.hash = window.location.hash.replace (
            `${key}=false`,
            `${key}=true`,
        )
    })

    window.location.reload ()
}