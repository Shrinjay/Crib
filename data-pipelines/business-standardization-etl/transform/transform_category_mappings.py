from transformer_unit import TransformUnit
from utils.config import Config
import numpy as np
import pandas as pd


class CategoryNameTransformer(TransformUnit):
    def __init__(self, config: Config):
        self.category_mapping = config.category_mapping

    def transform_category(self, code):
        return self.category_mapping[code]

    def clean_categories(self, type):
        return type if type in self.category_mapping else np.nan

    def run_step(self, input_df: pd.DataFrame) -> pd.DataFrame:
        input_df['Category'] = input_df['Category'].map(self.clean_categories)
        input_df.dropna(subset=['Category'], inplace=True)
        input_df['Category'] = input_df['Category'].map(self.transform_category)
        return input_df
