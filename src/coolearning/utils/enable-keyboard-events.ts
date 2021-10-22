import { handleHighlightMode } from './handle-highlight-mode'

/**
 * @description enable keyboard events
 */
export function enableKeyboardEvents (): void {

    // enable ableton mode
    document.addEventListener ('keydown', (e) => {
        if (!(e.code === 'ShiftLeft')) return
        handleHighlightMode (true)
    })

    // disable ableton mode
    document.addEventListener ('keyup', (e) => {
        if (!(e.code === 'ShiftLeft')) return
        handleHighlightMode (false)
    })
}