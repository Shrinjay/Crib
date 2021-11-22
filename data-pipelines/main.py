from pipelines.insights_from_listing import insights_from_listing
from pipelines.insights_from_request import insights_from_request
from load.load_dynamodb import load_dynamodb
from dotenv import load_dotenv
import flask

load_dotenv()
app = flask.Flask(__name__)


@app.route("/insights_from_csv")
def insights_from_csv():
    try:
        insights_json = insights_from_listing()
        load_fail = load_dynamodb(insights_json)
        return {
            'status': not load_fail,
            'data': insights_json
        }

    except:
        return {
            'status': False
        }


@app.route("/insights_from_request")
def insights_from_req():
    try:
        if all(map(lambda f: f in flask.request.args.keys(), ["name", "lon", "lat"])):
            name = flask.request.args.get("name")
            lon = float(flask.request.args.get("lon"))
            lat = float(flask.request.args.get("lat"))
            insights_json = insights_from_request({
                'name': name,
                'lat': lat,
                'lon': lon
            })
            load_fail = load_dynamodb(insights_json)
            return {
                'status': not load_fail,
                'data': insights_json
            }
        else:
            return {
                'status': False,
                'data': "MISSING PARAMS"
            }

    except:
        return {
            'status': False
        }


app.run()
