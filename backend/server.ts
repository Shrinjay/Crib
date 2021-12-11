import {getListings} from './services/dynamodb';
import {getListingJSON} from './services/s3';
import {ListingQuery} from './types/db_types';
require('dotenv').config();

const PORT = process.env.PORT;
const WATERLOO_PARTITION_KEY = "c7fe6867-d74a-4558-a3df-68593cbb4aff";

const app = require("express")();

app.get('/listings', (req: any, res: any) => {
    const query: ListingQuery = {
        id: WATERLOO_PARTITION_KEY
    }

    getListings(query).then(queryResp => res.send(queryResp));
})

app.get('/crime_data/:id', (req: any, res: any) => {
    getListingJSON(req.params.id).then(json => res.json(json));
})

app.listen(PORT, () => console.log(`Running Crib API on port ${PORT}`))