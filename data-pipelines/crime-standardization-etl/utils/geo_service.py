import pyproj as proj4
from geopandas import GeoDataFrame, points_from_xy
from math import pi, sin, cos, atan2, sqrt

utm_transformer = proj4.Transformer.from_crs("EPSG:32617", "EPSG:4326")


def create_geo_frame(df):
    gdf = GeoDataFrame(df, geometry=points_from_xy(df.Longitude, df.Latitude))
    return gdf


def create_buffer(df, dist):
    df['buffer'] = df['geometry'].buffer(dist)
    return df

def get_haversine_distance_meters(o, p):
    R = 6371000
    phi_1 = o[0] * pi/180
    phi_2 = p[0] * pi/180
    delta_phi = (p[0] - o[0])*(pi/180)
    delta_lambda = (p[1]-o[1])*(pi/180)

    a = (sin(delta_phi/2) ** 2) + cos(phi_1) * cos(phi_2) * (sin(delta_lambda/2)**2)
    c = 2 * atan2(sqrt(a), sqrt(1-a))

    return R*c
