import { createMaterialDialog } from './create-material-dialog'
import { createMaterialList } from './create-material-list'
import { createMaterialChip } from './create-material-chip'

/**
 * @description create dialog UI element in settings
 */
export function createSettingsDialog () {
    const list = createMaterialList ({
        items: [
            'first',
            'second',
            createMaterialChip ({
                type: 'button',
                content: 'hello',
                onActionClick: () => console.log ('lol'),
            }),
            createMaterialChip ({
                type: 'range',
                content: '75',
                onActionClick: () => console.log ('lol'),
            }),
        ],
    })

    const dialog = createMaterialDialog ({
        title: 'Settings',
        content: list,
        width: 650,
    })

    document.body.appendChild (dialog)
}