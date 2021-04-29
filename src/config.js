require("dotenv").config();

module.exports = {
  port: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  AWS_ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  BUCKET_NAME: process.env.BUCKET_NAME,
  POOL_ID: process.env.POOL_ID,
  CLIENT_ID: process.env.CLIENT_ID,
  REGION: process.env.REGION,
  IDENTITY_POOL_ID: process.env.IDENTITY_POOL_ID,
};
