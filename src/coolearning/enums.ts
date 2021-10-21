export enum Settings {
    Parameter = 0,
    Control = 1,
    Type = 2,
    Action = 3,
}

export enum Actions {
    Learn = 'learn',
    Unlearn = 'unlearn',
}

export enum State {
    IsLearning = 'isLearning',
    LearningParameter = 'learningParameter',
    Devices = 'devices',
    ControlByParameter = 'controlByParameter',
    ParametersByControl = 'parametersByControl',
}

export enum Parameters {
    Select = 'SELECT',
    Button = 'BUTTON',
}

export enum Types {
    Range = 176,
    ButtonOn = 144,
    ButtonOff = 128,
}