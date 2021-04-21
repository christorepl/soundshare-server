const fs = require("fs");
const router = require("express").Router();
const AWS = require("aws-sdk");
const multer = require("multer");
const config = require("../config");
const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, BUCKET_NAME } = config;
const { v4: uuidv4 } = require("uuid");

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const upload = multer({ storage }).array("files");

// const uploadFile = (fileName) => {
//   //read content from file
//   const fileContent = fs.readFileSync(fileName);

//   const params = {
//     Bucket: BUCKET_NAME,
//     Key: "21cats.jpg",
//     Body: fileContent,
//   };
//   s3.upload(params, function (error, data) {
//     if (error) throw error;
//     console.log("file uploaded successfully", data.Location);
//   });
// };

// uploadFile(
//   "C:/Users/Chris/Desktop/soundshare/soundshare-server/src/cat/cats.jpg"
// );

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

router.post("/", upload, async (req, res) => {
  try {
    //change to map for multiple files!
    const fileToUpload = req.files[0].originalname.split(".");
    const fileType = fileToUpload[fileToUpload.length - 1];

    const params = {
      Bucket: BUCKET_NAME,
      Key: `${uuidv4()}.${fileType}`,
      Body: req.files[0].buffer,
    };

    s3.upload(params, (error, data) => {
      if (error) res.status(500).send(error);
      console.log("file uploaded successfully", data.Location);
      res.send(data.Location);
    });

    // res.send(data.Location);
  } catch (error) {
    console.log("this is the error", error);
    res.send(error);
  }
});

module.exports = router;
