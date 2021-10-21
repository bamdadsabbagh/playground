import { getContent } from './get-content'
import { CLASSES, PARAMETERS, SETTINGS } from '../../constants'
import { isControlled } from '../../utils/is-controlled'
import { getControlId } from '../../utils/get-control-id'
import { getControlType } from '../../utils/get-control-type'
import { enableLearningMode } from '../../utils/enable-learning-mode'
import { unlearnControl } from '../../utils/unlearn-control'
import { buildArrayFromCollection } from '../../utils/build-array-from-collection'
import { createSettingActionButton } from '../../utils/create-setting-action-button'
import { Actions } from '../../enums'

export function initializeContent () {
    const content = getContent ()
    content.style.display = 'flex'
    content.style.flexDirection = 'column'
    content.style.justifyContent = 'center'
    content.style.alignItems = 'center'
    content.style.textAlign = 'center'
    content.style.gridGap = '0.5em'

    // first row
    content.innerHTML = `
        <div style="
            display: grid;
            grid-template-columns: repeat(4, 20vw);
            font-weight: bold;
            background: gainsboro;
        ">
            <div>Parameter</div>
            <div>Control</div>
            <div>Control Type</div>
            <div>Actions</div>
        </div>
    `

    // next rows with parameters and controls
    Object.keys (PARAMETERS).forEach ((parameter) => {
        let control, type, actions

        if (isControlled (parameter)) {
            control = getControlId (parameter)
            type = getControlType (parameter)
            actions = createSettingActionButton ({
                type: Actions.Unlearn,
                parameter,
            })
        } else {
            control = SETTINGS.none
            type = SETTINGS.none
            actions = createSettingActionButton ({
                type: Actions.Learn,
                parameter,
            })
        }

        content.innerHTML += `
            <div style="
                display: grid;
                grid-template-columns: repeat(4, 20vw);
            ">
                <div>${parameter}</div>
                <div>${control}</div>
                <div>${type}</div>
                <div>${actions}</div>
            </div>
        `
    })

    // attach onClick listeners
    const actionsLearn = document.getElementsByClassName (CLASSES.ACTIONS.LEARN)
    buildArrayFromCollection (actionsLearn).forEach (action => {
        action.onclick = (e) => {
            const button = e.target as HTMLButtonElement
            const parameter = button.getAttribute ('parameter')
            enableLearningMode (parameter)
        }
    })

    const actionsUnlearn = document.getElementsByClassName (CLASSES.ACTIONS.UNLEARN)
    buildArrayFromCollection (actionsUnlearn).forEach (action => {
        action.onclick = (e) => {
            const button = e.target as HTMLButtonElement
            const parameter = button.getAttribute ('parameter')
            unlearnControl ({parameter})
        }
    })
}