from transform.transform_filter_columns import ColumnFilterTransformer
from transform.transform_category_mappings import CategoryNameTransformer
from transform.transform_geocoding import TransformGeocode
from extract.extract_csv import extract_business
from load.load_s3 import load_s3
from utils.config import Config
from dotenv import load_dotenv

load_dotenv()

config = Config("toronto_config.json")

col_filter = ColumnFilterTransformer(config)
category_rename = CategoryNameTransformer(config)
geocode = TransformGeocode()

step_names = {
    'col_filter': col_filter,
    'category_rename': category_rename,
    'geocode': geocode
}

business_df = extract_business(config.source_csv)

for step in config.steps:
    business_df = step_names[step].run_step(business_df)
print(business_df)
load_s3(business_df)
