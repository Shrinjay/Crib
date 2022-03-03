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