import pyproj as proj4
from geopandas import GeoDataFrame, points_from_xy

utm_transformer = proj4.Transformer.from_crs("EPSG:32617", "EPSG:3857")
wgs_transformer = proj4.Transformer.from_crs("EPSG:4326", "EPSG:3857")


def create_geo_frame(df):
    gdf = GeoDataFrame(df, geometry=points_from_xy(df.Longitude, df.Latitude))
    return gdf


def create_buffer(df, dist):
    df['buffer'] = df['geometry'].buffer(dist)
    return df