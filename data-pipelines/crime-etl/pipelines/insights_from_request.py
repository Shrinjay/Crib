from extract.extract_crime import extract_crime
from extract.extract_listing import extract_listing_from_request
from utils.geo_service import create_geo_frame
from pipelines.base_pipelines import base_insights
from transform.transform_service import filter_by_time
from utils.config import Config


def insights_from_request(request, config: Config):
    crime_df = extract_crime(config, request['district'])
    listing_df = extract_listing_from_request(request)
    if request['district'] == "toronto":
        crime_df = filter_by_time(crime_df)

    crime_gdf = create_geo_frame(crime_df)
    listing_gdf = create_geo_frame(listing_df)

    return base_insights(crime_gdf, listing_gdf, config, request)
