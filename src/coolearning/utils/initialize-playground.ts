import { addMaterialScript } from './add-material-script'
import { forcePlaygroundNetwork } from './force-playground-network'
import { purgePlayground } from './purge-playground'
import { forcePlaygroundFeatures } from './force-playground-features'

/**
 * @description adapt playground interface
 */
export function initializePlayground () {
    addMaterialScript ()

    purgePlayground ()

    forcePlaygroundNetwork ()

    forcePlaygroundFeatures ()
}