from transform.transform_dates import DateTransformer
from transform.transform_locations import LocationTransformer
from transform.transform_filter_columns import ColumnFilterTransformer
from transform.transform_crime_types import CrimeTypeTransformer
from extract.extract_csv import extract_crime
from load.load_s3 import load_s3

import json
from utils.config import Config

config_json = json.load(open('toronto_config.json'))
config = Config(config_json)
crime_type_transformer = CrimeTypeTransformer(config)
col_filter = ColumnFilterTransformer(config)
location_transformer = LocationTransformer()
date_transformer = DateTransformer()

transformer_step_names = {
    'crime_type': crime_type_transformer,
    'col_filter': col_filter,
    'location': location_transformer,
    'date': date_transformer
}

crime_df = extract_crime(config)

for step in config.steps:
    crime_df = transformer_step_names[step].run_step(crime_df)

load_s3(crime_df, config.dest_csv)

