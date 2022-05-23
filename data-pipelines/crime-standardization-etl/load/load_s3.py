def load_s3(crime_df, dest_csv):
    crime_df.to_csv(f"s3://processed-crime-data/{dest_csv}", index=False)