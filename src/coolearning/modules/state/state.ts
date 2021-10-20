// storing the state in a global object for the time being

export function State() {
    // @ts-ignore
    if (window.coolState) return window.coolState

    // @ts-ignore
    window.coolState = {
        isLearning: false,
        learningParameter: undefined,
        devices: [
            // if connection === 'open' and type === 'input', add id
            // {
            //     id: '',
            // }
        ],
        controlByParameter: {
            // 'playPauseButton': {
            //     type: 'button',
            //     note: 41,
            // }
        },
        parametersByControl: {
            // 41: [
            //     'playPauseButton',
            // ],
        }
    }
}