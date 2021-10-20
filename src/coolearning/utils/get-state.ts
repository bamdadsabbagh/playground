import {STATE_ID} from "../constants";
import {initializeState} from "./initialize-state";

export function getState() {
    if (!window[STATE_ID]) initializeState()

    return window[STATE_ID]
}