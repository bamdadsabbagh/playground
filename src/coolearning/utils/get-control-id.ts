import {getState} from "./get-state";
import {isControlled} from "./is-controlled";

export function getControlId(parameter) {
    const state = getState()
    if (!isControlled(parameter)) return null
    return state.controlByParameter[parameter].control
}