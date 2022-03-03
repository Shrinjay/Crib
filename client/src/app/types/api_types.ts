export interface Listing {
    name: string,
    Latitude: number,
    Longitude: number,
    crime_geodata_id: string
}

export interface CrimeMetrics {
    violent: number,
    disturbance: number, 
    stolen_goods: number,
    index: number
}

export interface GenerateMetricsRequest {
    name: string,
    lattitude: number, 
    longitude: number
}