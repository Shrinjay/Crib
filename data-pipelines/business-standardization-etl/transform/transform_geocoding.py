import os

import numpy as np

from transformer_unit import TransformUnit
import pandas as pd
import googlemaps


class TransformGeocode(TransformUnit):
    def __init__(self):
        self.counter = 0

    def __geocode_address_cols(self, row, gmaps):
        self.counter+=1
        if self.counter % 40 == 0:
            gmaps_res = gmaps.geocode(f"{row['Address_1'], row['Address_2']}")
            if len(gmaps_res)>0 and 'geometry' in gmaps_res[0] and 'location' in gmaps_res[0]['geometry']:
                lat_lon = gmaps_res[0]['geometry']['location']
                print(lat_lon)
                return {
                    'Latitude': lat_lon['lat'],
                    'Longitude': lat_lon['lng']
                }
        return {
            'Latitude': np.nan,
            'Longitude': np.nan
        }

    def run_step(self, input_df: pd.DataFrame) -> pd.DataFrame:
        gmaps = googlemaps.Client(key=os.getenv('GOOGLE_API_KEY'))
        geocoded_cols = input_df.apply(lambda r: self.__geocode_address_cols(r, gmaps), axis=1)
        input_df['Latitude'] = geocoded_cols.apply(lambda r: r['Latitude'])
        input_df['Longitude'] = geocoded_cols.apply(lambda r: r['Longitude'])
        final_df = input_df.drop(['Address_1', 'Address_2', 'Address_3'], axis=1)
        final_df.dropna(inplace=True)
        return final_df
