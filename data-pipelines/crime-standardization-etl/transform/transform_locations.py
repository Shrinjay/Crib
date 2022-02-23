from transformer_unit import TransformUnit
from utils.geo_service import utm_transformer
import pandas as pd


class LocationTransformer(TransformUnit):
    @staticmethod
    def _get_lat_col(e, n):
        return utm_transformer.transform(e, n)[0]

    @staticmethod
    def _get_lon_col(e, n):
        return utm_transformer.transform(e, n)[1]

    def create_latlon_cols_from_utm17n(self, df):
        df['Latitude'] = self._get_lat_col(df['easting'], df['northing'])
        df['Longitude'] = self._get_lon_col(df['easting'], df['northing'])
        return df

    def run_step(self, input_df: pd.DataFrame) -> pd.DataFrame:
        return self.create_latlon_cols_from_utm17n(input_df)

