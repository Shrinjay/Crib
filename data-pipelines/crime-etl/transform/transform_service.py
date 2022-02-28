from utils.geo_service import get_haversine_distance_meters
from utils.crime_types import CRIME_CATGS, COUNTED_CRIMES
import json


def create_crime_association(crime_df, listing_df):
    crime_calculations = listing_df.apply(
        lambda r: _create_geocrime_row(r, crime_df), axis=1
    )
    listing_df['crime_geodata'] = crime_calculations.apply(lambda calculations: calculations['geodata'])
    listing_df['crime_metrics'] = crime_calculations.apply(lambda calculations: calculations['metrics'])
    return listing_df


def _create_geocrime_row(listing_row, crime_df):
    crime_df['distance'] = crime_df.apply(
        lambda row: get_haversine_distance_meters(
            (listing_row.Latitude, listing_row.Longitude),
            (row['Latitude'], row['Longitude'])
        ), axis=1
    )
    near_crimes_geodf = crime_df.loc[crime_df['distance'] <= 1000]
    near_crimes_geodf = near_crimes_geodf[["geometry", "distance", "ReportedDateandTime", "CrimeType"]]
    crime_geojson = near_crimes_geodf.to_json().encode('UTF-8')

    crime_counts_by_category = {
        'violent': 0,
        'disturbance': 0,
        'stolen_goods': 0,
        'index': 0
    }

    for crime_type in near_crimes_geodf['CrimeType'].tolist():
        if crime_type in COUNTED_CRIMES:
            for crime_category, crime_types in CRIME_CATGS.items():
                if crime_type in crime_types:
                    crime_counts_by_category[crime_category] += 1

    crime_counts_by_category['index'] = crime_counts_by_category['stolen_goods'] * 0.2 + \
        crime_counts_by_category['disturbance'] * 0.4 + \
        crime_counts_by_category['violent'] * 0.4

    crime_metric_json = json.dumps(crime_counts_by_category).encode('UTF-8')

    return {
        'geodata': crime_geojson,
        'metrics': crime_metric_json
    }
