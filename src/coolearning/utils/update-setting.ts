import { getSetting } from './get-setting'
import { buildArrayFromCollection } from './build-array-from-collection'
import { createSettingActionButton } from './create-setting-action-button'
import { Actions, Settings } from '../enums'
import { SETTINGS } from '../constants'

export function updateSetting (
    {
        parameter,
        control = undefined,
        type = undefined,
    },
) {
    if (!parameter) throw new Error ('parameter is not defined')
    if (typeof parameter !== 'string') throw new Error ('parameter is not a string')

    const setting = getSetting (parameter)

    if (!setting) throw new Error ('error getting setting')

    const children = buildArrayFromCollection (setting.children)
    const enabled = control && type

    children.forEach ((child, key) => {
        switch (key) {
            case Settings.Parameter:
                break
            case Settings.Control:
                child.innerText = enabled
                    ? control
                    : SETTINGS.none
                break
            case Settings.Type:
                child.innerText = enabled
                    ? type
                    : SETTINGS.none
                break
            case Settings.Action:
                child.innerHTML = createSettingActionButton ({
                    type: enabled ? Actions.Unlearn : Actions.Learn,
                    parameter,
                })
                break
            default:
                break
        }
    })
}