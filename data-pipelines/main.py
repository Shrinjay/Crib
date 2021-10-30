from extract.extract_crime import extract_crime
from extract.extract_listing import extract_listing
from transform.transform_service import create_latlon_cols

crime_df = extract_crime()
listing_df = extract_listing()

crime_df = create_latlon_cols(crime_df)

print(crime_df.head())
