from transform.transform_dates import DateTransformer
from transform.transform_locations import LocationTransformer
from transform.transform_filter_columns import ColumnFilterTransformer
from transform.transform_crime_types import CrimeTypeTransformer
from extract.extract_csv import extract_crime

location_transformer = LocationTransformer()
date_transformer = DateTransformer()
col_filter = ColumnFilterTransformer()
crime_type_transformer = CrimeTypeTransformer()

raw_crime_df = extract_crime()
crime_d_df = date_transformer.run_step(raw_crime_df)
crime_dl_df = location_transformer.run_step(crime_d_df)
crime_dlf_df = col_filter.run_step(crime_dl_df)
final_df = crime_type_transformer.run_step(crime_dlf_df)
