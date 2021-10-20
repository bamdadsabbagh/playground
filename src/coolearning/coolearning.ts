import {Midi} from "./modules/midi/midi";
import {Settings} from "./modules/settings/settings";
import {removeHeader} from "./utils/remove-header";
import {removeArticle} from "./utils/remove-article";
import {removeFooter} from "./utils/remove-footer";
import {Parameters} from "./modules/parameters/parameters";

export function Coolearning () {

    window.addEventListener('load', () => {
        removeHeader()
        removeArticle()
        removeFooter()

        Settings()
        Parameters()
        Midi()
    })
}