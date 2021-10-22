import { getSetting } from './get-setting'
import { buildArrayFromCollection } from './build-array-from-collection'
import { createSettingsActionButton } from './create-settings-action-button'
import { SettingsActions, SettingsPositions } from '../enums'
import { SETTINGS } from '../constants'
import { unlearnControl } from './unlearn-control'
import { enableLearningMode } from './enable-learning-mode'
import { isTabActive } from './is-tab-active'
import { ControlIdentifier, ControlType, Parameter } from '../types'

type UpdateSettingProps = {
    parameter: Parameter,
    control?: ControlIdentifier,
    type?: ControlType,
}

/**
 * @description update setting in settings UI
 */
export function updateSetting (
    {
        parameter,
        control = undefined,
        type = undefined,
    }: UpdateSettingProps,
): void {
    if (!isTabActive ()) return

    if (!parameter) throw new Error ('parameter is not defined')
    if (typeof parameter !== 'string') throw new Error ('parameter is not a string')

    const setting = getSetting (parameter)

    if (!setting) throw new Error ('error getting setting')

    const children = buildArrayFromCollection (setting.children)
    const learned = control && type

    children.forEach ((child, key) => {
        switch (key) {
            case SettingsPositions.Parameter:
                break
            case SettingsPositions.Control:
                child.innerText = learned
                    ? control
                    : SETTINGS.none
                break
            case SettingsPositions.Type:
                child.innerText = learned
                    ? type
                    : SETTINGS.none
                break
            case SettingsPositions.Action:
                child.innerHTML = createSettingsActionButton ({
                    action: learned ? SettingsActions.Unlearn : SettingsActions.Learn,
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