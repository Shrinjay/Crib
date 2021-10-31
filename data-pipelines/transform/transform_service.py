from utils.geo_service import utm_transformer, wgs_transformer
import pandas as pd


def create_latlon_cols_from_utm17n(df):
    df['Latitude'] = _get_lat_col(df['easting'], df['northing'])
    df['Longitude'] = _get_lon_col(df['easting'], df['northing'])
    return df


def create_latlon_cols_from_wgs84(df):
    df['Latitude'] = _get_lat_col_wgs(df['latitude'], df['longtitude'])
    df['Longitude'] = _get_lon_col_wgs(df['latitude'], df['longtitude'])
    return df


def create_crime_association(crime_df, listing_df):
    listing_df['crime_geodata'] = listing_df.apply(lambda r: _create_geocrime_row(r, crime_df), axis=1)
    return listing_df


def _create_geocrime_row(listing_row, crime_df):
    near_crimes_geodf = crime_df.loc[crime_df.geometry.within(listing_row.buffer)]
    crime_geojson = near_crimes_geodf.to_json()
    return crime_geojson



def _get_lat_col(e, n):
    return utm_transformer.transform(e, n)[0]


def _get_lon_col(e, n):
    return utm_transformer.transform(e, n)[1]


def _get_lat_col_wgs(lat, lon):
    return wgs_transformer.transform(lat, lon)[0]


def _get_lon_col_wgs(lat, lon):
    return wgs_transformer.transform(lat, lon)[1]
