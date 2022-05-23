import pandas as pd
from utils.config import Config


def extract_crime(config: Config, district):
    crime_df = pd.read_csv(f"s3://processed-crime-data/{config.source_datasets[district]}")
    return crime_df
