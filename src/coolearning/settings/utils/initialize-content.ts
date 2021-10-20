import {getContent} from "./get-content";
import {PARAMETERS} from "../../constants";
import {isControlled} from "../../utils/is-controlled";
import {getControlId} from "../../utils/get-control-id";
import {getControlType} from "../../utils/get-control-type";

export function initializeContent() {
    const content = getContent()
    content.style.display = 'flex'
    content.style.flexDirection = 'column'
    content.style.justifyContent = 'center'
    content.style.alignItems = 'center'
    content.style.textAlign = 'center'
    content.style.gridGap = '0.5em'

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

    Object.keys(PARAMETERS).forEach((parameter) => {
        let control, type, actions

        if (isControlled(parameter)) {
            control = getControlId(parameter)
            type = getControlType(parameter)
            actions = `<button>x</button>`
        } else {
            control = "N/A"
            type = "N/A"
            actions = `
                <button onclick="
                    window.coolState.isLearning = true
                    window.coolState.learningParameter = this.parentElement.parentElement.firstElementChild.innerText
                ">
                    Learn
                </button>
            `
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
}