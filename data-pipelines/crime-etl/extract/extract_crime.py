import pandas as pd


def extract_crime():
    crime_df = pd.read_csv(f"s3://processed-crime-data/waterloo-2018.csv")
    return crime_df
