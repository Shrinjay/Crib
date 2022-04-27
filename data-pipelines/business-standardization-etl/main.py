from transform.transform_filter_columns import ColumnFilterTransformer
from extract.extract_csv import extract_business
from load.load_s3 import load_s3

col_filter = ColumnFilterTransformer()

raw_business_df = extract_business()
final_df = col_filter.run_step(raw_business_df)
load_s3(final_df)
