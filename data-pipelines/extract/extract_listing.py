import pandas as pd


def extract_listing():
    return pd.read_csv('./data-pipelines/data/testlisting.csv')


def extract_listing_from_request(request):
    df = pd.DataFrame(
        {'id': [0],
         'name': [request['name']],
         'Latitude': [request['lat']],
         'Longitude': [request['lon']]
         }
    )
    return df
