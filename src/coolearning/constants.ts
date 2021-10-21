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

export const TYPES = {
    range: 176,
    buttonOn: 144,
    buttonOff: 128,
}

export const CLASSES = {
    LEARN: 'cool-actions--learn',
    UNLEARN: 'cool-actions--unlearn'
}