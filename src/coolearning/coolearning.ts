import {Settings} from "./settings/settings";
import {removeHeader} from "./utils/remove-header";
import {removeArticle} from "./utils/remove-article";
import {removeFooter} from "./utils/remove-footer";
import {initializeState} from "./utils/initialize-state";
import {addControl} from "./utils/add-control";
import {setupMidi} from "./utils/setup-midi";

export function Coolearning() {

    window.addEventListener('load', () => {
        // cleaning old interface
        removeHeader()
        removeArticle()
        removeFooter()

        // state
        initializeState()
        addControl({
            parameter: 'playPauseButton',
            control: '41',
            type: 'button',
        })

        addControl({
            parameter: 'resetButton',
            control: '42',
            type: 'button',
        })

        Settings()
        setupMidi()
    })
}