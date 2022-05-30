import os

import numpy as np

from transformer_unit import TransformUnit
import pandas as pd
import boto3

PLACE_INDEX = "Crib"


class TransformGeocode(TransformUnit):
    def __init__(self):
        self.als = boto3.client('location')

    def __geocode_address_cols(self, row):
        address = f"{row['Address_1'], row['Address_2']}"
        geocode_res = self.als.search_place_index_for_text(IndexName=PLACE_INDEX, Text=address, MaxResults=1)
        print(geocode_res)
        if len(geocode_res) > 0:
            point = geocode_res['Results'][0]['Place']['Geometry']['Point']
            lon = point[0]
            lat = point[1]
            return {
                    'Latitude': lat,
                    'Longitude': lon
                }
        return {
            'Latitude': np.nan,
            'Longitude': np.nan
        }

    def run_step(self, input_df: pd.DataFrame) -> pd.DataFrame:
        geocoded_cols = input_df.apply(self.__geocode_address_cols, axis=1)
        input_df['Latitude'] = geocoded_cols.apply(lambda r: r['Latitude'])
        input_df['Longitude'] = geocoded_cols.apply(lambda r: r['Longitude'])
        final_df = input_df.drop(['Address_1', 'Address_2', 'Address_3'], axis=1)
        final_df.dropna(inplace=True)
        return final_df
