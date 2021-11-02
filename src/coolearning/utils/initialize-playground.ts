import { addMaterialScript } from './add-material-script'
import { forcePlaygroundNetwork } from './force-playground-network'
import { forcePlaygroundFeatures } from './force-playground-features'

/**
 * @description adapt playground interface
 */
export function initializePlayground () {
    addMaterialScript ()

    forcePlaygroundNetwork ()

    forcePlaygroundFeatures ()
}