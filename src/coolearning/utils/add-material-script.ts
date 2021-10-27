/**
 * @description add missing MDL script to document HEAD
 * @todo this should be a local resource for offline usage
 */
export function addMaterialScript (): void {
    const script = document.createElement ('script')
    // script.defer = true
    script.src = 'https://code.getmdl.io/1.3.0/material.min.js'

    script.onload = () => {
        window.componentHandler.upgradeAllRegistered ()
    }

    document.head.appendChild (script)
}