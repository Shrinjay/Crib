"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamodb_1 = require("./services/dynamodb");
const s3_1 = require("./services/s3");
require('dotenv').config();
const PORT = process.env.PORT;
const WATERLOO_PARTITION_KEY = "c7fe6867-d74a-4558-a3df-68593cbb4aff";
const app = require("express")();
app.get('/listings', (req, res) => {
    const query = {
        id: WATERLOO_PARTITION_KEY
    };
    (0, dynamodb_1.getListings)(query).then(queryResp => res.send(queryResp));
});
app.get('/crime_data/:id', (req, res) => {
    (0, s3_1.getListingJSON)(req.params.id).then(json => res.json(json));
});
app.listen(PORT, () => console.log(`Running Crib API on port ${PORT}`));
