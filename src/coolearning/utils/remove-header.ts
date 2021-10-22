/**
 * @description remove playground header
 */
export function removeHeader (): void {
    const header = document.querySelector ('header')
    header.remove ()

    const github = document.querySelector ('.github-link')
    github.remove ()
}