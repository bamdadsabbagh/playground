export function isDev () {
    // @ts-ignore
    return window.location.href.includes ('localhost')
}