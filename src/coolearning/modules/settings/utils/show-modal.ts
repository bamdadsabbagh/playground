import {MODAL_CONTAINER} from "../settings.constants";

export function showModal(){
    const modal = document.getElementById(MODAL_CONTAINER)
    modal.style.display = 'block'
}