import {PARAMETERS} from "../parameters.constants";

export function assignParameters(){
    const keys = Object.keys(PARAMETERS)

    keys.forEach((key) => {
        const node = PARAMETERS[key]
        node.style.background = 'red'
        node.style.cursor = 'pointer'
        node.addEventListener('click', () => {
            console.log("lol")
        })
    })
}