from extract.extract_crime import extract_crime
from extract.extract_listing import extract_listing_from_request
from utils.geo_service import create_geo_frame
from pipelines.base_pipelines import base_insights
from transform.transform_service import filter_by_time
from utils.config import Config
from datetime import date, timedelta


def insights_from_request(request, config: Config):
    crime_df = extract_crime(config, request['district'])
    listing_df = extract_listing_from_request(request)
    if request['district'] == "toronto":
        one_decade_ago = (date.today() - timedelta(weeks=520)).strftime("%Y-%m-%d")
        crime_df = filter_by_time(crime_df, one_decade_ago)

    crime_gdf = create_geo_frame(crime_df)
    listing_gdf = create_geo_frame(listing_df)

    return base_insights(crime_gdf, listing_gdf, config, request)
