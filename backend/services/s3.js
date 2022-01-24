"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListingJSON = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const BUCKET_NAME = "crime-geodata";
const s3Client = new client_s3_1.S3Client({ region: "us-west-2" });
function getListingJSON(key) {
    return __awaiter(this, void 0, void 0, function* () {
        const req = buildObjectRequest(key);
        const command = new client_s3_1.GetObjectCommand(req);
        const res = yield s3Client.send(command);
        return yield buildObjectResponse(res);
    });
}
exports.getListingJSON = getListingJSON;
function buildObjectRequest(key) {
    return {
        Key: key,
        Bucket: BUCKET_NAME
    };
}
function buildObjectResponse(res) {
    return __awaiter(this, void 0, void 0, function* () {
        const streamToString = (stream) => new Promise((resolve, reject) => {
            const chunks = [];
            stream.on("data", (chunk) => chunks.push(chunk));
            stream.on("error", reject);
            stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        });
        const responseString = yield streamToString(res.Body);
        return JSON.parse(responseString);
    });
}
