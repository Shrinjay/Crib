from utils.geo_service import get_haversine_distance_meters
import json

def create_business_association(business_df, listing_df):
    business_calculations = listing_df.apply(
        lambda r: _create_geobusiness_row(r, business_df), axis=1
    )
    listing_df['business_geodata'] = business_calculations.apply(lambda calculations: calculations['geodata'])
    return listing_df


def _create_geobusiness_row(listing_row, business_df):
    business_df['distance'] = business_df.apply(
        lambda row: get_haversine_distance_meters(
            (listing_row.Latitude, listing_row.Longitude),
            (row['Latitude'], row['Longitude'])
        ), axis=1
    )
    near_businesss_geodf = business_df.loc[business_df['distance'] <= 1000]
    near_businesss_geodf = near_businesss_geodf[["geometry", "distance", "Category", "Name"]]
    business_geojson = near_businesss_geodf.to_json().encode('UTF-8')

    return {
        'geodata': business_geojson
    }
