export function forcePlaygroundFeatures () {
    const keys = [
        'x',
        'y', // x2
        'xTimesY', // x1 * x2
        'xSquared',
        'ySquared',
        'cosX',
        'sinX',
        'cosY',
        'sinY',
    ]

    let needsForcing = false

    keys.forEach (key => {
        if (window.location.hash.includes (`${key}=false`)) {
            needsForcing = true
        }
    })

    if (!needsForcing) return

    keys.forEach (key => {
        window.location.hash = window.location.hash.replace (
            `${key}=false`,
            `${key}=true`,
        )
    })

    window.location.reload ()
}