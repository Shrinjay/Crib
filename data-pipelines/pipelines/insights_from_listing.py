from extract.extract_crime import extract_crime
from extract.extract_listing import extract_listing
from pipelines.base_pipelines import base_insights, clean_wrps_crime
from utils.geo_service import create_geo_frame
from transform.transform_service import create_latlon_cols_from_utm17n


def insights_from_listing():
    crime_df = extract_crime()
    listing_df = extract_listing()

    crime_df = clean_wrps_crime(crime_df)

    crime_gdf = create_geo_frame(crime_df)
    listing_gdf = create_geo_frame(listing_df)

    return base_insights(crime_gdf, listing_gdf)


