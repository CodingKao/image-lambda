import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Response } from 'node-fetch';

export const handler = async (event) => {
    // basic proof of life
    // console.log('this is our event', event);

    // create a s3Client connection
    const s3Client = new S3Client({ region: "us-west-2" });
    // const Bucket = 'kao-lab17';
    // need some parameters to use the "get" command
    const params = {
        Key: event.Records[0].s3.object.key,
        // Key: 'images.json',
        Bucket: 'kao-lab17',
    };
    console.log('new event info', params);

    let myJson;
    try {
        myJson = await s3Client.send(new GetObjectCommand(params));
        const response = new Response(myJson.Body);
        myJson = await response.json();
    } catch (e) {
        console.warn("error occurred", e);
    }

    console.log('this is my Json', myJson);

    // const { numberOne, numberTwo } = event;
    // const result = numberOne + numberTwo;
    // console.log('my result', result);

    // TODO implement
    const response = {
        statusCode: 200,
        body: 42,
    };
    return response;
};
