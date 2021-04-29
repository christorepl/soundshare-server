require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const bodyParser = require("body-parser");
const { NODE_ENV } = require("./config");
const routes = require("./routes");
const morganOption = NODE_ENV === "production" ? "tiny" : "common";
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("soundshare 200 hellooooo world!");
});

app.use("/upload", require("./routes/upload"));
app.use("/", routes);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
