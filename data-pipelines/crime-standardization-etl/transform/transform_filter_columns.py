from transformer_unit import TransformUnit
import pandas as pd


class ColumnFilterTransformer(TransformUnit):
    SOURCE_COLS = ['ReportedDateandTime', 'FinalCallType', 'Latitude', 'Longitude']
    COLUMN_MAPPINGS = {
        'ReportedDateAndTime': 'DateTime',
        'FinalCallType': 'CrimeType',
        'Latitidue': 'Latitude',
        'Longitude': 'Longitude'
    }

    def run_step(self, input_df: pd.DataFrame) -> pd.DataFrame:
        filtered_df = input_df[self.SOURCE_COLS]
        renamed_df = filtered_df.rename(columns=self.COLUMN_MAPPINGS)
        renamed_df.dropna(inplace=True)
        return renamed_df
