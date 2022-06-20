from utils.geo_service import get_haversine_distance_meters
from utils.crime_types import CRIME_CATGS, COUNTED_CRIMES
import json
import pandas as pd
from datetime import date, timedelta
from utils.config import Config


def filter_by_crime_type(crime_df, filter_types):
    return crime_df[~crime_df['CrimeType'].isin(filter_types)]


def filter_by_time(crime_df, start_time):
    crime_df['ReportedDateAndTime'] = pd.to_datetime(crime_df['ReportedDateAndTime'], format="%Y-%m-%d").dt.strftime("%Y-%m-%d")
    return crime_df.loc[crime_df['ReportedDateAndTime'] > start_time]


def create_crime_association(crime_df, listing_df, config: Config, request):
    crime_calculations = listing_df.apply(
        lambda r: _create_geocrime_row(r, crime_df, config, request), axis=1
    )
    listing_df['crime_geodata'] = crime_calculations.apply(lambda calculations: calculations['geodata'])
    listing_df['crime_metrics'] = crime_calculations.apply(lambda calculations: calculations['metrics'])
    return listing_df


def _create_geocrime_row(listing_row, crime_df, config: Config, request):
    crime_df['distance'] = crime_df.apply(
        lambda row: get_haversine_distance_meters(
            (listing_row.Latitude, listing_row.Longitude),
            (row['Latitude'], row['Longitude'])
        ), axis=1
    )
    near_crimes_geodf = crime_df.loc[crime_df['distance'] <= 1000]
    near_crimes_geodf = near_crimes_geodf[["geometry", "distance", "ReportedDateAndTime", "CrimeType"]]
    crime_geojson = near_crimes_geodf.to_json().encode('UTF-8')

    crime_counts_by_category = {
        'violent': 0,
        'stolen_goods': 0
    }

    if request['district'] == "toronto":
        one_year_ago = (date.today() - timedelta(weeks=52)).strftime("%Y-%m-%d")
        near_crimes_geodf = filter_by_time(near_crimes_geodf, one_year_ago)

    for crime_type in near_crimes_geodf['CrimeType'].tolist():
        if crime_type in COUNTED_CRIMES:
            for crime_category, crime_types in CRIME_CATGS.items():
                if crime_type in crime_types:
                    crime_counts_by_category[crime_category] += 1

    district = request['district']
    population = config.benchmarks[district]['population_density']
    violent_rate = (crime_counts_by_category['violent'] / population) * 100000
    stolen_goods_rate = (crime_counts_by_category['stolen_goods'] / population) * 100000
    violent_comparison = __percent_diff(violent_rate, config.benchmarks[district]['violent_rate'])
    stolen_goods_comparison = __percent_diff(stolen_goods_rate, config.benchmarks[district]['stolen_goods_rate'])

    total_crime_rate = violent_rate + stolen_goods_rate
    total_comparison = (config.benchmarks[district]['violent_rate'] + config.benchmarks[district]['stolen_goods_rate'])*8
    index = (1 - (total_crime_rate / total_comparison)) * 100


    crime_counts_by_category['violent_rate'] = violent_rate
    crime_counts_by_category['violent_comparison'] = violent_comparison
    crime_counts_by_category['stolen_goods_rate'] = stolen_goods_rate
    crime_counts_by_category['stolen_goods_comparison'] = stolen_goods_comparison
    crime_counts_by_category['index'] = index

    crime_metric_json = json.dumps(crime_counts_by_category).encode('UTF-8')

    return {
        'geodata': crime_geojson,
        'metrics': crime_metric_json
    }


def __percent_diff(a, b):
    return ((a-b)/a)*100
