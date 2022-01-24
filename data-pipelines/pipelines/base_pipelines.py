from transform.transform_service import create_crime_association, create_latlon_cols_from_utm17n


def base_insights(crime_gdf, listing_gdf):
    listing_df = create_crime_association(crime_gdf, listing_gdf)

    return listing_df


def clean_wrps_crime(crime_df):
    crime_df = create_latlon_cols_from_utm17n(crime_df)
    return crime_df
