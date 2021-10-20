export function removeArticle () {
    const article = document.querySelector ('article')
    article.remove ()

    const more = document.querySelector ('.more')
    more.remove ()
}