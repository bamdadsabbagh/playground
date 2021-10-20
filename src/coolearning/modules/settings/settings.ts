import {createModal} from "./utils/create-modal";
import {createButton} from "./utils/create-button";
import {getContent} from "./utils/get-content";
import {PARAMETERS} from "../parameters/parameters.constants";

export function Settings() {

    createButton()

    createModal()

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

    Object.keys(PARAMETERS).forEach((parameter) => {
        content.innerHTML += `
            <div style="
                display: grid;
                grid-template-columns: repeat(4, 10vw);
            ">
                <div>${parameter}</div>
                <div>
                    <button onclick="
                        window.coolState.isLearning = true
                        window.coolState.learningParameter = this.parentElement.parentElement.firstElementChild.innerText
                    ">
                        Learn
                    </button>
                </div>
                <div>TBD</div>
                <div>
                    <button>x</button>
                </div>
            </div>
        `
    })
}
