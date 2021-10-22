/**
 * @description remove playground article
 */
export function removeArticle (): void {
    const article = document.querySelector ('article')
    article.remove ()

    const more = document.querySelector ('.more')
    more.remove ()
}