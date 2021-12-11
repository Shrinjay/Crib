import * as dynamodb from '@aws-sdk/client-dynamodb'
import { KeysAndAttributes } from '@aws-sdk/client-dynamodb';
import {Listing, ListingQuery, FieldAttributes} from '../types/db_types';

const TABLE_NAME: string = "listings";
const FIELD_TYPES: FieldAttributes = {
    id: "S",
    name: "S",
    Longitude: "S",
    Latitude: "S",
    crime_geodata_id: "S"
}
const FIELDS = ["id", "name", "Longitude", "Latitude", "crime_geodata_id"]

const dbContext: dynamodb.DynamoDB = new dynamodb.DynamoDB({"region": "us-west-2"});

export async function getListings(query: ListingQuery): Promise<Listing[]> {
    const params: dynamodb.BatchGetItemCommandInput = buildListingRequestItem(query);
    
    const res: dynamodb.BatchGetItemCommandOutput = await dbContext.batchGetItem(params)

    return buildListingItems(res);
}

function buildListingItems(response: dynamodb.BatchGetItemCommandOutput): Listing[] {
    return response?.Responses?.[TABLE_NAME]?.map(_buildListingItem) ?? [];
}

function _buildListingItem(resItem: any): Listing {
    let res: Listing = {
        id: "",
        name: "",
        Latitude: "",
        Longitude: "",
        crime_geodata_id: ""
    }

    FIELDS.forEach(field => res[field as keyof typeof res] = resItem[field][FIELD_TYPES[field]])

    return res;
}

function buildListingRequestItem(query: ListingQuery): dynamodb.BatchGetItemCommandInput  {
    
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
                    {id: {[FIELD_TYPES.id]: query.id}}
                ]
            } as unknown as KeysAndAttributes
        },
        
    }
}
