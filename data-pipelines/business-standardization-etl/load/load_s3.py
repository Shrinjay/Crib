def load_s3(crime_df):
    crime_df.to_csv("s3://processed-business-data/waterloo.csv", index=False)