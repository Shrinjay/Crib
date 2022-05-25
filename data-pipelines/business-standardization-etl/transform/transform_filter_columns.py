from transformer_unit import TransformUnit
import pandas as pd
from utils.config import Config


class ColumnFilterTransformer(TransformUnit):
    SOURCE_COLS = ['COMPANY_NAME', 'X', 'Y', 'PRIMARY_NAICS', 'SECONDARY_NAICS']
    COLUMN_MAPPINGS = {
        'COMPANY_NAME': 'CompanyName',
        'PRIMARY_NAICS': 'PrimaryNaics',
        'SECONDARY_NAICS': 'SecondaryNaics',
        'X': 'Longitude',
        'Y': 'Latitude'
    }

    def __init__(self, config: Config):
        self.col_mapping = config.col_mapping

    def run_step(self, input_df: pd.DataFrame) -> pd.DataFrame:
        filtered_df = input_df[self.col_mapping.keys()]
        renamed_df = filtered_df.rename(columns=self.col_mapping)
        renamed_df.dropna(inplace=True)
        return renamed_df
