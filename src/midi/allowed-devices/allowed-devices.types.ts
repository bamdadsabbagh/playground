export enum AllowedDeviceType {
    select = 'select',
    control = 'control',
}

export type AllowedDevice = {
    type: AllowedDeviceType,
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

export type AllowedDevices = AllowedDevice[]