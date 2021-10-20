import {MODAL_CONTAINER} from "../settings.constants";

export function hideModal(){
    const modal = document.getElementById(MODAL_CONTAINER)
    modal.style.display = 'none'
}