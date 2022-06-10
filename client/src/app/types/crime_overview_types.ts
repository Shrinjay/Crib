import { FeatureCollection, GeoJsonProperties, Point } from "geojson"

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

export type Features = FeatureCollection<Point, GeoJsonProperties>

export interface BinnedFeatures {
    [type: string]: FeatureCollection<Point, GeoJsonProperties>
}