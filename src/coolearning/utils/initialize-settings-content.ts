import { getContent } from '../settings/utils/get-content'
import { CLASSES, PARAMETERS } from '../constants'
import { isControlled } from './is-controlled'
import { getControlId } from './get-control-id'
import { getControlType } from './get-control-type'
import { buildArrayFromCollection } from './build-array-from-collection'
import { updateSetting } from './update-setting'

export function initializeSettingsContent () {
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
    // skeleton only
    Object.keys (PARAMETERS).forEach ((parameter) => {
        content.innerHTML += `
            <div class="${CLASSES.ACTION}" style="
                display: grid;
                grid-template-columns: repeat(4, 20vw);
            ">
                <div>${parameter}</div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        `
    })

    // attach onClick listeners
    const actions = buildArrayFromCollection (document.getElementsByClassName (CLASSES.ACTION))

    actions.forEach (action => {
        const parameter = action.firstElementChild.innerText
        if (isControlled (parameter)) {
            const control = getControlId (parameter)
            const type = getControlType (parameter)
            updateSetting ({parameter, control, type})
        } else {
            updateSetting ({parameter})
        }
    })
}