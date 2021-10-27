/**
 * @description set 6 layers and 8 neurons / layer
 */
export function forcePlaygroundNetwork () {
    const key = 'networkShape='
    const regex = new RegExp (`${key}.*?(?=&|$)`)
    const targetNetwork = '8,8,8,8,8,8'
    const currentNetwork = window.location.hash.match (regex)[0].replace (key, '')

    if (currentNetwork && currentNetwork === targetNetwork) return

    window.location.hash = window.location.hash.replace (
        new RegExp (`networkShape=.*?(?=&|$)`),
        `networkShape=8,8,8,8,8,8`,
    )
    
    window.location.reload ()
}