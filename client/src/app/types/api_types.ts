export interface Listing {
    name: string,
    Latitude: number,
    Longitude: number,
    crime_geodata_id: string
    business_geodata_id: string
}

export interface ListingId {
    id: string,
    name: string,
    Latitude: number,
    Longitude: number,
    crime_geodata_id: string
    business_geodata_id: string
}

export interface CrimeMetrics {
    violent: number,
    stolen_goods: number,
    violent_rate: number,
    stolen_goods_rate: number,
    violent_comparison: number,
    stolen_goods_comparison: number,
    index: number
}

export interface BusinessMetrics {
    Eating: number,
    Health: number,
    Amusement: number,
    Food_Retail: number,
    Laundry: number,
    Nightlife: number, 
    Personal_Services: number,
    Shopping: number,
    Total: number,
    Eating_comparison: number,
    Health_comparison: number,
    Amusement_comparison: number,
    Food_Retail_comparison: number,
    Laundry_comparison: number,
    Nightlife_comparison: number, 
    Personal_Services_comparison: number,
    Shopping_comparison: number,
    Total_comparison: number,
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