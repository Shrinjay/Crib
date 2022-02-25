def load_s3(crime_df):
    crime_df.to_csv("s3://processed-crime-data/waterloo-2018.csv", index=False)