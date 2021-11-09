from pipelines.insights_from_listing import insights_from_listing
from pipelines.insights_from_request import insights_from_request
from load.load_dynamodb import load_dynamodb
from dotenv import load_dotenv

load_dotenv()

insights_json = insights_from_listing()
load_fail = load_dynamodb(insights_json)
print(load_fail)