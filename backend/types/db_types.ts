import { ScalarAttributeType } from '@aws-sdk/client-dynamodb'

export type FieldAttributes = {
    [id: string]: ScalarAttributeType,
    name: ScalarAttributeType,
    Longitude: ScalarAttributeType,
    Latitude: ScalarAttributeType,
    crime_geodata_id: ScalarAttributeType
}

export type ListingQuery = {
    id: string
}

export type ListingResponse = {
    id: string,
    name: string,
    Longitude: string,
    Latitude: string,
    crime_geodata_id: string,
    business_geodata_id: string
}

export type Listing = Omit<ListingResponse, "id">