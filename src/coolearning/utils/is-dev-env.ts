export function isDevEnv () {
    // @ts-ignore
    return window.location.href.includes ('localhost')
}