from pipelines.insights_from_listing import insights_from_listing
from pipelines.insights_from_request import insights_from_request
from load.load_dynamodb import transform_df_for_dynamodb, load_dynamodb
from dotenv import load_dotenv

load_dotenv()

insights_df = insights_from_request({'name': 'Test Crib', 'lat': -8965492.68, 'lon': 5383765.00})
insights_json = [transform_df_for_dynamodb(insights_df)]
print(load_dynamodb(insights_json))