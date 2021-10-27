import { addMaterialScript } from './add-material-script'
import { forcePlaygroundNetwork } from './force-playground-network'
import { purgePlayground } from './purge-playground'

/**
 * @description adapt playground interface
 */
export function initializePlayground () {
    addMaterialScript ()

    purgePlayground ()

    forcePlaygroundNetwork ()
}