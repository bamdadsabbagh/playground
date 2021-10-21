import { getSetting } from './get-setting'
import { buildArrayFromCollection } from './build-array-from-collection'
import { createSettingActionButton } from './create-setting-action-button'
import { Actions, Settings } from '../enums'
import { SETTINGS } from '../constants'
import { unlearnControl } from './unlearn-control'
import { enableLearningMode } from './enable-learning-mode'
import { isTabActive } from './is-tab-active'

export function updateSetting (
    {
        parameter,
        control = undefined,
        type = undefined,
    },
) {
    if (!isTabActive ()) return

    if (!parameter) throw new Error ('parameter is not defined')
    if (typeof parameter !== 'string') throw new Error ('parameter is not a string')

    const setting = getSetting (parameter)

    if (!setting) throw new Error ('error getting setting')

    const children = buildArrayFromCollection (setting.children)
    const learned = control && type

    children.forEach ((child, key) => {
        switch (key) {
            case Settings.Parameter:
                break
            case Settings.Control:
                child.innerText = learned
                    ? control
                    : SETTINGS.none
                break
            case Settings.Type:
                child.innerText = learned
                    ? type
                    : SETTINGS.none
                break
            case Settings.Action:
                child.innerHTML = createSettingActionButton ({
                    type: learned ? Actions.Unlearn : Actions.Learn,
                    parameter,
                })
                child.onclick = () => {
                    if (learned) {
                        unlearnControl ({parameter})
                    } else {
                        enableLearningMode ({parameter})
                    }
                }
                break
            default:
                break
        }
    })
}