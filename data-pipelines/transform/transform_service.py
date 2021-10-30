from utils.geo_service import utm_transformer


def create_latlon_cols(df):
    df['lattitude'] = _get_lat_col(df['easting'], df['northing'])
    df['longtitude'] = _get_lon_col(df['easting'], df['northing'])
    return df


def _get_lat_col(e, n):
    return utm_transformer.transform(e, n)[0]


def _get_lon_col(e, n):
    return utm_transformer.transform(e, n)[1]
