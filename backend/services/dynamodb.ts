import * as dynamodb from '@aws-sdk/client-dynamodb'
import { KeysAndAttributes } from '@aws-sdk/client-dynamodb';
import { Listing, ListingResponse, ListingQuery, FieldAttributes } from '../types/db_types';

const TABLE_NAME: string = "listings";
const FIELD_TYPES: FieldAttributes = {
    id: "S",
    name: "S",
    Longitude: "S",
    Latitude: "S",
    crime_geodata_id: "S",
    business_geodata_id: "S"
}
const FIELDS = ["id", "name", "Longitude", "Latitude", "crime_geodata_id", "business_geodata_id"]

const dbContext: dynamodb.DynamoDB = new dynamodb.DynamoDB({ "region": "us-west-2" });

export async function getListings(): Promise<{ [id: string]: Listing } | null> {

    const res: dynamodb.ScanCommandOutput = await dbContext.scan({ TableName: "listings" })
    const listings = buildListingItems(res);

    if (listings) {
        const crime_listings = Object.entries(listings).filter(([key, val]) => val.crime_geodata_id !== "")
        const business_listings = Object.entries(listings).filter(([key, val]) => val.business_geodata_id !== "")
        const business_listing_names = Object.fromEntries(business_listings.map(([key, val]) => [val['name'], key]))

        const merged_listings = Object.fromEntries(
          crime_listings.map(([key, val]) => {
            if (val['name'] in business_listing_names) {
              const id = business_listing_names[val['name']]
              const ret_obj = {
                ...val,
                business_geodata_id: listings[id].business_geodata_id
              }
              return [key, ret_obj]
            }
            return [key, val]
          })
        )
        return merged_listings
    }
    return listings
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
        crime_geodata_id: "",
        business_geodata_id: ""
    }

    FIELDS.forEach(field => {
        if (field in resItem) res[field as keyof typeof res] = resItem[field][FIELD_TYPES[field]]
    })

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
