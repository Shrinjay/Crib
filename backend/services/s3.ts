import { GetObjectCommand, GetObjectCommandInput, GetObjectCommandOutput, S3Client } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import { FeatureCollection } from 'geojson';

const BUCKET_NAME = "crime-geodata";
const s3Client = new S3Client({region: "us-west-2"});

export async function getListingJSON(key: string): Promise<FeatureCollection> {
    const req: GetObjectCommandInput = buildObjectRequest(key);
    const command: GetObjectCommand = new GetObjectCommand(req);

    const res: GetObjectCommandOutput = await s3Client.send(command);
    
    return await buildObjectResponse(res);
}

function buildObjectRequest(key: string): GetObjectCommandInput {
    return {
        Key: key,
        Bucket: BUCKET_NAME
    };
}

async function buildObjectResponse(res: GetObjectCommandOutput): Promise<FeatureCollection> {
    const streamToString = (stream: any): Promise<string> =>
      new Promise((resolve, reject) => {
        const chunks: any = [];
        stream.on("data", (chunk: any) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      });

      const responseString: string = await streamToString(res.Body);

      return JSON.parse(responseString);
}