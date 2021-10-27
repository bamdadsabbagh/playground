/**
 * @description remove playground unwanted elements
 */
export function purgePlayground (): void {
    const header = document.querySelector ('header')
    header.remove ()

    const github = document.querySelector ('.github-link')
    github.remove ()

    const article = document.querySelector ('article')
    article.remove ()

    const more = document.querySelector ('.more')
    more.remove ()

    const footer = document.querySelector ('footer')
    footer.remove ()
}