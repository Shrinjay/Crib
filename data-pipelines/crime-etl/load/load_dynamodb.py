import json
import os
import boto3 as aws
import uuid
import pandas as pd

WATERLOO_ID = "c7fe6867-d74a-4558-a3df-68593cbb4aff"
S3_BUCKET_CRIME_GEODATA = "crime-geodata"
LISTINGS_TABLE = "listings"
MAX_REQS = 10
GEOMETRY_COLS = ['geometry']
DB_FIELDS = ['id', 'name', 'crime_geodata_id', 'Latitude', 'Longitude']
DB_TYPES = {
    'id': "S",
    'name': 'S',
    'crime_geodata_id': 'S',
    'Latitude': 'S',
    'Longitude': 'S'
}


class DB:
    def __init__(self):
        if os.getenv("environment") == "LOCAL":
            self.cur = aws.client('dynamodb', endpoint_url=os.getenv("local_db_endpoint"))
        else:
            self.cur = aws.client('dynamodb', region_name='us-west-2')


def _create_aws_item(data_json, index):
    aws_item = {}
    for field in DB_FIELDS:
        aws_item[field] = {
            DB_TYPES[field]: data_json[field][str(index)]
        }
    return aws_item


def _create_put_reqs(data_json, index):
    return {'PutRequest': {
        'Item': _create_aws_item(data_json, index)
    }}


def _create_batch_put_req(table_name, data_json, index_len):
    put_reqs = []
    for index in range(index_len):
        put_reqs.append(_create_put_reqs(data_json, index))
    return {table_name: put_reqs}


def build_db_gdf(gdf):
    return gdf.drop(columns=[*GEOMETRY_COLS, 'crime_geodata'])


def build_s3_gdf(gdf):
    return gdf.drop(columns=GEOMETRY_COLS)


def build_s3_requests_crime_geodata(gdf_s3):
    byte_jsons = list(map(bytes, gdf_s3['crime_geodata']))
    s3_requests = dict(zip(list(gdf_s3['crime_geodata_id']), byte_jsons))
    return s3_requests


def build_s3_requests_crime_metrics(gdf_s3):
    byte_jsons = list(map(bytes, gdf_s3['crime_metrics']))
    s3_requests = dict(zip(list(gdf_s3['crime_geodata_id']), byte_jsons))
    return s3_requests


def load_to_aws(gdf):
    gdf['crime_geodata_id'] = [str(uuid.uuid4()) for _ in range(len(gdf.index))]
    gdf_db = build_db_gdf(gdf)
    gdf_s3 = build_s3_gdf(gdf)

    s3_requests_crime_geodata = build_s3_requests_crime_geodata(gdf_s3)
    s3_requests_crime_metrics = build_s3_requests_crime_metrics(gdf_s3)
    db_requests = transform_df_for_dynamodb(gdf_db)

    for k, v in s3_requests_crime_geodata.items():
        load_s3("crime-geodata", f"{k}.json", v)
    for k, v in s3_requests_crime_metrics.items():
        load_s3("crime-metrics", f"{k}.json", v)
    load_dynamodb(db_requests, len(gdf.index))


def load_s3(bucket, key, json_file):
    s3_client = aws.client('s3', region_name='us-west-2')
    s3_client.put_object(Bucket=bucket, Key=key, Body=json_file)


def load_dynamodb(data_jsons, index_len):
    cur = DB().cur
    res = cur.batch_write_item(RequestItems=_create_batch_put_req(LISTINGS_TABLE, data_jsons, index_len))
    req_count = 0
    while res['UnprocessedItems'] and req_count < MAX_REQS:
        res = cur.batch_write_item(res['UnprocessedItems'])

    return req_count == MAX_REQS


def transform_df_for_dynamodb(gdf):
    gdf['id'] = [str(uuid.uuid4()) for _ in range(len(gdf.index))]
    gdf['Latitude'] = gdf.apply(lambda s: str(s['Latitude']), axis=1)
    gdf['Longitude'] = gdf.apply(lambda s: str(s['Longitude']), axis=1)
    df = pd.DataFrame(gdf)
    return json.loads(df.to_json())
