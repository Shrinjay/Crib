import pandas as pd


def extract_crime():
    return pd.read_csv('./data/WRPSOccurrenceData_Year_2019.csv')
