import json

from pipelines.insights_from_listing import insights_from_listing
from pipelines.insights_from_request import insights_from_request
from load.load_dynamodb import load_to_aws
from utils.config import Config

from dotenv import load_dotenv
import flask
from flask_cors import CORS

load_dotenv()
app = flask.Flask(__name__)
CORS(app)


@app.route("/insights_from_csv")
def insights_from_csv():
    try:
        insights_json = insights_from_listing()
        load_fail = load_to_aws(insights_json)
        return {
            'status': not load_fail
        }

    except Exception as e:
        print(e)
        return {
            'status': str(e)
        }


@app.route("/insights_from_request")
def insights_from_req():
    # try:
        if all(map(lambda f: f in flask.request.args.keys(), ["name", "lon", "lat", "district"])):
            name = flask.request.args.get("name")
            lon = float(flask.request.args.get("lon"))
            lat = float(flask.request.args.get("lat"))
            district = flask.request.args.get("district")

            config = Config('config.json')

            insights_json = insights_from_request({
                'name': name,
                'lat': lat,
                'lon': lon,
                'district': district
            }, config)
            load_fail = load_to_aws(insights_json)
            return {
                'status': not load_fail
            }
        else:
            return {
                'status': False,
                'data': "MISSING PARAMS"
            }

    # except:
    #     return {
    #         'status': False
    #     }


app.run()
