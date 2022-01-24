import * as dynamodb from '@aws-sdk/client-dynamodb'
import { KeysAndAttributes } from '@aws-sdk/client-dynamodb';
import { Listing, ListingResponse, ListingQuery, FieldAttributes } from '../types/db_types';

const TABLE_NAME: string = "listings";
const FIELD_TYPES: FieldAttributes = {
    id: "S",
    name: "S",
    Longitude: "S",
    Latitude: "S",
    crime_geodata_id: "S"
}
const FIELDS = ["id", "name", "Longitude", "Latitude", "crime_geodata_id"]

const dbContext: dynamodb.DynamoDB = new dynamodb.DynamoDB({ "region": "us-west-2" });

export async function getListings(): Promise<{ [id: string]: Listing } | null> {

    const res: dynamodb.ScanCommandOutput = await dbContext.scan({ TableName: "listings" })
    return buildListingItems(res);
}

function buildListingItems(response: dynamodb.ScanCommandOutput): { [id: string]: Listing } | null {
    const listingMap: { [id: string]: Listing } = {}
    const listingItems: ListingResponse[] | null = response?.Items?.map(_buildListingItem) ?? null;

    listingItems
        ?.forEach(listingResponse => listingMap[listingResponse.id] = _buildListingVm(listingResponse));

    return listingMap;
}

function _buildListingItem(resItem: any): ListingResponse {
    let res: ListingResponse = {
        id: "",
        name: "",
        Latitude: "",
        Longitude: "",
        crime_geodata_id: ""
    }

    FIELDS.forEach(field => res[field as keyof typeof res] = resItem[field][FIELD_TYPES[field]])

    return res;
}

function _buildListingVm(listing: ListingResponse): Listing {
    const { id, ...listingVm } = listing;
    return listingVm;
}

function buildListingRequestItem(query: ListingQuery): dynamodb.BatchGetItemCommandInput {

    if (query === null) return {
        RequestItems: {
            [TABLE_NAME]: {
                Keys: []
            }
        }
    };

    return {
        RequestItems: {
            [TABLE_NAME]: {
                Keys: [
                    { id: { [FIELD_TYPES.id]: query.id } }
                ]
            } as unknown as KeysAndAttributes
        },

    }
}
