import { getListings } from './services/dynamodb';
import { getFromS3 } from './services/s3';
import { ListingQuery } from './types/db_types';
require('dotenv').config();
const cors = require('cors');

const PORT = 8080;
const WATERLOO_PARTITION_KEY = "c7fe6867-d74a-4558-a3df-68593cbb4aff";

const app = require("express")();

app.use(cors());

app.get('/listings', (req: any, res: any) => {

    getListings().then(queryResp => res.send(queryResp));
})

app.get('/crime_data/:id', (req: any, res: any) => {
    getFromS3(req.params.id, "crime-geodata").then(json => res.json(json));
})

app.get('/crime_metrics/:id', (req: any, res: any) => {
    getFromS3(req.params.id, "crime-metrics").then(json => res.json(json));
})

app.get('/business_data/:id', (req: any, res: any) => {
    getFromS3(req.params.id, "business-geodata").then(json => res.json(json));
})

app.listen(PORT, () => console.log(`Running Crib API on port ${PORT}`))