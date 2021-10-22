export const STATE_ID = 'coolState'

export const PARAMETERS = {
    playPauseButton: document.getElementById ('play-pause-button'),
    resetButton: document.getElementById ('reset-button'),
    learningRate: document.getElementById ('learningRate'),
    activation: document.getElementById ('activations'),
    regularizations: document.getElementById ('regularizations'),
    addLayers: document.getElementById ('add-layers'),
    removeLayers: document.getElementById ('remove-layers'),
}

export const CLASSES = {
    action: 'cool-action',
    actions: {
        learn: 'cool-actions--learn',
        unlearn: 'cool-actions--unlearn',
    },
    settings: {
        container: 'cool-settings--container',
        content: 'cool-settings--content',
    },
}

export const SETTINGS = {
    none: 'N/A',
    button: 'button',
    range: 'range',
}

export const STATE = {
    isLearning: false,
    learningParameter: null,
    devices: [],
    controlByParameter: {},
    parametersByControl: {},
}