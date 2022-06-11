export interface Listing {
    name: string,
    Latitude: number,
    Longitude: number,
    crime_geodata_id: string
    business_geodata_id: string
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
    longitude: number,
    district: string
}

export enum Datasets {
    business = "Business",
    crime = "Crime"
}

export interface SurveyResponse {
    enjoyementRating: number,
    recommendationRating: number,
    maxPricePerListing: string,
    maxPricePerMonth: string,
    willingToBeInterviewed: boolean,
    email: string
}
