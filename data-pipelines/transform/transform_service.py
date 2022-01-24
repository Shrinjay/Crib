from utils.geo_service import utm_transformer, get_haversine_distance_meters
import pandas as pd


def create_latlon_cols_from_utm17n(df):
    df['Latitude'] = _get_lat_col(df['easting'], df['northing'])
    df['Longitude'] = _get_lon_col(df['easting'], df['northing'])
    return df


def create_crime_association(crime_df, listing_df):
    listing_df['crime_geodata'] = listing_df.apply(lambda r: _create_geocrime_row(r, crime_df), axis=1)
    return listing_df


def _create_geocrime_row(listing_row, crime_df):
    crime_df['distance'] = crime_df.apply(
        lambda row: get_haversine_distance_meters(
            (listing_row.Latitude, listing_row.Longitude),
            (row['Latitude'], row['Longitude'])
        ), axis=1
    )
    near_crimes_geodf = crime_df.loc[crime_df['distance'] <= 1000]
    near_crimes_geodf = near_crimes_geodf[["occurrencefileno", "ReportedDateandTime", "FinalCallTypeDescription", "geometry"]]
    crime_geojson = near_crimes_geodf.to_json().encode('UTF-8')
    return crime_geojson



def _get_lat_col(e, n):
    return utm_transformer.transform(e, n)[0]


def _get_lon_col(e, n):
    return utm_transformer.transform(e, n)[1]
