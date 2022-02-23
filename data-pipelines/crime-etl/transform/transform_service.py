from utils.geo_service import utm_transformer, get_haversine_distance_meters


def create_crime_association(crime_df, listing_df):
    # TODO: Make this code vectorized by combining lat and long into one column then access crime_df as global.
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
    near_crimes_geodf = near_crimes_geodf[["ReportedDateandTime", "CrimeType"]]
    crime_geojson = near_crimes_geodf.to_json().encode('UTF-8')
    return crime_geojson