const express = require("express");
const cors = require("cors");
const cookiesParser = require("cookies-parser");
const app = express();

// middleware

app.use(cors({ origin: process.env.CORS_ORIGN, credentials: true }));

app.use(express.json({ limit: "16kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);
app.use(express.static("public"));
app.use(cookiesParser());

module.exports = {
  app
};
