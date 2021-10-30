import pandas as pd


def extract_listing():
    return pd.read_csv('./data-pipelines/data/testlisting.csv')
