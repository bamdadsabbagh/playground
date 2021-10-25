interface HTMLElement {
    MaterialSnackbar: {
        showSnackbar (options: {
            message: string,
            actionHandler: (e: Event) => void,
            actionText: string,
            timeout: number,
        }): void
    }

    appendTo (parent: HTMLElement): void

    prependTo (parent: HTMLElement): void
}

interface Window {
    // MDL
    componentHandler: {
        upgradeAllRegistered (): void
    }
}

interface EventTarget {
    open: any
    classList: any
}

interface String {
    includes (string: string): boolean
}

interface Navigator {
    requestMIDIAccess (options: any): Promise<any>
}

interface HTMLDialogElement {
    close (): void
}