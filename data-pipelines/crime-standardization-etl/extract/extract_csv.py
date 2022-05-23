import pandas as pd
from utils.config import Config


def extract_crime(config: Config):
    if config.aggregate:
        csv_oj = {}
        for source in config.source_csv:
            csv_oj[source] = pd.read_csv(f"./data/{source}")

        for table in csv_oj.keys():
            aggregate_by_col = [table for _ in range(len(csv_oj[table]))]
            csv_oj[table][config.aggregate_by] = aggregate_by_col

        final_df = pd.concat(csv_oj.values())
        return final_df
    else:
        return pd.read_csv(f"./data/{config.source_csv}")
