from transform.transform_service import create_crime_association

def base_insights(crime_gdf, listing_gdf):
    listing_df = create_crime_association(crime_gdf, listing_gdf)

    return listing_df
