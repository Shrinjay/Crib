import pandas as pd
from utils.config import Config


def extract_businesses(config: Config, district):
    return pd.read_csv(f"s3://processed-business-data/{config.source_datasets[district]}")