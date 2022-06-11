export interface CrimeData {
    id: number,
    properties: {
        CrimeType: string,
        ReportedDateandTime: string,
        distance: number
    },
    latitidue: number,
    longitude: number
}

export interface CardData {
    name: string,
    compare: boolean,
    value: number,
    compare_value?: number,
    compare_name?: string
}

export interface RawCrimeFeature {
    id: number,
    type: string,
    properties: {
        CrimeType: string,
        ReportedDateandTime: string,
        distance: number
    },
    geometry: {
        type: number,
        coordinates: number[]
    }
}