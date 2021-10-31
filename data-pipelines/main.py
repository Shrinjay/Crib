from pipelines.insights_from_listing import insights_from_listing
from pipelines.insights_from_request import insights_from_request

print(insights_from_request({'name': 'Test Crib', 'lat': -8965492.68, 'lon': 5383765.00}))