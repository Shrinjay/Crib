from transform.transform_service import create_business_association


def base_insights(business_gdf, listing_gdf, config, request):
    listing_df = create_business_association(business_gdf, listing_gdf, config, request)

    return listing_df
