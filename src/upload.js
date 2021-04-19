const fs = require("fs");
const AWS = require("aws-sdk");
const config = require("./config");
const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = config;
const BUCKET_NAME = "soundshare";
// const cats = require("./cats.jpg");

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const uploadFile = (fileName) => {
  //read content from file
  const fileContent = fs.readFileSync(fileName);

  const params = {
    Bucket: BUCKET_NAME,
    Key: "cat.jpg",
    Body: fileContent,
  };
  s3.upload(params, function (err, data) {
    if (err) throw err;
    console.log("file uploaded successfully", data.Location);
  });
};

uploadFile(
  "C:/Users/Chris/Desktop/soundshare/soundshare-server/src/cat/cats.jpg"
);
