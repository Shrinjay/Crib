import { addUserSurveyResponse, doesSurveyResponseExist, getListings, incrementNumberOfClicks, incrementUserVisits } from './services/dynamodb';
import { getFromS3 } from './services/s3';
import { ListingQuery } from './types/db_types';
require('dotenv').config();
const cors = require('cors');

const PORT = 8080;
const WATERLOO_PARTITION_KEY = "c7fe6867-d74a-4558-a3df-68593cbb4aff";

const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());

app.get('/listings', (req: any, res: any) => {

    getListings()
    .then(queryResp => res.send(queryResp))
    .catch(err => {
        console.log(err)
        res.status(500).send()
    });
})

app.get('/crime_data/:id', (req: any, res: any) => {
    getFromS3(req.params.id, "crime-geodata")
    .then(json => res.json(json))
    .catch(err => {
        console.log(err)
        res.status(500).send({message: err?.Code})
    });
})

app.get('/crime_metrics/:id', (req: any, res: any) => {
    getFromS3(req.params.id, "crime-metrics")
    .then(json => res.json(json))
    .catch(err => {
        console.log(err)
        res.status(500).send({message: err?.Code})
    });
})

app.get('/business_data/:id', (req: any, res: any) => {
    getFromS3(req.params.id, "business-geodata-new")
    .then(json => res.json(json))
    .catch(err => {
        console.log(err)
        res.status(500).send({message: err?.Code})
    });
})

app.get('/business_metrics/:id', (req: any, res: any) => {
    getFromS3(req.params.id, "business-metrics-new")
    .then(json => res.json(json))
    .catch(err => {
        console.log(err)
        res.status(500).send({message: err?.Code})

    });
})

app.post('/user_analytics/sources/:source', (req: any, res: any) => {
    if (!req.params.source || !req.query.ip_address) {
        res.status(400).send({ message: "Invalid parameters" });
        return;
    }

    const promise = Promise.all([incrementNumberOfClicks(req.params.source),
                                 incrementUserVisits(req.query.ip_address, req.params.source),
                                 doesSurveyResponseExist(req.query.ip_address)]);

    promise
    .then(values => {
        const numberOfVisits = Number(values[1].Attributes!.number_of_visits.N);
        if ((numberOfVisits == 2 || numberOfVisits % 4 == 2) && !values[2]) {
            res.status(200).send({ showSurvey: true });
        }
        else {
            res.status(200).send({ showSurvey: false });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(400).send({ message: err?.Code })
    });
})

app.post('/user_analytics/survey/:ip_address', (req: any, res: any) => {
    if (!req.params.ip_address || !req.body.survey_response) {
        res.status(400).send({ message: "Invalid parameters" });
        return;
    }

    addUserSurveyResponse(req.params.ip_address, req.body.survey_response)   
    .then(res.status(200).send())
    .catch(err => {
        console.log(err)
        res.status(400).send({ message: err?.Code })
     });
})

app.listen(PORT, () => console.log(`Running Crib API on port ${PORT}`))