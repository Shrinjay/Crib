import io

import pandas as pd
import boto3


def extract_crime():
    s3 = boto3.client('s3')
    s3_csv = s3.get_object(Bucket='processed-crime-data', Key='waterloo-2018')

    crime_df = pd.read_csv(io.BytesIO(s3_csv['Body'].read()))
    return crime_df
