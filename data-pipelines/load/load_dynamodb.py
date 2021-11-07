import os
import boto3 as aws
import uuid
import pandas as pd
from geojson import dumps

LISTINGS_TABLE = "listings"
MAX_REQS = 10
GEOMETRY_COLS = ['Latitude', 'Longitude', 'geometry', 'buffer']

def test_db():
    db = DB().cur
    print(db.describe_table(TableName="listings"))

class DB:
    def __init__(self):
        if os.getenv("environment") == "LOCAL":
            self.cur = aws.client('dynamodb', endpoint_url=os.getenv("local_db_endpoint"))
        else:
            self.cur = aws.client('dynamodb')


def _create_put_req(data_json):
    return {'PutRequest': {
        'Item': data_json
    }}


def _create_batch_put_req(table_name, data_jsons):
    return {table_name: list(map(_create_put_req, data_jsons))}


def load_dynamodb(data_jsons):
    cur = DB().cur
    res = cur.batch_write_item(RequestItems=_create_batch_put_req(LISTINGS_TABLE, data_jsons))
    req_count = 0
    while res['UnprocessedItems'] and req_count < MAX_REQS:
        res = cur.batch_write_item(res['UnprocessedItems'])

    return req_count == MAX_REQS


def transform_df_for_dynamodb(gdf):
    gdf['id'] = [str(uuid.uuid4()) for _ in range(len(gdf.index))]
    gdf['crime_geodata_string'] = gdf['crime_geodata'].apply(dumps)
    df = pd.DataFrame(gdf.drop(columns=GEOMETRY_COLS))
    return df.to_json()
