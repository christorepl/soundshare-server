//this file should only need to be ran once to create a bucket on AWS.

const AWS = require("aws-sdk");
const config = require("./config");
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = config;
const BUCKET_NAME = "soundshare";

const s3 = new AWS.S3({});

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
});

const params = {
  Bucket: BUCKET_NAME,
  CreateBucketConfiguration: {
    LocationConstraint: "us-east-2",
  },
};

s3.createBucket(params, function (err, data) {
  if (err) console.log(err, err.stack);
  else console.log("Bucket created successfully", data.Location);
});
