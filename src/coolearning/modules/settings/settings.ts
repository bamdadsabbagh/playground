export function Settings () {

    // todo create a modal

    // parameters
    const width = '200'

    // Initialize
    const body = document.querySelector('body')
    const container = document.createElement('div')
    const controls = document.getElementById('top-controls')
    const main = document.getElementById('main-part')

    body.style.display = 'flex'
    body.style.justifyContent = 'flex-start'
    body.style.alignItems = 'flex-start'
    body.style.width = '100vw'
    body.style.height = '100vh'

    container.style.position = 'fixed'
    container.style.display = 'flex'
    container.style.justifyContent = 'flex-start'
    container.style.alignItems = 'flex-start'
    container.style.background = 'red'
    container.style.width = `${width}px`

    container.innerText = 'settings content'

    body.insertBefore(container, body.firstChild)

    const interfaceContainer = document.createElement('div')

    interfaceContainer.style.position = 'fixed'
    main.style.width = '944px'

    body.appendChild(interfaceContainer)
    interfaceContainer.appendChild(controls)
    interfaceContainer.appendChild(main)

    // State: Opened
    container.style.display = 'inline'
    interfaceContainer.style.transform = `translate(${width}px, 0)`

    // State: Closed
    // container.style.display = 'none'
    // interfaceContainer.style.transform = `translate(0, 0)`
}
