from transformer_unit import TransformUnit
import pandas as pd


class ColumnFilterTransformer(TransformUnit):
    SOURCE_COLS = ['COMPANY_NAME', 'X', 'Y', 'PRIMARY_NAICS', 'SECONDARY_NAICS']
    COLUMN_MAPPINGS = {
        'COMPANY_NAME': 'CompanyName',
        'PRIMARY_NAICS': 'PrimaryNaics',
        'SECONDARY_NAICS': 'SecondaryNaics',
        'X': 'Longitude',
        'Y': 'Latitude'
    }

    def run_step(self, input_df: pd.DataFrame) -> pd.DataFrame:
        filtered_df = input_df[self.SOURCE_COLS]
        renamed_df = filtered_df.rename(columns=self.COLUMN_MAPPINGS)
        renamed_df.dropna(inplace=True)
        return renamed_df
