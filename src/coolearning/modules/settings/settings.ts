import {createModal} from "./utils/create-modal";
import {createButton} from "./utils/create-button";
import {getContent} from "./utils/get-content";
import {showModal} from "./utils/show-modal";
import {PARAMETERS} from "../parameters/parameters.constants";

export function Settings () {

    createButton()

    createModal()

    showModal()

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
            grid-template-columns: repeat(4, 10vw);
            font-weight: bold;
            background: gainsboro;
        ">
            <div>Parameter</div>
            <div>Control</div>
            <div>Control Type</div>
            <div>Actions</div>
        </div>
    `

    const parameters = Object.keys(PARAMETERS)
    parameters.forEach((parameter) => {
        content.innerHTML += `
            <div style="
                display: grid;
                grid-template-columns: repeat(4, 10vw);
            ">
                <div>${parameter}</div>
                <div>TBD</div>
                <div>TBD</div>
                <div>
                    <button>x</button>
                </div>
            </div>
        `
    })
}
