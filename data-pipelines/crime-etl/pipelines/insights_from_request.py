from extract.extract_crime import extract_crime
from extract.extract_listing import extract_listing_from_request
from utils.geo_service import create_geo_frame
from pipelines.base_pipelines import base_insights


def insights_from_request(request):
    crime_df = extract_crime()
    listing_df = extract_listing_from_request(request)

    crime_gdf = create_geo_frame(crime_df)
    listing_gdf = create_geo_frame(listing_df)

    return base_insights(crime_gdf, listing_gdf)
