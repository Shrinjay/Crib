from transformer_unit import TransformUnit
import pandas as pd
from utils.config import Config


class ColumnFilterTransformer(TransformUnit):
    SOURCE_COLS = ['ReportedDateandTime', 'FinalCallType', 'Latitude', 'Longitude']
    COLUMN_MAPPINGS = {
        'ReportedDateAndTime': 'DateTime',
        'FinalCallType': 'CrimeType',
        'Latitidue': 'Latitude',
        'Longitude': 'Longitude'
    }

    def __init__(self, config: Config):
        self.col_mapping = config.col_mapping

    def run_step(self, input_df: pd.DataFrame) -> pd.DataFrame:
        filtered_df = input_df[self.col_mapping.keys()]
        renamed_df = filtered_df.rename(columns=self.col_mapping)
        renamed_df.dropna(inplace=True)
        return renamed_df
