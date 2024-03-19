const express = require("express");
const cors = require("cors");
const app = express();

// middleware

app.use(cors({ origin: process.env.CORS_ORIGN ,credentials:true }));

app.use(express.json({limit:"16kb"}))

module.exports = {
  app,
};
