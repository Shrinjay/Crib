import pandas as pd


def extract_business(file):
    return pd.read_csv(f"./data/{file}", encoding='ANSI')
