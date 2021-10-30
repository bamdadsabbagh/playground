export enum DeviceCategory {
    select = 'select',
    control = 'control',
}

export type Device = {
    category: DeviceCategory,
    manufacturer: string,
    name: string,
    indexes?: {
        all: {
            first: number,
            last: number,
        },
        notes: {
            first: number,
            last: number,
            grid: number[][],
        },
        controls: {
            firstRow: number[],
            lastColumn: number[],
        },
    },
    colors?: {
        [color: string]: number,
    }
}

export type Devices = Device[]