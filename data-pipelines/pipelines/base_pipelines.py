from transform.transform_service import create_crime_association, create_latlon_cols_from_utm17n
from load.load_dynamodb import transform_df_for_dynamodb
from utils.geo_service import create_buffer


def base_insights(crime_gdf, listing_gdf):
    listing_df = create_buffer(listing_gdf, 2000)

    listing_df = create_crime_association(crime_gdf, listing_df)
    insights_json = [transform_df_for_dynamodb(listing_df)]

    return insights_json


def clean_wrps_crime(crime_df):
    crime_df = create_latlon_cols_from_utm17n(crime_df)
    return crime_df
