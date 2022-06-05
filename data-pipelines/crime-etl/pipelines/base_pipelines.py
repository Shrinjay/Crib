from transform.transform_service import create_crime_association

def base_insights(crime_gdf, listing_gdf, config, request):
    listing_df = create_crime_association(crime_gdf, listing_gdf, config, request)

    return listing_df
