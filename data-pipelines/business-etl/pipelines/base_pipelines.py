from transform.transform_service import create_business_association


def base_insights(business_gdf, listing_gdf):
    listing_df = create_business_association(business_gdf, listing_gdf)

    return listing_df
