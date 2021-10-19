export function removeHeader(){
    const header = document.querySelector('header')
    header.remove()

    const github = document.querySelector('.github-link')
    github.remove()
}