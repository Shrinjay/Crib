from common.transformer_unit import TransformUnit
import pandas as pd
import numpy as np


class DateTransformer(TransformUnit):

    def transform_date_string(self, date):
        split_date = date.split('/')
        if len(split_date) < 3:
            return np.nan
        return f"{split_date[1]}/{split_date[0]}/{split_date[2]}"

    def run_step(self, input_df: pd.DataFrame) -> pd.DataFrame:
        input_df.dropna(subset=['ReportedDateandTime'], inplace=True)
        input_df['ReportedDateandTime'] = input_df['ReportedDateandTime'].map(self.transform_date_string)
        input_df.dropna(subset=['ReportedDateandTime'], inplace=True)
        return input_df
