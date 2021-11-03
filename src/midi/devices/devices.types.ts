export enum DeviceCategory {
    select = 'select',
    control = 'control',
}

export type Device = {
    category: DeviceCategory,
    manufacturer: string,
    name: string,
    outputByInput?: any,
    onSelect?: () => void,
    channels?: {
        input: string | number,
        output: string | number,
    },
    selectOrUnselectNeuron?: (nodeIndex: number, isSelected: boolean) => void,
    enableOrDisableNeuron?: (nodeIndex: number, isEnabled: boolean) => void,
    enableOrDisableInput?: (inputName: string, isEnabled: boolean) => void,
    all?: {
        start: number,
        end: number,
    },
    controls?: {
        start: number,
        end: number,
    },
    pads?: {
        start: number,
        end: number,
        grid: number[][],
    }
    onAttach: (wm: any, device: any) => void,
    indexes?: {
        all?: {
            first: number,
            last: number,
        },
        notes?: {
            first: number,
            last: number,
            grid: number[][],
        },
        controls?: {
            firstRow: number[],
            lastColumn: number[],
        },
    },
    colors?: {
        [color: string]: number,
    }
}

export type Devices = Device[]