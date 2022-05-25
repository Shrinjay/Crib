from extract.extract_businesses import extract_businesses
from extract.extract_listing import extract_listing_from_request
from utils.geo_service import create_geo_frame
from pipelines.base_pipelines import base_insights
from utils.config import Config


def insights_from_request(request, config: Config):
    crime_df = extract_businesses(config, request['district'])
    listing_df = extract_listing_from_request(request)

    crime_gdf = create_geo_frame(crime_df)
    listing_gdf = create_geo_frame(listing_df)

    return base_insights(crime_gdf, listing_gdf)
