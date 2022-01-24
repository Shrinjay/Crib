"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getListings = void 0;
const dynamodb = __importStar(require("@aws-sdk/client-dynamodb"));
const TABLE_NAME = "listings";
const FIELD_TYPES = {
    id: "S",
    name: "S",
    Longitude: "S",
    Latitude: "S",
    crime_geodata_id: "S"
};
const FIELDS = ["id", "name", "Longitude", "Latitude", "crime_geodata_id"];
const dbContext = new dynamodb.DynamoDB({ "region": "us-west-2" });
function getListings(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = buildListingRequestItem(query);
        const res = yield dbContext.batchGetItem(params);
        return buildListingItems(res);
    });
}
exports.getListings = getListings;
function buildListingItems(response) {
    var _a, _b, _c;
    return (_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.Responses) === null || _a === void 0 ? void 0 : _a[TABLE_NAME]) === null || _b === void 0 ? void 0 : _b.map(_buildListingItem)) !== null && _c !== void 0 ? _c : [];
}
function _buildListingItem(resItem) {
    let res = {
        id: "",
        name: "",
        Latitude: "",
        Longitude: "",
        crime_geodata_id: ""
    };
    FIELDS.forEach(field => res[field] = resItem[field][FIELD_TYPES[field]]);
    return res;
}
function buildListingRequestItem(query) {
    if (query === null)
        return {
            RequestItems: {
                [TABLE_NAME]: {
                    Keys: []
                }
            }
        };
    return {
        RequestItems: {
            [TABLE_NAME]: {
                Keys: [
                    { id: { [FIELD_TYPES.id]: query.id } }
                ]
            }
        },
    };
}
