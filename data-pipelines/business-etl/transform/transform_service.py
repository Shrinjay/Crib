from utils.geo_service import get_haversine_distance_meters
from utils.business_types import Business
import json


def create_business_association(business_df, listing_df, config, request):
    business_calculations = listing_df.apply(
        lambda r: _create_geobusiness_row(r, business_df, config, request), axis=1
    )
    listing_df['business_geodata'] = business_calculations.apply(lambda calculations: calculations['geodata'])
    listing_df['business_metrics'] = business_calculations.apply(lambda calculations: calculations['metrics'])

    return listing_df


def _create_geobusiness_row(listing_row, business_df, config, request):
    business_df['distance'] = business_df.apply(
        lambda row: get_haversine_distance_meters(
            (listing_row.Latitude, listing_row.Longitude),
            (row['Latitude'], row['Longitude'])
        ), axis=1
    )
    near_businesss_geodf = business_df.loc[business_df['distance'] <= 1000]
    near_businesss_geodf = near_businesss_geodf[["geometry", "distance", "Category", "Name"]]
    business_geojson = near_businesss_geodf.to_json().encode('UTF-8')

    business_counts = {
        "Total": 0,
        Business.EATING.value: 0,
        Business.HEALTH.value: 0,
        Business.AMUSEMENT.value: 0,
        Business.FOOD_RETAIL.value: 0,
        Business.LAUNDRY.value: 0,
        Business.NIGHTLIFE.value: 0,
        Business.PERSONAL_SERVICES.value: 0,
        Business.SHOPPING.value: 0,
        "Total_comparison": 0,
        f"{Business.EATING.value}_comparison": 0,
        f"{Business.HEALTH.value}_comparison": 0,
        f"{Business.AMUSEMENT.value}_comparison": 0,
        f"{Business.FOOD_RETAIL.value}_comparison": 0,
        f"{Business.LAUNDRY.value}_comparison": 0,
        f"{Business.NIGHTLIFE.value}_comparison": 0,
        f"{Business.PERSONAL_SERVICES.value}_comparison": 0,
        f"{Business.SHOPPING.value}_comparison": 0
    }

    district = request['district']

    for category in near_businesss_geodf['Category'].tolist():
        business_counts[category.replace(" ", "_")] += 1
        business_counts["Total"] += 1

    for category_enum in list(Business):
        benchmark_rate = config.benchmarks[district][category_enum.value] / config.benchmarks[district]["area"]
        if business_counts[category_enum.value] != 0:
            comparison = __percent_diff(business_counts[category_enum.value], benchmark_rate)
            business_counts[f"{category_enum.value}_comparison"] = comparison

    total_benchmark_rate = config.benchmarks[district]["Total"] / config.benchmarks[district]["area"]
    comparison = __percent_diff(business_counts["Total"], total_benchmark_rate)
    business_counts["Total_comparison"] = comparison

    index = (business_counts["Total"] / (total_benchmark_rate * 8)) * 100
    business_counts['index'] = index

    business_metric_json = json.dumps(business_counts).encode('UTF-8')

    return {
        'geodata': business_geojson,
        'metrics': business_metric_json
    }


def __percent_diff(a, b):
    return ((a - b) / a) * 100
