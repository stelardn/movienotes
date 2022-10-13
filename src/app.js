require("dotenv/config");

require('express-async-errors');

const express = require("express");
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const { UPLOADS_FOLDER } = require("./configs/upload");
app.use('/files', express.static(UPLOADS_FOLDER));

const routes = require("./routes");
app.use(routes);

const { request, response } = require("express");

const AppError = require("./utils/AppError");

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
});

module.exports = app;