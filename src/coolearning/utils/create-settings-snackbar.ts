import { createMaterialSnackbar } from './create-material-snackbar'

/**
 * @description create snackbar in settings UI
 */
export function createSettingsSnackbar (): void {
    const snackbar = createMaterialSnackbar ()
    document.body.appendChild (snackbar)
}